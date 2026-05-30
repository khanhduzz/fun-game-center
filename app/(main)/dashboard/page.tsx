"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Trophy, Star, PartyPopper } from "lucide-react";

export default function GamesLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-green-200 relative overflow-hidden">
      {/* 🎪 SUNNY FIELD BACKDROP (Sky blue blending down to emerald grass accent) */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-50 pointer-events-none shadow-inner" />

      {/* Playful abstract vector shapes representing field lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full border-8 border-white" />
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full border-8 border-white" />
      </div>

      <main className="flex-1 min-h-screen relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-12">
          {/* OFFICIAL TOURNAMENT HEADER PANEL */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/20 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/90 border border-yellow-400 text-emerald-600 px-4 py-1.5 rounded-full shadow-sm animate-bounce-short">
                <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span className="font-extrabold text-xs uppercase tracking-wider">
                  🏆 World Cup 2026 Carnival
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 drop-shadow-sm">
                Game Center
              </h2>
            </div>

            <div className="text-xs font-black uppercase tracking-wider text-slate-700 bg-white/95 border border-slate-200/60 px-4 py-2.5 rounded-2xl shadow-md backdrop-blur-md flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ⚡ Live Desk:{" "}
              <span className="text-emerald-600 font-extrabold">
                Pitches Active
              </span>
            </div>
          </header>

          {/* HIGH-ENERGY ARENA SELECTION GRID */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* World Cup Active Stadium Card */}
            <Link href="/games/worldcup" className="block group">
              <motion.div
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="relative h-72 rounded-3xl overflow-hidden bg-white border-4 border-emerald-400 shadow-xl transition-all duration-300 group-hover:border-yellow-400 group-hover:shadow-2xl flex flex-col justify-between p-6 md:p-8"
              >
                {/* Immersive Playful Backdrops */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 via-transparent to-amber-50/30 pointer-events-none" />

                {/* Top Banner Ribbon Accents */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-500 transform scale-x-100 transition-transform duration-500 origin-center" />

                <div className="z-20 flex justify-between items-center">
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-black text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 border border-white/20">
                    <Star
                      className="w-3 h-3 fill-current animate-spin"
                      style={{ animationDuration: "5s" }}
                    />{" "}
                    CHAMPIONSHIP LIVE
                  </span>
                  <div className="text-4xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    ⚽
                  </div>
                </div>

                <div className="z-20 space-y-3">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
                    World Cup 2026
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-slate-600 text-sm max-w-sm group-hover:text-slate-800 transition-colors font-medium leading-relaxed">
                    Lock in your country winners, climb the global table, and
                    rake in massive{" "}
                    <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 px-2 py-0.5 rounded-md font-black inline-flex items-center gap-1 shadow-inner">
                      🐟 Fish Cash
                    </span>{" "}
                    rewards.
                  </p>

                  <div className="pt-1.5 flex items-center gap-1.5 text-xs font-black text-emerald-600 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <span className="tracking-widest uppercase">
                      ENTER ARENA STADIUM
                    </span>
                    <span className="transform group-hover:translate-x-1 transition-transform font-bold">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Coming Soon Draft Card */}
            <div className="relative h-72 rounded-3xl bg-white/40 border-4 border-slate-200 border-dashed flex flex-col items-center justify-center p-6 text-center group overflow-hidden backdrop-blur-sm shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/50" />

              <div className="z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center mx-auto text-2xl text-slate-400 group-hover:scale-110 group-hover:border-yellow-400 group-hover:text-amber-500 transition-all duration-500">
                  <PartyPopper className="w-6 h-6 text-slate-400 group-hover:text-yellow-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black tracking-tight text-slate-700 group-hover:text-slate-900 transition-colors">
                    More Dropping Soon
                  </h3>
                  <p className="text-xs text-slate-500 max-w-[240px] mx-auto leading-relaxed font-bold uppercase tracking-wide">
                    We are engineering new ways to play and secure extra
                    currency. Stay locked!
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[9px] font-black tracking-widest text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-xl border border-slate-300/40">
                  <Compass className="w-3 h-3 text-slate-400" /> TOURNAMENT
                  EXPANSION
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
