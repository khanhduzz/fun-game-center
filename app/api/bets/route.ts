import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { placeOrUpdateBet, cancelBet } from "@/features/bets/service";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { matchId, prediction, stake, action } = body;

  try {
    if (action === "cancel") {
      await cancelBet(session.user.id, matchId);
      return Response.json({ success: true, message: "Bet cancelled and refunded" });
    }

    // Place or Update Bet
    await placeOrUpdateBet(session.user.id, matchId, prediction, stake);
    return Response.json({ success: true });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}