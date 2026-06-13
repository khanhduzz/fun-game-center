"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Trophy, Layers, LogOut, ShieldCheck } from "lucide-react";

export default function GameSidebarModern() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-white/80 backdrop-blur-sm p-5 flex flex-col justify-between fixed h-screen z-30">
      {/* 🌤️ subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/60 via-white to-emerald-50 pointer-events-none z-0" />

      <div className="relative z-10 space-y-8">
        {/* 🏆 Brand */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-tr from-yellow-400 to-amber-300 p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="font-black text-xl tracking-wider text-slate-900">
              X<span className="text-yellow-500">.</span>
            </h1>
            <p className="text-[10px] text-emerald-600 font-bold tracking-widest uppercase">
              World Cup Hub
            </p>
          </div>
        </a>

        {/* 📍 Navigation */}
        <nav className="space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-3 mb-2">
            Navigation
          </p>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
              isActive("/dashboard")
                ? "bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          {/* Leaderboard */}
          <Link
            href="/leaderboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
              isActive("/leaderboard")
                ? "bg-yellow-100 text-yellow-600 border border-yellow-200 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 group"
            }`}
          >
            <Trophy
              className={`w-5 h-5 ${
                isActive("/leaderboard")
                  ? ""
                  : "group-hover:text-yellow-500 transition-colors"
              }`}
            />
            <span>Leaderboard</span>
          </Link>
        </nav>
      </div>

      {/* ⚠️ Footer */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              Simulation Mode
            </h4>
            <p className="text-slate-500 text-[10px] leading-relaxed">
              This platform is for{" "}
              <span className="font-semibold text-slate-600">
                entertainment and internal simulation only
              </span>
              . No real money or assets involved.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all text-sm font-semibold w-full">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
