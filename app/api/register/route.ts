import { createWallet } from "@/features/wallet/service"
import { supabase } from "@/lib/supabase"
import { handleSupabaseError } from "@/lib/supabaseErrorHandler"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, name, secretKey } = body

  // Validate the secret member key
    if (!secretKey || secretKey.toUpperCase() !== "PXP") {
      return Response.json(
        { error: "Invalid Secret Arena Key ❌ Access Denied." },
        { status: 403 }
      );
    }

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
    return handleSupabaseError(error);
  }

  await createWallet(data.id, "main", 0)
  return Response.json(data)
}