import MatchCard from "@/components/game/MatchCard";
import { getWallet } from "@/features/wallet/service";
import { joinWorldCup } from "@/features/worldcup/service";
import { authConfig } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { getServerSession } from "next-auth/next";

export default async function WorldCupPage() {
  const session = await getServerSession(authConfig);
  console.log("Session: ", session);
  let wallet = await getWallet(session?.user?.id || "", "worldcup");

  if (!wallet) {
    console.log("Joining World Cup...");
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">⚽ World Cup Betting</h1>
      <h2 className="text-3xl font-bold mb-6">Amount {wallet?.balance ?? 0}</h2>

      <div className="grid gap-4">
        {matches?.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            bet={betMap[match.id]}
            role={session?.user?.role}
          />
        ))}
      </div>
    </div>
  );
}
