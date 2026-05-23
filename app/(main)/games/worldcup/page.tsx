// app/(main)/games/worldcup/page.tsx
import MatchCard from "@/components/game/MatchCard";
import { getWallet } from "@/features/wallet/service";
import { joinWorldCup } from "@/features/worldcup/service";
import { authConfig } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

export default async function WorldCupPage() {
  const session = await getServerSession(authConfig);

  const userId = session.user.id;
  let wallet = await getWallet(userId || "", "worldcup");

  if (!wallet) {
    await joinWorldCup(userId || "");
    wallet = await getWallet(userId || "", "worldcup");
  }

  const { data: matches } = await supabaseServer
    .from("matches")
    .select("*")
    .order("match_time", { ascending: true });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">⚽ World Cup Betting</h1>

      <div className="grid gap-4">
        {matches?.map((match) => (
          <MatchCard key={match.id} match={match} userId={session.user.id} />
        ))}
      </div>
    </div>
  );
}
