"use client";

import { useState, useEffect } from "react";
import MatchCard from "@/components/game/MatchCard";
import { Trophy, Calendar, Users } from "lucide-react";

interface WorldCupClientProps {
  wallet: any;
  upcomingMatches: any[];
  finishedMatches: any[];
  betMap: Record<string, any>;
  role?: string;
  totalMatches: number;
  totalBets: number;
}

export default function WorldCupClient({
  wallet,
  upcomingMatches,
  finishedMatches,
  betMap,
  role,
  totalMatches,
  totalBets,
}: WorldCupClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Artificial 3-second loading to prevent spam
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-yellow-400 mt-6 text-lg font-medium tracking-wide">
          Loading World Cup Matches...
        </p>
        <p className="text-zinc-500 text-sm mt-2">
          Preparing live betting arena
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Title + Wallet in same row */}
      <div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-950 to-black py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left: Title */}
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

            {/* Right: Compact Wallet */}
            <div className="bg-zinc-900 border border-yellow-400/30 rounded-2xl p-5 lg:w-72 flex-shrink-0">
              <div className="flex items-center gap-4">
                <Trophy className="w-9 h-9 text-yellow-400" />
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest">
                    Your Balance
                  </p>
                  <p className="text-3xl font-black text-yellow-400">
                    {wallet?.balance ?? 0} <span className="text-xl">🐟</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pt-10">
        {/* Stats Bar */}
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

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
              <h2 className="text-3xl font-bold flex items-center gap-3">
                🔥 Live Betting
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((match) => (
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
              {finishedMatches.map((match) => (
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

        {totalMatches === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No matches available yet. Come back soon!
          </div>
        )}
      </div>
    </>
  );
}
