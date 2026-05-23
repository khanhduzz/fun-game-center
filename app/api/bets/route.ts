import { supabaseServer } from "@/lib/supabase-server"
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"
import { deductFishCash } from "@/features/wallet/service"

export async function POST(req: Request) {
  const session = await getServerSession(authConfig)

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { matchId, prediction, stake } = body

  if (stake < 10) {
    return Response.json({ error: "Minimum 10 🐟" }, { status: 400 })
  }

  try {
    await deductFishCash(session.user.id, stake, "BET")

    const { error } = await supabaseServer.from("bets").insert({
      user_id: session.user.id,
      match_id: matchId,
      prediction,
      stake
    })

    if (error) throw error

    return Response.json({ success: true })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 400 })
  }
}