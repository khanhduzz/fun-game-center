"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { data } = useSession();

  return (
    <header className="flex justify-between items-center p-4 border-b bg-zinc-900 text-white">
      <div className="text-xl font-bold">🐟 Fish Game Center</div>

      <div className="flex items-center gap-4">
        <div className="bg-green-600 px-3 py-1 rounded-full">
          🐟 {data?.user?.fish_cash ?? 0}
        </div>

        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data?.user?.name}`}
          />
        </Avatar>

        <button onClick={() => signOut()}>Logout</button>
      </div>
    </header>
  );
}
