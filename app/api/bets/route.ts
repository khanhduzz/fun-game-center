import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { placeOrUpdateBet } from "@/features/bets/service";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { matchId, prediction, stake } = body;

  try {
    await placeOrUpdateBet(
      session.user.id,
      matchId,
      prediction,
      stake
    );

    return Response.json({ success: true });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseServer
    .from("bets")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}