import { supabaseServer } from "@/lib/supabase-server"

export async function addFishCash(userId: string, amount: number, type: string) {
  const { data: user } = await supabaseServer
    .from("users")
    .select("fish_cash")
    .eq("id", userId)
    .single()

  if (!user) throw new Error("User not found")

  const newBalance = user.fish_cash + amount

  await supabaseServer.from("users").update({
    fish_cash: newBalance
  }).eq("id", userId)

  await supabaseServer.from("transactions").insert({
    user_id: userId,
    amount,
    type
  })
}

export async function deductFishCash(userId: string, amount: number, type: string) {
  const { data: user } = await supabaseServer
    .from("users")
    .select("fish_cash")
    .eq("id", userId)
    .single()

  if (!user) throw new Error("User not found")

  if (user.fish_cash < amount) {
    throw new Error("Not enough Fish 🐟")
  }

  const newBalance = user.fish_cash - amount

  await supabaseServer.from("users").update({
    fish_cash: newBalance
  }).eq("id", userId)

  await supabaseServer.from("transactions").insert({
    user_id: userId,
    amount: -amount,
    type
  })
}

export async function getOrCreateWallet(
  userId: string,
  game: string,
  initialBalance = 0
) {
  const existing = await getWallet(userId, game)

  if (existing) return existing

  return await createWallet(userId, game, initialBalance)
}

export async function getWallet(userId: string, game: string) {
  const { data } = await supabaseServer
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .eq("game", game)
    .single()

  return data
}

export async function createWallet(userId: string, game: string, initialBalance = 0) {
  const { data, error } = await supabaseServer
    .from("wallets")
    .insert({
      user_id: userId,
      game,
      balance: initialBalance,
    })
    .select()
    .single()

  if (error) {
    console.error("CREATE WALLET ERROR:", error)
    throw new Error(error.message)
  }

  return data
}

export async function updateWallet(
  userId: string,
  game: string,
  amount: number,
  type: string
) {
  const wallet = await getWallet(userId, game)

  if (!wallet) throw new Error("Wallet not found")

  const newBalance = wallet.balance + amount

  if (newBalance < 0) {
    throw new Error("Not enough balance")
  }

  await supabaseServer
    .from("wallets")
    .update({ balance: newBalance })
    .eq("id", wallet.id)

  await supabaseServer.from("transactions").insert({
    user_id: userId,
    amount,
    type,
    game
  })
}