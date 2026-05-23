import { createWallet, updateWallet } from "../wallet/service"

export async function joinWorldCup(userId: string) {
    const wallet = await createWallet(userId, "worldcup", 50);
    await updateWallet(userId, "main", -50, "JOIN_WORLD_CUP")
    return wallet;
}