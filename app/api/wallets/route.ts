import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getWalletMap } from "@/features/wallet/service";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const walletMap = await getWalletMap(session.user.id);

  return Response.json(walletMap);
}