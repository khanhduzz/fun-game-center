"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import MatchCard from "@/components/game/MatchCard";
import {
  Trophy,
  Calendar,
  Users,
  RefreshCw,
  ChevronDown,
  AlertTriangle,
  Coins,
} from "lucide-react";
import {
  convertBalanceAction,
  joinWorldCupAction,
} from "@/features/worldcup/actions";
import LoadingWave from "@/components/ui/LoadingWave";
import MatchCardModern from "@/components/game/MatchCardModern";

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
}

export default function WorldCupClient({
  wallet: initialWallet,
  isNewPlayer,
  userId,
  upcomingMatches,
  finishedMatches,
  betMap,
  role,
  totalMatches,
  totalBets,
}: WorldCupClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  // Modals state
  const [showModal, setShowModal] = useState(isNewPlayer);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [wallet, setWallet] = useState(initialWallet);

  // Artificial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Sort upcoming matches by nearest time
  const sortedUpcoming = useMemo(() => {
    return [...upcomingMatches].sort(
      (a, b) =>
        new Date(a.match_time).getTime() - new Date(b.match_time).getTime(),
    );
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
        setSyncMessage("✅ Matches updated successfully!");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setSyncMessage(`❌ ${data.message || "Sync failed"}`);
      }
    } catch {
      setSyncMessage("❌ Failed to sync matches");
    } finally {
      setIsSyncing(false);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  // Action handlers for Entry Modal
  const handleCancel = () => {
    router.push("/"); // Back to main dashboard/home
  };

  const handleAgree = async () => {
    setIsJoining(true);
    try {
      const newWallet = await joinWorldCupAction(userId);
      setWallet(newWallet);
      setShowModal(false);
      router.refresh();
    } catch (error) {
      alert("Failed to join the tournament. Please check your main balance.");
    } finally {
      setIsJoining(false);
    }
  };

  // Action handlers for Fund Conversion Modal
  const handleConvertFunds = async () => {
    setIsConverting(true);
    try {
      // Pass configurations dynamically
      const updatedWallet = await convertBalanceAction({
        userId,
        targetGame: "worldcup",
        amount: 50,
      });

      setWallet(updatedWallet);
      setShowConvertModal(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        "Failed to convert cash. Please verify you have enough balance in your Main Wallet.",
      );
    } finally {
      setIsConverting(false);
    }
  };

  if (isLoading) {
    return <LoadingWave message="Loading World Cup Arena..." />;
  }

  const isAnyModalOpen = showModal || showConvertModal;

  return (
    <>
      {/* Entry Fee Confirmation Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-md w-full p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6">
            <div className="flex justify-center">
              <div className="bg-yellow-400/10 p-4 rounded-2xl border border-yellow-400/20 text-yellow-400">
                <Trophy className="w-12 h-12" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-white">
                Enter the Arena
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                You haven't initialized your tournament dashboard yet. Let's get
                your wallet setup.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 text-sm text-zinc-300">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
              <span>
                Starting this event will automatically deduct{" "}
                <span className="text-yellow-400 font-black">
                  50 🐟 Fish Cash
                </span>{" "}
                from your account.
              </span>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={handleCancel}
                disabled={isJoining}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3.5 px-4 rounded-xl transition text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAgree}
                disabled={isJoining}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold py-3.5 px-4 rounded-xl transition text-sm disabled:opacity-50"
              >
                {isJoining ? "Deducting..." : "Agree & Go"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert Cash Modal Overlay */}
      {showConvertModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-md w-full p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6">
            <div className="flex justify-center">
              <div className="bg-emerald-400/10 p-4 rounded-2xl border border-emerald-400/20 text-emerald-400">
                <Coins className="w-12 h-12" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-white">
                Convert Fish Cash
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Move cash from your Main Wallet directly into your World Cup
                Betting Wallet.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 text-sm text-zinc-300">
              <AlertTriangle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                This action will instantly transfer{" "}
                <span className="text-emerald-400 font-black">
                  50 🐟 Fish Cash
                </span>{" "}
                to your tournament balance.
              </span>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setShowConvertModal(false)}
                disabled={isConverting}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3.5 px-4 rounded-xl transition text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConvertFunds}
                disabled={isConverting}
                className="flex-1 bg-emerald-400 hover:bg-emerald-350 active:bg-emerald-500 text-black font-bold py-3.5 px-4 rounded-xl transition text-sm disabled:opacity-50"
              >
                {isConverting ? "Converting..." : "Convert Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Game Interface Block */}
      <div className={isAnyModalOpen ? "pointer-events-none blur-sm" : ""}>
        {/* Hero Section */}
        <div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-950 to-black py-12">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-5 py-2 rounded-full mb-4">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-widest">
                    WORLD CUP 2026
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                  Predict. Bet. Win.
                </h1>
                <p className="text-zinc-400 text-lg mt-2">
                  Place your bets with{" "}
                  <span className="text-yellow-400">🐟 Fish Cash</span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                {/* Wallet */}
                <div className="bg-zinc-900 border border-yellow-400/30 rounded-2xl p-5 lg:w-72">
                  <div className="flex items-center gap-4">
                    <Trophy className="w-9 h-9 text-yellow-400" />
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400 uppercase tracking-widest">
                        Your Balance
                      </p>
                      <p className="text-3xl font-black text-yellow-400">
                        {wallet?.balance ?? 0}{" "}
                        <span className="text-xl">🐟</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Buttons Row */}
                <div className="flex gap-2 w-full lg:w-auto">
                  {/* Convert Funds Button */}
                  <button
                    onClick={() => setShowConvertModal(true)}
                    className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    <Coins className="w-4 h-4" />
                    Convert Cash (50 🐟)
                  </button>

                  {/* Admin Sync Button */}
                  {role === "admin" && (
                    <button
                      onClick={handleSyncMatches}
                      disabled={isSyncing}
                      className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-yellow-400/30 text-yellow-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
                      />
                      {isSyncing ? "Updating..." : "Update Matches"}
                    </button>
                  )}
                </div>

                {syncMessage && (
                  <p className="text-xs text-zinc-400 mt-1">{syncMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 pt-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
              <Calendar className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-sm text-zinc-400">Upcoming</p>
                <p className="text-3xl font-bold">{upcomingMatches.length}</p>
              </div>
            </div>
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
              <Users className="w-8 h-8 text-violet-400" />
              <div>
                <p className="text-sm text-zinc-400">Your Bets</p>
                <p className="text-3xl font-bold">{totalBets}</p>
              </div>
            </div>
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
              <Trophy className="w-8 h-8 text-amber-400" />
              <div>
                <p className="text-sm text-zinc-400">Total Matches</p>
                <p className="text-3xl font-bold">{totalMatches}</p>
              </div>
            </div>
          </div>

          {/* Upcoming Matches - Limited */}
          {sortedUpcoming.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  🔥 Live Betting
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedUpcoming.map((match) => (
                  <MatchCardModern
                    key={match.id}
                    match={match}
                    bet={betMap[match.id]}
                    role={role}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={loadMore}
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400/50 px-8 py-3 rounded-2xl text-sm font-medium transition-all"
                  >
                    Load More Matches
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Finished Matches */}
          {finishedMatches.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                <h2 className="text-3xl font-bold text-zinc-400">
                  Completed Matches
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90">
                {finishedMatches.slice(0, 12).map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    bet={betMap[match.id]}
                    role={role}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
