"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import MatchCardModern from "@/components/game/MatchCardModern";
import MatchCard from "@/components/game/MatchCard";
import {
  Trophy,
  Calendar,
  Sparkles,
  RefreshCw,
  ChevronDown,
  Coins,
  PartyPopper,
  Flame,
  MapPin,
} from "lucide-react";
import {
  convertBalanceAction,
  joinWorldCupAction,
} from "@/features/worldcup/actions";
import LoadingWave from "@/components/ui/LoadingWave";

interface WorldCupClientProps {
  wallet: any;
  isNewPlayer: boolean;
  userId: string;
  upcomingMatches: any[];
  finishedMatches: any[];
  betMap: Record<string, any>;
  role?: string;
  totalMatches: number;
  totalBets: number;
  wonBetsCount?: number;
}

export default function WorldCupClientModern({
  wallet: initialWallet,
  isNewPlayer,
  userId,
  upcomingMatches,
  finishedMatches,
  betMap,
  role,
  totalMatches,
  totalBets,
  wonBetsCount = 0,
}: WorldCupClientProps) {
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeStageFilter, setActiveStageFilter] = useState<string>("ALL");

  // Modals state
  const [showModal, setShowModal] = useState(isNewPlayer);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [wallet, setWallet] = useState(initialWallet);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Sort upcoming matches by closest time
  const sortedUpcoming = useMemo(() => {
    let filtered = [...upcomingMatches];
    if (activeStageFilter !== "ALL") {
      filtered = filtered.filter(
        (m) => m.stage?.toUpperCase() === activeStageFilter.toUpperCase(),
      );
    }
    return filtered.sort(
      (a, b) =>
        new Date(a.match_time).getTime() - new Date(b.match_time).getTime(),
    );
  }, [upcomingMatches, activeStageFilter]);

  // Extract unique stages available for tabs
  const stagesAvailable = useMemo(() => {
    const stages = new Set<string>();
    upcomingMatches.forEach((m) => {
      if (m.stage) stages.add(m.stage);
    });
    return ["ALL", ...Array.from(stages)];
  }, [upcomingMatches]);

  const displayedUpcoming = sortedUpcoming.slice(0, visibleCount);
  const hasMore = visibleCount < sortedUpcoming.length;

  const handleSyncMatches = async () => {
    setIsSyncing(true);
    setSyncMessage("");
    try {
      const res = await fetch("/api/admin/sync-matches", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSyncMessage("✨ Stadium schedule synchronized!");
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setSyncMessage(`❌ Sync failed: ${data.message}`);
      }
    } catch {
      setSyncMessage("❌ Failed to contact the stadium server.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCancel = () => router.push("/");

  const handleAgree = async () => {
    setIsJoining(true);
    try {
      const newWallet = await joinWorldCupAction(userId);
      setWallet(newWallet);
      setShowModal(false);
      router.refresh();
    } catch (error) {
      alert("Oops! Make sure you have enough Fish Cash in your main account!");
    } finally {
      setIsJoining(false);
    }
  };

  const handleConvertFunds = async () => {
    setIsConverting(true);
    try {
      const updatedWallet = await convertBalanceAction({
        userId,
        targetGame: "worldcup",
        amount: 50,
      });
      setWallet(updatedWallet);
      setShowConvertModal(false);
      router.refresh();
    } catch (error) {
      alert("Transaction missed the net! Verify your Main Wallet balance.");
    } finally {
      setIsConverting(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingWave message="Loading World Cup Arena..." variant="worldcup" />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-green-200">
      {/* 🎫 ENTRY MODAL (Bright & Celebratory) */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-yellow-400 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 transform scale-100 transition-all animate-bounce-short">
            <div className="flex justify-center -mt-16">
              <div className="bg-gradient-to-tr from-yellow-400 to-amber-300 p-5 rounded-full shadow-lg border-4 border-white text-white">
                <PartyPopper className="w-12 h-12 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-emerald-600">
                Welcome to the Party!
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                Unlock your Golden Ticket to the World Cup 2026 Betting Arena!
                Let's get your tournament wallet ready.
              </p>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex items-center gap-4 text-sm text-emerald-800">
              <Coins className="w-8 h-8 text-amber-500 shrink-0" />
              <span className="font-medium">
                Entry fee:{" "}
                <span className="text-emerald-600 font-black text-lg">
                  50 🐟
                </span>{" "}
                Fish Cash. Fun, rewards, and glory await!
              </span>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={handleCancel}
                disabled={isJoining}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3.5 px-4 rounded-2xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                Maybe Later
              </button>
              <button
                onClick={handleAgree}
                disabled={isJoining}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-black py-3.5 px-4 rounded-2xl transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isJoining ? "Opening Gates..." : "Let's Play! ⚽"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🪙 CONVERT CASH MODAL */}
      {showConvertModal && (
        <div className="fixed inset-0 bg-sky-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-sky-400 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6">
            <div className="flex justify-center">
              <div className="bg-sky-100 p-4 rounded-2xl text-sky-500">
                <Coins className="w-12 h-12" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-800">
                Top Up Tournament Wallet
              </h2>
              <p className="text-slate-500 text-sm">
                Instantly transfer your liquid funds to get right back into the
                action.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-center">
              <p className="text-xs uppercase font-bold text-sky-600 tracking-wider">
                Transfer Target
              </p>
              <p className="text-xl font-black text-slate-700 mt-1">
                50 🐟 Fish Cash
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConvertModal(false)}
                disabled={isConverting}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 px-4 rounded-xl transition"
              >
                Go Back
              </button>
              <button
                onClick={handleConvertFunds}
                disabled={isConverting}
                className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-sky-200"
              >
                {isConverting ? "Transferring..." : "Confirm Top-Up"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎪 HERO SECTION (Sunny Field Festival vibe) */}
      <div className="relative overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-50 pb-20 pt-12 shadow-inner">
        {/* Playful abstract vector shapes representing field lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-8 border-white" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full border-8 border-white" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Branding */}
            <div className="text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/90 border border-yellow-400 text-emerald-600 px-4 py-1.5 rounded-full shadow-sm animate-bounce-short">
                <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                <span className="font-extrabold text-xs uppercase tracking-wider">
                  🏆 World Cup 2026 Carnival
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight drop-shadow-sm leading-tight">
                Predict. Score. <br className="hidden md:block" />
                <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                  Celebrate Big!
                </span>
              </h1>
              <p className="text-slate-700 font-medium text-lg">
                Back your favorites using your shiny{" "}
                <span className="underline decoration-yellow-400 decoration-2 font-bold text-slate-900">
                  🐟 Fish Cash
                </span>
              </p>
            </div>

            {/* Right Action/Wallet Widget */}
            <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-3">
              <div className="bg-white border-4 border-emerald-400 rounded-3xl p-6 shadow-xl w-full sm:w-80 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-2xl">
                    <Coins className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Your Game Bag
                    </p>
                    <p className="text-4xl font-black text-emerald-600 tracking-tight">
                      {wallet?.balance ?? 0}{" "}
                      <span className="text-2xl">🐟</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Rows */}
              <div className="flex gap-2 w-full justify-center lg:justify-end">
                <button
                  onClick={() => setShowConvertModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 text-sm"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  Get Fish Cash (+50 🐟)
                </button>

                {role === "admin" && (
                  <button
                    onClick={handleSyncMatches}
                    disabled={isSyncing}
                    className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-3 rounded-2xl shadow-sm transition-all text-sm disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-4 h-4 text-emerald-500 ${isSyncing ? "animate-spin" : ""}`}
                    />
                    {isSyncing ? "Syncing..." : "Sync API"}
                  </button>
                )}
              </div>
              {syncMessage && (
                <p className="text-xs bg-white py-1 px-3 rounded-full text-slate-600 shadow-sm font-semibold">
                  {syncMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📊 LIVE TOURNAMENT METRICS (Elevated White Cards) */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-amber-100 p-3 rounded-xl text-amber-500">
              <Flame className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Live & Upcoming
              </p>
              <p className="text-2xl font-black text-slate-800">
                {upcomingMatches.length} Matches
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-sky-100 p-3 rounded-xl text-sky-500">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Your Placed Bets
              </p>
              <p className="text-2xl font-black text-slate-800">
                {totalBets} Tickets
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Successful Predictions
              </p>
              <p className="text-2xl font-black text-emerald-600">
                {wonBetsCount} Won 🎉
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ⚽ MAIN PLAYGROUND CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        {/* Dynamic Categorization Tabs */}
        {stagesAvailable.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-200/60 p-1.5 rounded-2xl w-fit">
            {stagesAvailable.map((stage) => (
              <button
                key={stage}
                onClick={() => {
                  setActiveStageFilter(stage);
                  setVisibleCount(12);
                }}
                className={`px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  activeStageFilter === stage
                    ? "bg-white text-emerald-600 shadow-sm scale-100"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {stage === "ALL" ? "🌍 All Stages" : stage}
              </button>
            ))}
          </div>
        )}

        {/* 🟢 UPCOMING MATCHES HUB */}
        {sortedUpcoming.length > 0 ? (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                🟢 Live & Upcoming Predictions
              </h2>
              <div className="h-1 flex-1 bg-slate-200 rounded-full" />
            </div>

            {/* Grid display with playful shadow extensions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedUpcoming.map((match) => (
                <div
                  key={match.id}
                  className="bg-white flex flex-col justify-between rounded-3xl p-1 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 duration-200 border border-slate-100"
                >
                  <MatchCardModern
                    match={match}
                    bet={betMap[match.id]}
                    role={role}
                  />
                  {/* Enhanced Context Footer added dynamically inside the dashboard structure */}
                  {(match.venue || match.group_name) && (
                    <div className="px-4 pb-3 pt-1 flex items-center justify-between text-[11px] font-bold text-slate-400 bg-slate-50/80 rounded-b-2xl border-t border-slate-100/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />{" "}
                        {match.venue || "Stadium"}
                      </span>
                      {match.group_name && (
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          {match.group_name}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={(loadMore) => setVisibleCount((prev) => prev + 12)}
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-emerald-600 border-2 border-slate-200 hover:border-emerald-300 font-bold px-8 py-3.5 rounded-2xl text-sm transition-all shadow-sm shadow-slate-100"
                >
                  See More Fixtures
                  <ChevronDown className="w-4 h-4 text-emerald-500" />
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className="text-center py-16 bg-white border-2 border-dashed border-slate-200 rounded-3xl my-8">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">
              No matches available right now for this stage tab.
            </p>
          </div>
        )}

        {/* 🏁 COMPLETED MATCHES HUB */}
        {finishedMatches.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-400 tracking-tight">
                🏁 Finished Matches History
              </h2>
              <div className="h-1 flex-1 bg-slate-200 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-85 hover:opacity-100 transition-opacity">
              {finishedMatches.slice(0, 12).map((match) => (
                <div
                  key={match.id}
                  className="bg-slate-100 border border-slate-200/80 rounded-3xl shadow-inner grayscale-[20%] hover:grayscale-0 transition-all"
                >
                  <MatchCardModern
                    match={match}
                    bet={betMap[match.id]}
                    role={role}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
