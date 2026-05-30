"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  ShieldAlert,
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

  // Team data registry with matching thematic color hashes for the background mix
  const teamRegistry: Record<string, { flag: string; color: string }> = {
    "United States": { flag: "🇺🇸", color: "#ef4444" }, // Red
    Mexico: { flag: "🇲🇽", color: "#16a34a" }, // Green
    Canada: { flag: "🇨🇦", color: "#dc2626" }, // Red
    Argentina: { flag: "🇦🇷", color: "#38bdf8" }, // Sky Blue
    Brazil: { flag: "🇧🇷", color: "#eab308" }, // Yellow
    Colombia: { flag: "🇨🇴", color: "#facc15" }, // Yellow
    Ecuador: { flag: "🇪🇨", color: "#eab308" }, // Yellow
    Paraguay: { flag: "🇵🇾", color: "#ef4444" }, // Red
    Uruguay: { flag: "🇺🇾", color: "#60a5fa" }, // Light Blue
    Austria: { flag: "🇦🇹", color: "#f43f5e" }, // Rose
    Belgium: { flag: "🇧🇪", color: "#eab308" }, // Yellow/Gold
    "Bosnia-Herzegovina": { flag: "🇧🇦", color: "#1d4ed8" }, // Blue
    Croatia: { flag: "🇭🇷", color: "#ef4444" }, // Red
    Czechia: { flag: "🇨🇿", color: "#1e3a8a" }, // Dark Blue
    England: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "#cbd5e1" }, // Clean Slate White
    France: { flag: "🇫🇷", color: "#2563eb" }, // Royal Blue
    Germany: { flag: "🇩🇪", color: "#18181b" }, // Black/Dark Charcoal
    Netherlands: { flag: "🇳🇱", color: "#f97316" }, // Orange
    Norway: { flag: "🇳🇴", color: "#e11d48" }, // Deep Red
    Portugal: { flag: "🇵🇹", color: "#dc2626" }, // Crimson
    Scotland: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", color: "#0284c7" }, // Scottish Blue
    Spain: { flag: "🇪🇸", color: "#ea580c" }, // Spanish Orange/Red
    Sweden: { flag: "🇸🇪", color: "#2563eb" }, // Swedish Blue
    Switzerland: { flag: "🇨🇭", color: "#ef4444" }, // Red
    Turkey: { flag: "🇹🇷", color: "#e11d48" }, // Crimson
    Australia: { flag: "🇦🇺", color: "#065f46" }, // Aussie Green
    Iraq: { flag: "🇮🇶", color: "#15803d" }, // Green Accent
    Iran: { flag: "🇮🇷", color: "#16a34a" }, // Green
    Japan: { flag: "🇯🇵", color: "#f43f5e" }, // Crimson Dot
    Jordan: { flag: "🇯🇴", color: "#15803d" }, // Dark Green
    "South Korea": { flag: "🇰🇷", color: "#2563eb" }, // Blue Accent
    Qatar: { flag: "🇶🇦", color: "#881337" }, // Maroon
    "Saudi Arabia": { flag: "🇸 سعودی", color: "#16a34a" }, // Green
    Uzbekistan: { flag: "🇺🇿", color: "#06b6d4" }, // Cyan
    Algeria: { flag: "🇩🇿", color: "#15803d" }, // Green
    "Cape Verde Islands": { flag: "🇨🇻", color: "#1e40af" }, // Deep Blue
    "Congo DR": { flag: "🇨🇩", color: "#3b82f6" }, // Blue
    "Ivory Coast": { flag: "🇨🇮", color: "#f97316" }, // Orange
    Egypt: { flag: "🇪🇬", color: "#b91c1c" }, // Red
    Ghana: { flag: "🇬🇭", color: "#eab308" }, // Gold
    Morocco: { flag: "🇲🇦", color: "#c2410c" }, // Deep Red/Orange
    Senegal: { flag: "🇸🇳", color: "#16a34a" }, // Green
    "South Africa": { flag: "🇿🇦", color: "#047857" }, // Gold/Green Mix
    Tunisia: { flag: "🇹🇳", color: "#e11d48" }, // Red
    Curaçao: { flag: "🇨🇼", color: "#1d4ed8" }, // Blue
    Haiti: { flag: "🇭🇹", color: "#1e3a8a" }, // Blue
    Panama: { flag: "🇵🇦", color: "#da291c" }, // Red
    "New Zealand": { flag: "🇳🇿", color: "#0f172a" }, // All Blacks Dark Slate
  };

  const getTeamConfig = (name: string) => {
    return teamRegistry[name] || { flag: "🏳️", color: "#cbd5e1" };
  };

  const homeConfig = getTeamConfig(match.home_team);
  const awayConfig = getTeamConfig(match.away_team);

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
        bet ? "Ticket Updated! 🎉" : "Prediction Locked In! Good luck 🐟",
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
      body: JSON.stringify({ matchId: match.id, action: "cancel" }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(data.error || "Failed to cancel prediction", "error");
    } else {
      showToast(
        `Cancelled - ${data.refunded || ""} 🐟 returned to pouch!`,
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
      showToast("Match safely settled! 🏁", "success");
      setTimeout(refreshData, 900);
    }
  };

  const colorSelectedMap: Record<string, string> = {
    emerald:
      "bg-emerald-500 text-white shadow-md shadow-emerald-100 border-emerald-500",
    amber:
      "bg-amber-400 text-slate-900 shadow-md shadow-amber-100 border-amber-400",
    sky: "bg-sky-500 text-white shadow-md shadow-sky-100 border-sky-500",
  };

  const colorHoverMap: Record<string, string> = {
    emerald: "hover:border-emerald-400 hover:bg-emerald-50 text-slate-700",
    amber: "hover:border-amber-400 hover:bg-amber-50 text-slate-700",
    sky: "hover:border-sky-400 hover:bg-sky-50 text-slate-700",
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-white border-2 border-slate-100 hover:border-emerald-300 rounded-3xl p-5 md:p-6 transition-all shadow-sm hover:shadow-xl relative overflow-hidden"
    >
      {/* Upper Festive Color Line representing a sunny summer arena */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-emerald-400" />

      {/* Dynamic Celebration Overlay */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            className="absolute inset-0 bg-gradient-to-tr from-yellow-300/40 via-emerald-300/20 to-transparent pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      {/* Floating Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`absolute left-1/2 -translate-x-1/2 top-4 px-4 py-2 rounded-2xl flex items-center gap-2 z-50 text-xs font-bold shadow-lg border whitespace-nowrap
              ${
                toast.type === "success"
                  ? "bg-emerald-500 border-emerald-400 text-white"
                  : "bg-rose-500 border-rose-400 text-white"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-4 h-4 fill-white text-emerald-500" />
            ) : (
              <XCircle className="w-4 h-4 fill-white text-rose-500" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏟️ 3-LINE VERSUS REGION WITH RECOGNIZABLE BLURRED BACKDROP FLAGS */}
      <div
        className="relative flex flex-col items-center justify-center rounded-2xl border border-slate-100 p-4 mb-4 overflow-hidden shadow-xs gap-2 text-center"
        style={{
          background: `linear-gradient(135deg, ${homeConfig.color}15 0%, ${homeConfig.color}25 40%, #ffffff 50%, ${awayConfig.color}25 60%, ${awayConfig.color}15 100%)`,
        }}
      >
        {/* Absolute Backdrop Layer: Recognizable, Mildly Blurred Flags */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none flex justify-between items-center px-4 opacity-[0.22] blur-[6px]">
          {/* Left Backdrop Flag (Home) */}
          <span className="text-[80px] transform -translate-x-2 -rotate-12 shrink-0 filter saturate-150">
            {homeConfig.flag}
          </span>
          {/* Right Backdrop Flag (Away) */}
          <span className="text-[80px] transform translate-x-2 rotate-12 shrink-0 filter saturate-150">
            {awayConfig.flag}
          </span>
        </div>

        {/* Line 1: Home Country */}
        <div className="relative z-10 flex items-center justify-start gap-2.5 w-full">
          <span className="text-3xl drop-shadow-sm transform hover:scale-110 transition-transform select-none shrink-0">
            {homeConfig.flag}
          </span>
          <span className="font-black text-slate-800 text-base md:text-lg tracking-tight truncate max-w-[220px]">
            {match.home_team}
          </span>
        </div>

        {/* Line 2: Versus Central Badge */}
        <div className="relative z-10 flex items-center justify-center gap-3 my-0.5">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-slate-300/60" />
          <span className="bg-yellow-400 text-slate-900 font-black text-[11px] px-3 py-1 rounded-full shadow-sm tracking-widest transform -rotate-1 hover:rotate-0 transition-transform">
            VS
          </span>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-slate-300/60" />

          {isLive && (
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-black tracking-wider flex items-center gap-1 shadow-xs animate-pulse">
              LIVE
            </span>
          )}
        </div>

        {/* Line 3: Away Country */}
        <div className="relative z-10 flex items-center justify-end gap-2.5 w-full mt-1">
          <span className="text-3xl drop-shadow-sm transform hover:scale-110 transition-transform select-none shrink-0">
            {awayConfig.flag}
          </span>
          <span className="font-black text-slate-800 text-base md:text-lg tracking-tight truncate max-w-[220px]">
            {match.away_team}
          </span>
        </div>
      </div>

      {/* Meta Timings & Venues */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] font-bold text-slate-400 mb-5 px-1 justify-between sm:justify-start">
        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {new Date(match.match_time).toLocaleDateString([], {
              month: "short",
              day: "numeric",
            })}
            {" @ "}
            {new Date(match.match_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {match.venue && (
          <div className="flex items-center gap-1 max-w-[140px] truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-300" /> {match.venue}
          </div>
        )}

        {(match.group_name || match.stage) && (
          <div className="flex items-center gap-1 text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
            <Users className="w-3.5 h-3.5" />
            {match.group_name || match.stage}
          </div>
        )}
      </div>

      {/* 🎰 HIGH-FIDELITY GLASSMORPHIC BETTING SLIP TERMINAL */}
      <div className="mt-5 bg-gradient-to-b from-slate-50/90 to-slate-100/40 rounded-3xl p-3 border border-slate-200/60 shadow-xs relative overflow-hidden backdrop-blur-md">
        {/* Absolute Cyber Gradient Accent Flairs */}
        <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-24 h-24 bg-sky-400/10 rounded-full blur-xl pointer-events-none" />

        {/* Top Control Bar: Stake Customization (Always Open) */}
        <div className="flex items-center justify-between gap-4 mb-3.5 bg-white/70 backdrop-blur-md rounded-2xl p-2.5 border border-white shadow-2xs">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              Pool Stake Allocation
            </span>

            {/* Sleek Low-Profile Stepper Capsule */}
            <div className="flex items-center bg-slate-900/[0.03] border border-slate-900/5 rounded-xl p-0.5 shadow-inner">
              <button
                type="button"
                disabled={isLocked || stake <= 10}
                onClick={() => setStake((prev: any) => Math.max(10, prev - 5))}
                className="w-8 h-8 rounded-lg font-black text-slate-500 hover:text-slate-900 hover:bg-white disabled:opacity-20 disabled:hover:bg-transparent transition-all text-base select-none cursor-pointer shadow-2xs"
              >
                –
              </button>

              <div className="w-14 text-center font-mono font-black text-sm text-slate-800 flex items-center justify-center gap-0.5 px-1">
                <motion.span
                  key={stake}
                  initial={{ y: -6, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-block"
                >
                  {stake}
                </motion.span>
                <span className="text-xs filter drop-shadow-xs transition-transform hover:scale-125">
                  🐟
                </span>
              </div>

              <button
                type="button"
                disabled={isLocked}
                onClick={() => setStake((prev: any) => prev + 5)}
                className="w-8 h-8 rounded-lg font-black text-slate-500 hover:text-slate-900 hover:bg-white transition-all text-base select-none cursor-pointer shadow-2xs"
              >
                +
              </button>
            </div>
          </div>

          {/* Live Status Display Desk */}
          <div className="text-right flex flex-col justify-end items-end shrink-0">
            {bet ? (
              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-black tracking-wider text-amber-600 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/40 flex items-center gap-1 shadow-2xs">
                  <Trophy className="w-2.5 h-2.5 fill-amber-500 text-amber-600" />{" "}
                  ACTIVE TICKET
                </span>
                <div className="font-bold text-[11px] text-slate-500">
                  Locked on:{" "}
                  <span className="text-slate-800 font-black underline decoration-2 decoration-amber-400">
                    {bet.prediction}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-black tracking-wider text-emerald-600 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-300/30 flex items-center gap-1 animate-pulse">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full inline-block" />{" "}
                  READY
                </span>
                <span className="text-slate-400 text-[10px] font-bold italic tracking-tight">
                  Open for lock-in
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Premium Action Grid Buttons (Always Open) */}
        <div className="grid grid-cols-3 gap-2 relative z-10">
          {[
            {
              label: "HOME",
              color: "emerald",
              icon: "🏠",
              subtitle: "Win Match",
            },
            { label: "DRAW", color: "amber", icon: "🤝", subtitle: "Tie Game" },
            { label: "AWAY", color: "sky", icon: "✈️", subtitle: "Win Match" },
          ].map((item) => {
            const isSelected = bet?.prediction === item.label;
            return (
              <motion.button
                key={item.label}
                whileHover={!isLocked ? { y: -4, scale: 1.02 } : {}}
                whileTap={!isLocked ? { scale: 0.98 } : {}}
                onClick={() => placeBet(item.label)}
                disabled={
                  loading || isLocked || (isSelected && bet?.stake === stake)
                }
                className={`relative py-4 rounded-2xl font-black transition-all border flex flex-col items-center justify-center gap-1.5 cursor-pointer overflow-hidden group
            ${
              isSelected
                ? `${colorSelectedMap[item.color]} border-transparent ring-3 ring-slate-900/10 shadow-lg`
                : `bg-white/90 border-slate-200/60 text-slate-800 hover:bg-white hover:shadow-md hover:border-slate-300`
            } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {/* Subtle Dynamic Ambient Color Flow behind active buttons */}
                {isSelected && (
                  <motion.span
                    layoutId="activePremiumGlow"
                    className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 pointer-events-none mix-blend-overlay"
                  />
                )}

                {/* Interactive Icon Container */}
                <span className="text-xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>

                <div className="flex flex-col items-center leading-none">
                  <span className="text-xs tracking-wider font-black">
                    {item.label}
                  </span>
                  <span
                    className={`text-[8px] mt-1 font-bold tracking-widest uppercase transition-colors px-1.5 py-0.5 rounded-md
              ${isSelected ? "text-white bg-black/20" : "text-slate-400 bg-slate-100 group-hover:text-slate-600"}`}
                  >
                    {isSelected ? "SELECTED" : item.subtitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Hard Secure Safety Banner */}
        {isLocked && (
          <div className="mt-2.5 p-2 bg-slate-950 text-white rounded-xl text-center flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest shadow-inner border border-white/5">
            <span className="h-1 w-1 bg-rose-400 rounded-full animate-ping" />
            <span>Trading Block Concluded</span> 🔒
          </div>
        )}
      </div>

      {/* Minimalist Neo-Dashed Void Cancellation Trigger */}
      {bet && !isLocked && (
        <motion.button
          whileHover={{ scale: 1.01, color: "#f43f5e" }}
          onClick={cancelBet}
          disabled={loading}
          className="mt-2.5 w-full py-2.5 text-slate-400 hover:bg-rose-50/50 rounded-xl text-[10px] font-black tracking-widest transition-all border border-dashed border-slate-200 hover:border-rose-200/60 uppercase cursor-pointer"
        >
          Withdraw Prediction Slip
        </motion.button>
      )}

      {/* Settle / Final Match Result Presentation Row */}
      {match.result && (
        <div className="mt-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-center text-emerald-700 font-black text-xs shadow-inner">
          🎉 Final Result:{" "}
          <span className="underline decoration-wavy decoration-emerald-400">
            {match.result}
          </span>
          {match.score && ` [${match.score}]`}
        </div>
      )}

      {/* Admin Control Deck */}
      {role === "admin" && !match.result && (
        <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-100 text-xs bg-amber-50/50 p-3 rounded-2xl">
          <p className="text-slate-500 font-black mb-2 flex items-center gap-1 tracking-wider text-[10px]">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> ADMIN FIELD
            MANAGER
          </p>
          <div className="grid grid-cols-3 gap-2">
            {["HOME", "DRAW", "AWAY"].map((res) => (
              <button
                key={res}
                onClick={() => settleMatch(match.id, res)}
                className="py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold transition shadow-sm text-[10px]"
              >
                🏆 {res}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
