"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Gamepad2,
  User,
  Coins,
  Layers,
  LogOut,
  Flame,
} from "lucide-react";

export default function GamesLayout() {
  // Mock User State
  //   const [user, setUser] = useState({
  //     name: "Alex Gamer",
  //     balance: 1250,
  //     avatar: "⚡",
  //   });

  return (
    <div className="flex min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black">
      {/* 1. LEFT TASK BAR (SIDEBAR) */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-md p-6 flex flex-col justify-between fixed h-screen z-30">
        <div className="space-y-8">
          {/* Brand/Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-violet-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)]">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                ARCADE<span className="text-yellow-400">.</span>
              </h1>
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                Team Hub
              </p>
            </div>
          </div>

          {/* User Profile Widget */}
          {/* <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute -right-2 -bottom-2 text-4xl opacity-10 group-hover:scale-125 transition-transform duration-300">
              {user.avatar}
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-zinc-100">
                {user.name}
              </p>
              <div className="flex items-center gap-1.5 text-yellow-400 mt-0.5">
                <Coins className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-xs font-black tracking-wide">
                  {user.balance} 🐟
                </span>
              </div>
            </div>
          </div> */}

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-3 mb-2">
              Navigation
            </p>
            <Link
              href="/games"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400/10 to-transparent border-l-2 border-yellow-400 text-yellow-400 font-medium transition-all"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Games</span>
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-all group"
            >
              <Trophy className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
              <span>Leaderboard</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-all"
            >
              <Layers className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </nav>
        </div>

        {/* Footer actions */}
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium w-full mt-auto">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pl-64 min-h-screen">
        <div className="max-w-5xl mx-auto p-10 space-y-10">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
            <div>
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest mb-1">
                <Flame className="w-4 h-4 fill-current" /> Live Events
              </div>
              <h2 className="text-4xl font-black tracking-tight">
                Game Center
              </h2>
            </div>
            <div className="text-sm text-zinc-400 bg-zinc-900/40 px-4 py-2 rounded-full border border-zinc-800/80 backdrop-blur-sm">
              ⚡ Status:{" "}
              <span className="text-emerald-400 font-bold">
                All Systems Nominal
              </span>
            </div>
          </header>

          {/* GAMES GRID */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* 2. WORLD CUP PREDICTOR CARD */}
            <Link href="/games/worldcup" className="block group">
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-64 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-yellow-400/40 group-hover:shadow-[0_0_40px_rgba(234,179,8,0.15)] flex flex-col justify-between p-6"
              >
                {/* Immersive Background Decorator */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(234,179,8,0.25),transparent_60%)] group-hover:bg-[radial-gradient(circle_at_70%_20%,rgba(234,179,8,0.4),transparent_60%)] transition-all duration-500" />

                {/* Glowing neon green accents mimicking stadium lights */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />

                {/* Top Row Indicators */}
                <div className="z-20 flex justify-between items-start">
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-md shadow-lg shadow-yellow-400/20">
                    LIVE EVENT
                  </span>
                  <div className="text-4xl drop-shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    ⚽
                  </div>
                </div>

                {/* Bottom Row Information */}
                <div className="z-20 space-y-2">
                  <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    World Cup 2026
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-sm group-hover:text-zinc-300 transition-colors">
                    Lock in your match winners, climb the server table, and rake
                    in massive{" "}
                    <span className="text-yellow-400 font-medium">
                      🐟 Fish Cash
                    </span>{" "}
                    rewards.
                  </p>

                  {/* Action CTA Hint */}
                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-yellow-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>PLAY NOW</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* 3. COMING SOON CARD */}
            <div className="relative h-64 rounded-2xl bg-zinc-950 border border-zinc-900 border-dashed flex flex-col items-center justify-center p-6 text-center group overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(39,39,42,0.4),transparent_70%)]" />
              <div className="z-10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-xl text-zinc-500 group-hover:scale-110 group-hover:bg-zinc-800 group-hover:text-zinc-400 transition-all duration-300">
                  🎲
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    More Dropping Soon
                  </h3>
                  <p className="text-xs text-zinc-600 max-w-[200px] mx-auto mt-1">
                    We are engineering new ways to take your team currency. Stay
                    locked.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
