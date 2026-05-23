import { createWallet } from "@/features/wallet/service"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, name } = body

  const hashed = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email,
        password: hashed,
        name,
        fish_cash: 0
      }
    ])
    .select()
    .single()
    .setHeader("Content-Type", "application/json")

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  await createWallet(data.id, "main", 0)
  return Response.json(data)
}