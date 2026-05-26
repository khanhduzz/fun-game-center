"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Clock,
  Fish,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MatchCard({ match, bet, role }: any) {
  const router = useRouter();
  const [stake, setStake] = useState(bet?.stake || 10);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<any>(null);
  const [celebrate, setCelebrate] = useState(false);

  const isLocked = new Date(match.match_time) < new Date();
  const isLive = match.status === "LIVE" || match.status === "HT";

  const getFlag = (teamName: string) => {
    const flags: any = {
      // Hosts
      "United States": "🇺🇸",
      Mexico: "🇲🇽",
      Canada: "🇨🇦",

      // South America (CONMEBOL)
      Argentina: "🇦🇷",
      Brazil: "🇧🇷",
      Colombia: "🇨🇴",
      Ecuador: "🇪🇨",
      Paraguay: "🇵🇾",
      Uruguay: "🇺🇾",

      // Europe (UEFA)
      Austria: "🇦🇹",
      Belgium: "🇧🇪",
      "Bosnia-Herzegovina": "🇧🇦",
      Croatia: "🇭🇷",
      Czechia: "🇨🇿",
      England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      France: "🇫🇷",
      Germany: "🇩🇪",
      Netherlands: "🇳🇱",
      Norway: "🇳🇴",
      Portugal: "🇵🇹",
      Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
      Spain: "🇪🇸",
      Sweden: "🇸🇪",
      Switzerland: "🇨🇭",
      Turkey: "🇹🇷",

      // Asia (AFC)
      Australia: "🇦🇺",
      Iraq: "🇮🇶",
      Iran: "🇮🇷",
      Japan: "🇯🇵",
      Jordan: "🇯🇴",
      "South Korea": "🇰🇷",
      Qatar: "🇶🇦",
      "Saudi Arabia": "🇸🇦",
      Uzbekistan: "🇺🇿",

      // Africa (CAF)
      Algeria: "🇩🇿",
      "Cape Verde Islands": "🇨🇻",
      "Congo DR": "🇨🇩",
      "Ivory Coast": "🇨🇮",
      Egypt: "🇪🇬",
      Ghana: "🇬🇭",
      Morocco: "🇲🇦",
      Senegal: "🇸🇳",
      "South Africa": "🇿🇦",
      Tunisia: "🇹🇳",

      // North & Central America (CONCACAF)
      Curaçao: "🇨🇼",
      Haiti: "🇭🇹",
      Panama: "🇵🇦",

      // Oceania (OFC)
      "New Zealand": "🇳🇿",
    };
    return flags[teamName] || "🏴";
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
  };

  const triggerCelebration = () => {
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1000);
  };

  const refreshData = () => router.refresh();

  const placeBet = async (prediction: string) => {
    if (bet && bet.prediction === prediction && bet.stake === stake) return;

    setLoading(true);
    const res = await fetch("/api/bets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId: match.id, prediction, stake }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(data.error || "Failed to place bet", "error");
    } else {
      showToast(
        bet ? "Bet updated successfully!" : "Bet placed! Good luck 🐟",
        "success",
      );
      triggerCelebration();
      setTimeout(refreshData, 800);
    }
  };

  const cancelBet = async () => {
    setLoading(true);

    const res = await fetch("/api/bets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchId: match.id,
        action: "cancel",
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(data.error || "Failed to cancel bet", "error");
    } else {
      showToast(
        `Bet cancelled - ${data.refunded || ""} 🐟 refunded`,
        "success",
      );
      setTimeout(refreshData, 900);
    }
  };

  const settleMatch = async (matchId: string, result: string) => {
    setLoading(true);
    const res = await fetch("/api/matches/settle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, result }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(data.error || "Failed to settle match", "error");
    } else {
      showToast("Match settled successfully", "success");
      setTimeout(refreshData, 900);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-zinc-900/95 border border-zinc-700 hover:border-sky-500/50 rounded-3xl p-5 md:p-6 transition-all relative overflow-hidden"
    >
      {/* Celebration flash */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0] }}
            className="absolute inset-0 bg-gradient-to-br from-sky-400/30 to-violet-400/20 pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-2xl flex items-center gap-2.5 z-50 text-sm shadow-xl border
              ${
                toast.type === "success"
                  ? "bg-emerald-800 border-emerald-500 text-emerald-100"
                  : "bg-red-800 border-red-500 text-red-100"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teams + Flags */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getFlag(match.home_team)}</span>
          <div className="font-semibold text-lg leading-tight">
            {match.home_team}
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-zinc-500 font-mono">VS</div>
          {isLive && (
            <div className="text-[10px] text-red-400 font-bold flex items-center justify-center gap-1 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              LIVE
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="font-semibold text-lg leading-tight text-right">
            {match.away_team}
          </div>
          <span className="text-3xl">{getFlag(match.away_team)}</span>
        </div>
      </div>

      {/* Match Info */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-400 mb-6">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {new Date(match.match_time).toLocaleDateString([], {
            month: "short",
            day: "numeric",
          })}
          {" • "}
          {new Date(match.match_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {match.venue && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {match.venue}
          </div>
        )}

        {(match.group_name || match.stage) && (
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {match.group_name || match.stage}
          </div>
        )}
      </div>

      {/* Current Bet */}
      {bet && (
        <div className="mb-5 p-4 bg-zinc-800/70 border border-amber-400/30 rounded-2xl flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="text-amber-400 w-4 h-4" />
            Bet on <span className="font-semibold">{bet.prediction}</span>
          </div>
          <div className="font-bold text-lg flex items-center gap-1 text-amber-300">
            {bet.stake} <Fish className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Stake */}
      <div className="mb-5">
        <label className="text-xs text-zinc-400 mb-1.5 block">
          STAKE AMOUNT
        </label>
        <div className="flex items-center gap-3">
          <input
            aria-label="Stake Amount"
            type="number"
            value={stake}
            min={10}
            step={1}
            onChange={(e) => setStake(Number(e.target.value))}
            disabled={isLocked}
            className="bg-zinc-950 border border-zinc-700 focus:border-sky-400 w-28 rounded-2xl px-4 py-3 text-lg font-mono focus:outline-none"
          />
          <span className="text-2xl">🐟</span>
        </div>
      </div>

      {/* Bet Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "HOME", color: "emerald" },
          { label: "DRAW", color: "amber" },
          { label: "AWAY", color: "sky" },
        ].map((item) => {
          const isSelected = bet?.prediction === item.label;
          return (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => placeBet(item.label)}
              disabled={
                loading || isLocked || (isSelected && bet?.stake === stake)
              }
              className={`py-4 rounded-2xl font-semibold text-sm transition-all
                ${
                  isSelected
                    ? `bg-${item.color}-600 text-white shadow-md shadow-${item.color}-500/40`
                    : `bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-${item.color}-500/60`
                }`}
            >
              {item.label}
            </motion.button>
          );
        })}
      </div>

      {/* Cancel Button */}
      {bet && !isLocked && (
        <button
          onClick={cancelBet}
          disabled={loading}
          className="mt-4 w-full py-3 text-red-400 hover:bg-red-950/50 border border-red-500/30 hover:border-red-400 rounded-2xl text-sm font-medium"
        >
          Cancel Bet
        </button>
      )}

      {/* Result */}
      {match.result && (
        <div className="mt-5 py-3 bg-emerald-900/40 border border-emerald-500/30 rounded-2xl text-center text-emerald-300 text-sm">
          Final Result: <span className="font-bold">{match.result}</span>
          {match.score && ` (${match.score})`}
        </div>
      )}

      {/* Admin Controls */}
      {role === "admin" && !match.result && (
        <div className="mt-6 pt-5 border-t border-zinc-700 text-xs">
          <p className="text-zinc-400 mb-3">ADMIN • SETTLE RESULT</p>
          <div className="grid grid-cols-3 gap-2">
            {["HOME", "DRAW", "AWAY"].map((res) => (
              <button
                key={res}
                onClick={() => settleMatch(match.id, res)}
                className="py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl"
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
