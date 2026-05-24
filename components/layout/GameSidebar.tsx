"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Trophy, Layers, LogOut } from "lucide-react";

export default function GameSidebar() {
  const pathname = usePathname();

  // Helper function to check active route
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-md p-6 flex flex-col justify-between fixed h-screen z-30">
      <div className="space-y-8">
        {/* Brand/Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-violet-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <Gamepad2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              PXP<span className="text-yellow-400">.</span>
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
              ARCADE Team
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-3 mb-2">
            Navigation
          </p>

          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive("/dashboard")
                ? "bg-gradient-to-r from-yellow-400/10 to-transparent border-l-2 border-yellow-400 text-yellow-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          {/* <Link
            href="/games"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive("/games")
                ? "bg-gradient-to-r from-yellow-400/10 to-transparent border-l-2 border-yellow-400 text-yellow-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Games</span>
          </Link> */}

          <Link
            href="/leaderboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive("/leaderboard")
                ? "bg-gradient-to-r from-yellow-400/10 to-transparent border-l-2 border-yellow-400 text-yellow-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 group"
            }`}
          >
            <Trophy
              className={`w-5 h-5 ${isActive("/leaderboard") ? "" : "group-hover:text-amber-400 transition-colors"}`}
            />
            <span>Leaderboard</span>
          </Link>
        </nav>
      </div>

      {/* Footer actions */}
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium w-full mt-auto">
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </aside>
  );
}
