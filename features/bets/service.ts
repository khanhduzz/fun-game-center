import { supabaseServer } from "@/lib/supabase-server";
import { updateWallet } from "../wallet/service";

export async function placeOrUpdateBet(
  userId: string,
  matchId: string,
  prediction: string,
  stake: number
) {
  // 1. Fetch existing bet safely
  const { data: existing, error: fetchError } = await supabaseServer
    .from("bets")
    .select("*")
    .eq("user_id", userId)
    .eq("match_id", matchId)
    .maybeSingle();

  if (fetchError) {
    console.error("❌ Failed to query existing bet:", fetchError.message);
    throw new Error(`Database query failed: ${fetchError.message}`);
  }

  if (!existing) {
    // --- PLACING A NEW BET ---
    console.log(`🚀 Attempting to insert new bet for user ${userId}...`);
    
    const { error: insertError } = await supabaseServer
      .from("bets")
      .insert({
        user_id: userId,
        match_id: matchId,
        prediction,
        stake,
        status: "ACTIVE"
      });

    if (insertError) {
      console.error("❌ Supabase insert failed:", insertError.message);
      throw new Error(`Failed to insert bet: ${insertError.message}`);
    }

    try {
      // Deduct funds from the wallet
      await updateWallet(userId, "worldcup", -stake, "BET");
      console.log("✅ New bet saved and wallet funds deducted successfully.");
    } catch (walletError: any) {
      console.error("❌ Wallet deduction failed. Rolling back created bet...", walletError.message);
      
      // Target specific rollback condition: clean up only if wallet execution fails
      await supabaseServer
        .from("bets")
        .delete()
        .eq("user_id", userId)
        .eq("match_id", matchId);
        
      throw walletError;
    }

  } else {
    // --- UPDATING AN EXISTING BET ---
    const oldStake = existing.stake;
    const diff = stake - oldStake;

    console.log(`🔄 Modifying bet ${existing.id}. Delta stake calculation: ${diff}`);

    const { error: updateError } = await supabaseServer
      .from("bets")
      .update({ prediction, stake })
      .eq("id", existing.id);

    if (updateError) {
      console.error("❌ Supabase update payload rejected:", updateError.message);
      throw new Error(`Failed to update database record: ${updateError.message}`);
    }

    if (diff !== 0) {
      try {
        await updateWallet(userId, "worldcup", -diff, "BET_UPDATE");
        console.log("✅ Bet changes applied and wallet amounts adjusted.");
      } catch (walletError) {
        console.error("❌ Wallet balance update failed. Reverting database bet alterations...");
        
        // Restore previous safe snapshot values if wallet processing falls over
        await supabaseServer
          .from("bets")
          .update({ prediction: existing.prediction, stake: oldStake })
          .eq("id", existing.id);
          
        throw walletError;
      }
    }
  }
}

export async function cancelBet(userId: string, matchId: string) {
  try {
    const { data: bet, error: fetchError } = await supabaseServer
      .from("bets")
      .select("stake")
      .eq("user_id", userId)
      .eq("match_id", matchId)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!bet) throw new Error("No active bet found for this match.");

    const stakeToRefund = bet.stake;

    // Delete the target record
    const { error: deleteError } = await supabaseServer
      .from("bets")
      .delete()
      .eq("user_id", userId)
      .eq("match_id", matchId);

    if (deleteError) throw deleteError;

    // Process systemic refund changes
    await updateWallet(userId, "worldcup", stakeToRefund, "BET_CANCELLED");
    console.log(`✅ Bet removed successfully. ${stakeToRefund} refunded to worldcup wallet.`);

    return { success: true, refunded: stakeToRefund };
  } catch (e: any) {
    console.error("❌ Cancel bet execution pipeline broke down:", e);
    throw e;
  }
}