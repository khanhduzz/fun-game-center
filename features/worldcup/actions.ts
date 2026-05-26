"use server";

import { getWallet, updateWallet } from "../wallet/service";
import { joinWorldCup } from "./service";

export async function joinWorldCupAction(userId: string) {
  if (!userId) throw new Error("Unauthorized");
  return await joinWorldCup(userId);
}

export async function convertBalanceAction({
  userId,
  targetGame,
  amount,
}: {
  userId: string;
  targetGame: string;
  amount: number;
}) {
  if (!userId) throw new Error("Unauthorized");
  if (amount <= 0) throw new Error("Amount must be greater than zero");

  const upperGame = targetGame.toUpperCase();

  await updateWallet(userId, "main", -amount, `CONVERT_TO_${upperGame}`);

  await updateWallet(userId, targetGame, amount, `CONVERT_FROM_MAIN`);

  const updatedTargetWallet = await getWallet(userId, targetGame);
  return updatedTargetWallet;
}