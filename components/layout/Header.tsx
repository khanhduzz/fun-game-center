"use client";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import { Coins, LogOut, Gamepad2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Header() {
  const { data: session } = useSession();
  const { data: wallet } = useSWR("/api/wallets", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  const userName = session?.user?.name || "Player";
  const avatarSeed = session?.user?.name || "default";

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-10 py-5 flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-violet-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <Gamepad2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="font-black text-2xl tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              ARCADE<span className="text-yellow-400">.</span>
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase -mt-1">
              Fish Game Center
            </p>
          </div>
        </div>

        {/* Right Side - User Info & Actions */}
        <div className="flex items-center gap-4">
          {/* Wallet Balance */}
          <div className="bg-zinc-900 border border-zinc-800 px-5 py-2.5 rounded-2xl flex items-center gap-2 hover:border-yellow-400/30 transition-colors group">
            <div className="text-yellow-400">
              <Coins className="w-5 h-5" />
            </div>
            <div className="font-black text-lg tracking-tight text-white">
              {wallet?.main ?? 0}{" "}
              <span className="text-yellow-400 text-sm">🐟</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 pl-3 pr-5 py-2 rounded-2xl hover:border-yellow-400/30 transition-all group">
            <Avatar className="w-9 h-9 border border-zinc-700 group-hover:border-yellow-400/50 transition-colors">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                alt={userName}
              />
            </Avatar>
            <div>
              <p className="text-sm font-bold text-white truncate max-w-[140px]">
                {userName}
              </p>
              <p className="text-[10px] text-emerald-400 font-medium">Online</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
