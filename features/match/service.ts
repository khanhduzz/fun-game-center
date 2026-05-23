// features/match/service.ts
import { supabaseServer } from "@/lib/supabase-server";
import { updateWallet } from "@/features/wallet/service";

export async function settleMatch(matchId: string, result: string) {
  // 1. check if already settled
  const { data: match } = await supabaseServer
    .from("matches")
    .select("*")
    .eq("id", matchId)
    .single();

  if (!match) throw new Error("Match not found");

  if (match.result) {
    throw new Error("Match already settled");
  }

  // 2. update match result
  await supabaseServer
    .from("matches")
    .update({ result })
    .eq("id", matchId);

  // 3. get all bets
  const { data: bets } = await supabaseServer
    .from("bets")
    .select("*")
    .eq("match_id", matchId);

  if (!bets) return;

  // 4. process bets
  for (const bet of bets) {
    const isWin = bet.prediction === result;

    if (isWin) {
      const payout = bet.stake * 2; // simple rule

      await updateWallet(
        bet.user_id,
        "worldcup",
        payout,
        "BET_WIN"
      );

      await supabaseServer
        .from("bets")
        .update({ result: "WIN" })
        .eq("id", bet.id);
    } else {
      await supabaseServer
        .from("bets")
        .update({ result: "LOSE" })
        .eq("id", bet.id);
    }
  }
}