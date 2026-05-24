"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function GamesLayout() {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black">
      <main className="flex-1 min-h-screen">
        <div className="max-w-5xl mx-auto p-10 space-y-10">
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
            {/* World Cup Card */}
            <Link href="/games/worldcup" className="block group">
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-64 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-yellow-400/40 group-hover:shadow-[0_0_40px_rgba(234,179,8,0.15)] flex flex-col justify-between p-6"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(234,179,8,0.25),transparent_60%)] group-hover:bg-[radial-gradient(circle_at_70%_20%,rgba(234,179,8,0.4),transparent_60%)] transition-all duration-500" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />

                <div className="z-20 flex justify-between items-start">
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-md shadow-lg shadow-yellow-400/20">
                    LIVE EVENT
                  </span>
                  <div className="text-4xl drop-shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    ⚽
                  </div>
                </div>

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

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-yellow-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>PLAY NOW</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Coming Soon Card */}
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
