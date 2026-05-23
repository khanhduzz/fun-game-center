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