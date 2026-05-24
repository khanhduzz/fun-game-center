import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import { syncWorldCupMatches } from "@/features/match/syncService";
export async function POST() {
  const session = await getServerSession(authConfig);
  // Optional: Only allow admins
  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await syncWorldCupMatches();
    return Response.json({ 
      success: true, 
      message: "World Cup matches synced successfully" 
    });
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}