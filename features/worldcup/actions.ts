"use server";

import { joinWorldCup } from "./service";

export async function joinWorldCupAction(userId: string) {
  if (!userId) throw new Error("Unauthorized");
  return await joinWorldCup(userId);
}