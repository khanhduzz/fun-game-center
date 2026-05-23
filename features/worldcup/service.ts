import { getOrCreateWallet, updateWallet } from "../wallet/service"

export async function joinWorldCup(userId: string) {
    await getOrCreateWallet(userId, "worldcup", 50)
  await updateWallet(userId, "main", -50, "JOIN_WORLD_CUP")
  await updateWallet(userId, "worldcup", 50, "JOIN_WORLD_CUP")
}