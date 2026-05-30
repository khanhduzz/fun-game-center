// Server Component: app/worldcup/page.tsx
import { getWallet } from "@/features/wallet/service";
import { authConfig } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { getServerSession } from "next-auth/next";
import WorldCupClientModern from "./WorldCupClientModern";

export default async function WorldCupPage() {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id || "";

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
  let wonBetsCount = 0;

  for (const bet of bets ?? []) {
    betMap[bet.match_id] = bet;
    if (bet.status === "WIN" || bet.is_won === true) {
      wonBetsCount++;
    }
  }

  const now = new Date();
  const upcomingMatches =
    matches?.filter((m) => new Date(m.match_time) > now) || [];
  const finishedMatches =
    matches?.filter((m) => new Date(m.match_time) <= now) || [];

  return (
    <div className="w-full">
      {/* ⚡ FULL WIDTH — minimal padding */}
      <div className="w-full">
        <WorldCupClientModern
          wallet={wallet}
          isNewPlayer={isNewPlayer}
          userId={userId}
          upcomingMatches={upcomingMatches}
          finishedMatches={finishedMatches}
          betMap={betMap}
          role={session?.user?.role}
          totalMatches={matches?.length ?? 0}
          totalBets={bets?.length ?? 0}
          wonBetsCount={wonBetsCount}
        />
      </div>
    </div>
  );
}
