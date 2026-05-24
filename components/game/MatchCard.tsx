"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Clock,
  Fish,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MatchCard({ match, bet, role }: any) {
  const router = useRouter();

  const [stake, setStake] = useState(bet?.stake || 10);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const isLocked = new Date(match.match_time) < new Date();

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (bet) {
      setStake(bet.stake);
    }
  }, [bet]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast({ message, type });
  };

  const refreshData = () => {
    router.refresh(); // Soft refresh - updates server data without full reload
  };

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
        bet ? "Bet updated successfully 🔄" : "Bet placed successfully 🐟🔥",
        "success",
      );
      setTimeout(refreshData, 900); // Small delay to show toast
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
      className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/30 rounded-2xl p-6 transition-all duration-300 group relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 text-sm font-medium border
              ${toast.type === "success" ? "bg-emerald-900 border-emerald-500 text-emerald-100" : ""}
              ${toast.type === "error" ? "bg-red-900 border-red-500 text-red-100" : ""}
            `}
          >
            {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
            {toast.type === "error" && <XCircle className="w-5 h-5" />}
            {toast.type === "info" && <AlertTriangle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Match Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="font-black text-xl tracking-tight">
            {match.home_team} <span className="text-zinc-500">vs</span>{" "}
            {match.away_team}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
            <Clock className="w-4 h-4" />
            {new Date(match.match_time).toLocaleDateString([], {
              month: "short",
              day: "numeric",
            })}{" "}
            •{" "}
            {new Date(match.match_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {isLocked && (
          <div className="px-3 py-1 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30 rounded-full">
            MATCH LOCKED
          </div>
        )}
      </div>

      {/* Current Bet Display */}
      {bet && (
        <div className="mb-5 p-4 bg-zinc-950 border border-yellow-400/20 rounded-xl">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>
                You bet on{" "}
                <span className="font-bold text-white">{bet.prediction}</span>
              </span>
            </div>
            <div className="font-black text-yellow-400 flex items-center gap-1">
              {bet.stake} <Fish className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Stake Input */}
      <div className="mb-4">
        <label className="text-xs uppercase tracking-widest text-zinc-500 mb-1 block">
          Stake Amount
        </label>
        <div className="flex items-center gap-3">
          <input
            aria-label="stake"
            type="number"
            value={stake}
            min={10}
            disabled={isLocked}
            onChange={(e) => setStake(Number(e.target.value))}
            className="bg-zinc-950 border border-zinc-700 focus:border-yellow-400 rounded-xl px-5 py-3 w-28 font-mono text-lg focus:outline-none disabled:opacity-50"
          />
          <span className="text-yellow-400 text-xl">🐟</span>
        </div>
      </div>

      {/* Betting Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => placeBet("HOME")}
          disabled={
            loading ||
            isLocked ||
            (bet?.prediction === "HOME" && bet?.stake === stake)
          }
          className={`py-4 rounded-2xl font-bold transition-all duration-200 ${
            bet?.prediction === "HOME"
              ? "bg-emerald-600/80 border-2 border-emerald-400 text-white cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500 active:scale-95"
          }`}
        >
          HOME
        </button>

        <button
          onClick={() => placeBet("DRAW")}
          disabled={
            loading ||
            isLocked ||
            (bet?.prediction === "DRAW" && bet?.stake === stake)
          }
          className={`py-4 rounded-2xl font-bold transition-all duration-200 ${
            bet?.prediction === "DRAW"
              ? "bg-amber-600/80 border-2 border-amber-400 text-white cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-500 active:scale-95"
          }`}
        >
          DRAW
        </button>

        <button
          onClick={() => placeBet("AWAY")}
          disabled={
            loading ||
            isLocked ||
            (bet?.prediction === "AWAY" && bet?.stake === stake)
          }
          className={`py-4 rounded-2xl font-bold transition-all duration-200 ${
            bet?.prediction === "AWAY"
              ? "bg-blue-600/80 border-2 border-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:scale-95"
          }`}
        >
          AWAY
        </button>
      </div>

      {/* Cancel Bet */}
      {bet && !isLocked && (
        <button
          onClick={cancelBet}
          disabled={loading}
          className="mt-4 w-full py-3 text-red-400 hover:bg-red-500/10 border border-red-500/30 hover:border-red-400 rounded-2xl text-sm font-medium transition-all"
        >
          Cancel Bet
        </button>
      )}

      {/* Admin Controls */}
      {role === "admin" && !match.result && (
        <div className="mt-6 pt-5 border-t border-zinc-800">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Admin • Settle Match
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => settleMatch(match.id, "HOME")}
              disabled={loading}
              className="flex-1 bg-emerald-700 hover:bg-emerald-600 py-2.5 rounded-xl text-xs font-medium"
            >
              HOME WIN
            </button>
            <button
              onClick={() => settleMatch(match.id, "DRAW")}
              disabled={loading}
              className="flex-1 bg-amber-700 hover:bg-amber-600 py-2.5 rounded-xl text-xs font-medium"
            >
              DRAW
            </button>
            <button
              onClick={() => settleMatch(match.id, "AWAY")}
              disabled={loading}
              className="flex-1 bg-blue-700 hover:bg-blue-600 py-2.5 rounded-xl text-xs font-medium"
            >
              AWAY WIN
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {match.result && (
        <div className="mt-4 text-center py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-emerald-400 text-sm font-medium">
          ✅ Final Result: <span className="font-bold">{match.result}</span>
        </div>
      )}
    </motion.div>
  );
}
