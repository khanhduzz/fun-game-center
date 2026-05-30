import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  // only admin
  if (!session?.user || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { matchId, result, homeScore, awayScore } = await req.json();
 console.log("Settling match..." + JSON.stringify({ matchId, result, homeScore, awayScore }));
  try {
    await supabaseServer.rpc("settle_match", {
      p_match_id: matchId,
      p_match_result: result,
      p_home_score: homeScore,
      p_away_score: awayScore,
    });

    return Response.json({ success: true });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}