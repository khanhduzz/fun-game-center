import { supabaseServer } from "@/lib/supabase-server";
import { updateWallet } from "../wallet/service";

export async function placeOrUpdateBet(
  userId: string,
  matchId: string,
  prediction: string,
  stake: number
) {
    try {
  const existing = await supabaseServer
    .from("bets")
    .select("*")
    .eq("user_id", userId)
    .eq("match_id", matchId)
    .maybeSingle();

  if (!existing.data) {
    await supabaseServer.from("bets").insert({
      user_id: userId,
      match_id: matchId,
      prediction,
      stake,
    });
    console.log("Placing new bet..." + JSON.stringify({ userId, matchId, prediction, stake }));

    await updateWallet(userId, "worldcup", -stake, "BET");
    console.log("Bet placed and wallet updated." + JSON.stringify({ userId, matchId, prediction, stake }));
  } else {
    const oldStake = existing.data.stake;
    const diff = stake - oldStake;

    await supabaseServer
      .from("bets")
      .update({ prediction, stake })
      .eq("id", existing.data.id);

    if (diff !== 0) {
      await updateWallet(userId, "worldcup", -diff, "BET_UPDATE");
    }
  }
} catch (e) {
  // rollback bet
  await supabaseServer
    .from("bets")
    .delete()
    .eq("user_id", userId)
    .eq("match_id", matchId);

  throw e;
}
}

export async function cancelBet(userId: string, matchId: string) {
  try {
    // Get current bet to know the stake amount
    const { data: bet, error: fetchError } = await supabaseServer
      .from("bets")
      .select("stake")
      .eq("user_id", userId)
      .eq("match_id", matchId)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!bet) throw new Error("No active bet found for this match");

    const stakeToRefund = bet.stake;

    // Delete the bet
    const { error: deleteError } = await supabaseServer
      .from("bets")
      .delete()
      .eq("user_id", userId)
      .eq("match_id", matchId);

    if (deleteError) throw deleteError;

    // Refund to wallet
    await updateWallet(userId, "worldcup", stakeToRefund, "BET_CANCELLED");

    return { success: true, refunded: stakeToRefund };
  } catch (e: any) {
    console.error("Cancel bet failed:", e);
    throw e;
  }
}