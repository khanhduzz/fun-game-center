"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import { Coins, LogOut, Trophy } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HeaderModern() {
  const { data: session } = useSession();
  const { data: wallet } = useSWR("/api/wallets", fetcher);

  const userName = session?.user?.name || "Player";
  const avatarSeed = session?.user?.name || "default";

  return (
    <header className="sticky top-0 z-40 relative">
      {/* 🌤️ Soft sky blend (IMPORTANT) */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300/80 via-white/70 to-white pointer-events-none" />

      {/* subtle bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🏆 BRAND */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-tr from-yellow-400 to-amber-300 p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
            <Trophy className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="font-black text-2xl tracking-wider text-slate-900">
              PXP<span className="text-yellow-500">.</span>
            </h1>
            <p className="text-[10px] text-emerald-600 font-bold tracking-widest uppercase -mt-1">
              World Cup Arena
            </p>
          </div>
        </a>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* 💰 WALLET → matches hero card */}
          <div className="bg-white border-2 border-emerald-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm hover:shadow-md transition">
            <Coins className="w-5 h-5 text-amber-500" />
            <div className="font-black text-lg text-emerald-600">
              {wallet?.main ?? 0}
              <span className="text-amber-500 text-sm ml-1">🐟</span>
            </div>
          </div>

          {/* 👤 PLAYER */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 pl-3 pr-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition group">
            <Avatar className="w-9 h-9 border border-slate-200 group-hover:border-emerald-400">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                alt={userName}
              />
            </Avatar>

            <div>
              <p className="text-sm font-bold text-slate-800 truncate max-w-[140px]">
                {userName}
              </p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase">
                On the Field
              </p>
            </div>
          </div>

          {/* 🚪 EXIT */}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
}
