"use client";

import { Trophy, ShieldCheck, Terminal, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-zinc-800 text-zinc-500 z-100">
      <div className="max-w-6xl mx-auto px-8 py-12 space-y-8">
        {/* Main Info Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400/10 p-2.5 rounded-xl border border-yellow-400/20 text-yellow-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-black tracking-wider text-sm block">
                PXP ARCADE
              </span>
              <span className="text-xs text-zinc-500">
                Team Tournament Arena
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs tracking-wide bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-yellow-400" /> Core Node:
              1.0.0
            </span>
            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              ● Systems Nominal
            </span>
          </div>
        </div>

        {/* Entertainment Disclaimer Box */}
        {/* <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-yellow-400/70 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-zinc-300 text-xs font-bold uppercase tracking-wider">
              Simulation Disclaimer
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed">
              All games, match predictions, and asset actions hosted on this
              platform are for
              <span className="text-zinc-400 font-medium">
                {" "}
                entertainment and internal team simulation purposes only
              </span>
              . No real fiat currencies, actual wagers, or real-world financial
              assets are used or processed. This is an internally maintained
              playground created solely for team engagement.
            </p>
          </div>
        </div> */}

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {currentYear} PXP Team. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with{" "}
            <Heart className="w-3 h-3 text-red-500/80 fill-red-500/20" /> for
            the crew
          </p>
        </div>
      </div>
    </footer>
  );
}
