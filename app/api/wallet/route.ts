import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getWallet } from "@/features/wallet/service";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const wallet = await getWallet(session.user.id, "main");

  return Response.json(wallet);
}