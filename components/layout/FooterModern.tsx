"use client";

import { Trophy, Terminal, Heart } from "lucide-react";

export default function FooterModern() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden border-t border-emerald-100 bg-gradient-to-b from-white via-emerald-50 to-emerald-100/40 text-slate-600">
      {/* 🌤️ Soft stadium glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-400/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-0 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* ⚽ subtle pitch grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6 relative z-10">
        {/* 🔝 Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-yellow-400 to-amber-400 p-2.5 rounded-xl shadow-md text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-900 font-black tracking-wider text-sm block">
                X WORLD CUP
              </span>
              <span className="text-xs text-emerald-600 font-semibold">
                Tournament Arena
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs tracking-wide bg-white border border-emerald-100 rounded-xl px-4 py-2 shadow-sm">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Terminal className="w-3.5 h-3.5 text-emerald-500" />
              Core Node: 1.0.0
            </span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              ● Stadium Live
            </span>
          </div>
        </div>

        {/* 🧾 Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-500">
            © {currentYear} X Team. All Rights Reserved.
          </p>

          <p className="flex items-center gap-1.5 text-slate-500">
            Crafted with{" "}
            <Heart className="w-3 h-3 text-red-500 fill-red-400/30" /> for the
            squad ⚽
          </p>
        </div>
      </div>
    </footer>
  );
}
