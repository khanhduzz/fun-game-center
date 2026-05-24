import { getWallet } from "@/features/wallet/service";
import { authConfig } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { getServerSession } from "next-auth/next";
import WorldCupClient from "./WorldCupClient";

export default async function WorldCupPage() {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id || "";

  // 1. Fetch wallet. Do NOT auto-create it here.
  const wallet = await getWallet(userId, "worldcup");
  const isNewPlayer = !wallet;

  const { data: matches } = await supabaseServer
    .from("matches")
    .select("*")
    .order("match_time", { ascending: true });

  const { data: bets } = await supabaseServer
    .from("bets")
    .select("*")
    .eq("user_id", userId);

  const betMap: Record<string, any> = {};
  for (const bet of bets ?? []) {
    betMap[bet.match_id] = bet;
  }

  const upcomingMatches =
    matches?.filter((m) => new Date(m.match_time) > new Date()) || [];
  const finishedMatches =
    matches?.filter((m) => new Date(m.match_time) <= new Date()) || [];

  return (
    <WorldCupClient
      wallet={wallet}
      isNewPlayer={isNewPlayer} // 2. Pass down registration requirement flag
      userId={userId} // 3. Pass down userId for the client action
      upcomingMatches={upcomingMatches}
      finishedMatches={finishedMatches}
      betMap={betMap}
      role={session?.user?.role}
      totalMatches={matches?.length ?? 0}
      totalBets={bets?.length ?? 0}
    />
  );
}
