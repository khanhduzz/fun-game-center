"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Header() {
  const { data } = useSession();
  const { data: session } = useSession();
  const { data: wallet } = useSWR("/api/wallets", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  return (
    <header className="flex justify-between items-center p-4 border-b bg-zinc-900 text-white">
      <div className="text-xl font-bold">🐟 Fish Game Center</div>

      <div className="flex items-center gap-4">
        <div className="bg-green-600 px-3 py-1 rounded-full">
          🐟 {wallet?.main ?? 0}
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
