import { getWallet } from "@/features/wallet/service";
import { joinWorldCup } from "@/features/worldcup/service";
import { authConfig } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { getServerSession } from "next-auth/next";
import { Trophy, Calendar, Users } from "lucide-react";
import WorldCupClient from "./WorldCupClient"; // We'll create this

export default async function WorldCupPage() {
  const session = await getServerSession(authConfig);

  let wallet = await getWallet(session?.user?.id || "", "worldcup");

  if (!wallet) {
    wallet = await joinWorldCup(session?.user?.id || "");
  }

  const { data: matches } = await supabaseServer
    .from("matches")
    .select("*")
    .order("match_time", { ascending: true });

  const { data: bets } = await supabaseServer
    .from("bets")
    .select("*")
    .eq("user_id", session?.user?.id);

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
      upcomingMatches={upcomingMatches}
      finishedMatches={finishedMatches}
      betMap={betMap}
      role={session?.user?.role}
      totalMatches={matches?.length ?? 0}
      totalBets={bets?.length ?? 0}
    />
  );
}
