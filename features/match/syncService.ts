// features/matches/syncService.ts
import { supabaseServer } from "@/lib/supabase-server";

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

function calculateResult(home: number | null, away: number | null): string | null {
  if (home === null || away === null) return null;
  if (home > away) return "HOME";
  if (away > home) return "AWAY";
  return "DRAW";
}

export async function syncWorldCupMatches() {
  if (!API_KEY) {
    console.error("❌ FOOTBALL_DATA_API_KEY is missing");
    return;
  }

  try {
    console.log("🔄 Syncing FIFA World Cup 2026...");

    const res = await fetch(`${BASE_URL}/competitions/WC/matches`, {
      headers: { "X-Auth-Token": API_KEY },
    });

    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    const data = await res.json();
    let updatedCount = 0;

    for (const match of data.matches || []) {
      const score = match.score?.fullTime || {};

      const result = calculateResult(score.home, score.away);

      const { error } = await supabaseServer
        .from("matches")
        .upsert({
          id: match.id,
          home_team: match.homeTeam?.name || "TBD",
          away_team: match.awayTeam?.name || "TBD",
          match_time: match.utcDate,
          status: match.status,                    // Important: TIMED → LIVE → FINISHED
          home_score: score.home,
          away_score: score.away,
          score: (score.home !== null && score.away !== null) 
                  ? `${score.home}-${score.away}` 
                  : null,
          result: result,                          // HOME / DRAW / AWAY
          group_name: match.group,
          stage: match.stage,
          matchday: match.matchday,
          updated_at: new Date().toISOString(),
        }, { 
          onConflict: "id",
          // Only update these fields when they change (optional but cleaner)
          ignoreDuplicates: false 
        });

      if (error) {
        console.error(`Error syncing match ${match.id}:`, error.message);
      } else {
        updatedCount++;
      }
    }

    console.log(`✅ Synced/Updated ${updatedCount} matches`);
    return { success: true, count: updatedCount };

  } catch (error: any) {
    console.error("❌ Sync failed:", error.message);
    throw error;
  }
}