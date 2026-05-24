// import MatchCard from "@/components/game/MatchCard";
// import { getWallet } from "@/features/wallet/service";
// import { joinWorldCup } from "@/features/worldcup/service";
// import { authConfig } from "@/lib/auth";
// import { supabaseServer } from "@/lib/supabase-server";
// import { getServerSession } from "next-auth/next";
// import { Trophy, Calendar, Users } from "lucide-react";

// export default async function WorldCupPage() {
//   const session = await getServerSession(authConfig);

//   let wallet = await getWallet(session?.user?.id || "", "worldcup");

//   if (!wallet) {
//     wallet = await joinWorldCup(session?.user?.id || "");
//   }

//   const { data: matches } = await supabaseServer
//     .from("matches")
//     .select("*")
//     .order("match_time", { ascending: true });

//   const { data: bets } = await supabaseServer
//     .from("bets")
//     .select("*")
//     .eq("user_id", session?.user?.id);

//   const betMap: Record<string, any> = {};
//   for (const bet of bets ?? []) {
//     betMap[bet.match_id] = bet;
//   }

//   const upcomingMatches =
//     matches?.filter((m) => new Date(m.match_time) > new Date()) || [];
//   const finishedMatches =
//     matches?.filter((m) => new Date(m.match_time) <= new Date()) || [];

//   return (
//     <>
//       <div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-950 to-black py-12">
//         <div className="max-w-6xl mx-auto px-8">
//           <div className="flex flex-col items-center text-center mb-10">
//             <div className="inline-flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-5 py-2 rounded-full mb-4">
//               <Trophy className="w-5 h-5" />
//               <span className="font-bold text-sm tracking-widest">
//                 WORLD CUP 2026
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-3">
//               Predict. Bet. Win.
//             </h1>
//             <p className="text-zinc-400 text-lg max-w-md">
//               Place your bets with{" "}
//               <span className="text-yellow-400">🐟 Fish Cash</span> and climb
//               the global leaderboard
//             </p>
//           </div>

//           {/* Wallet Card */}
//           <div className="max-w-md mx-auto bg-zinc-900 border border-yellow-400/20 rounded-3xl p-6 text-center">
//             <div className="flex justify-center mb-3">
//               <div className="bg-yellow-400/10 p-4 rounded-2xl">
//                 <Trophy className="w-10 h-10 text-yellow-400" />
//               </div>
//             </div>
//             <p className="text-sm text-zinc-400 uppercase tracking-widest">
//               Your Balance
//             </p>
//             <p className="text-5xl font-black text-yellow-400 mt-2">
//               {wallet?.balance ?? 0} <span className="text-3xl">🐟</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-8 pt-10">
//         {/* Stats Bar */}
//         <div className="grid grid-cols-3 gap-4 mb-12">
//           <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
//             <Calendar className="w-8 h-8 text-emerald-400" />
//             <div>
//               <p className="text-sm text-zinc-400">Upcoming Matches</p>
//               <p className="text-3xl font-bold">{upcomingMatches.length}</p>
//             </div>
//           </div>
//           <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
//             <Users className="w-8 h-8 text-violet-400" />
//             <div>
//               <p className="text-sm text-zinc-400">Your Bets</p>
//               <p className="text-3xl font-bold">{bets?.length ?? 0}</p>
//             </div>
//           </div>
//           <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
//             <Trophy className="w-8 h-8 text-amber-400" />
//             <div>
//               <p className="text-sm text-zinc-400">Total Matches</p>
//               <p className="text-3xl font-bold">{matches?.length ?? 0}</p>
//             </div>
//           </div>
//         </div>

//         {/* Upcoming Matches */}
//         {upcomingMatches.length > 0 && (
//           <section className="mb-16">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
//               <h2 className="text-2xl font-bold flex items-center gap-2">
//                 🔥 Live Betting
//               </h2>
//               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {upcomingMatches.map((match) => (
//                 <MatchCard
//                   key={match.id}
//                   match={match}
//                   bet={betMap[match.id]}
//                   role={session?.user?.role}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Finished Matches */}
//         {finishedMatches.length > 0 && (
//           <section>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
//               <h2 className="text-2xl font-bold text-zinc-400">
//                 Completed Matches
//               </h2>
//               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90">
//               {finishedMatches.map((match) => (
//                 <MatchCard
//                   key={match.id}
//                   match={match}
//                   bet={betMap[match.id]}
//                   role={session?.user?.role}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {matches?.length === 0 && (
//           <div className="text-center py-20 text-zinc-500">
//             No matches available yet. Come back soon!
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import MatchCard from "@/components/game/MatchCard";
import { getWallet } from "@/features/wallet/service";
import { joinWorldCup } from "@/features/worldcup/service";
import { authConfig } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { getServerSession } from "next-auth/next";
import { Trophy, Calendar, Users } from "lucide-react";
import WorldCupClient from "./WorldCupClient"; // We'll create this

export default async function WorldCupPage() {
  const session = await getServerSession(authConfig);

  let wallet = await getWallet(session?.user?.id || "", "worldcup");

  if (!wallet) {
    wallet = await joinWorldCup(session?.user?.id || "");
  }

  const { data: matches } = await supabaseServer
    .from("matches")
    .select("*")
    .order("match_time", { ascending: true });

  const { data: bets } = await supabaseServer
    .from("bets")
    .select("*")
    .eq("user_id", session?.user?.id);

  const betMap: Record<string, any> = {};
  for (const bet of bets ?? []) {
    betMap[bet.match_id] = bet;
  }

  const upcomingMatches =
    matches?.filter((m) => new Date(m.match_time) > new Date()) || [];
  const finishedMatches =
    matches?.filter((m) => new Date(m.match_time) <= new Date()) || [];

  return (
    <WorldCupClient
      wallet={wallet}
      upcomingMatches={upcomingMatches}
      finishedMatches={finishedMatches}
      betMap={betMap}
      role={session?.user?.role}
      totalMatches={matches?.length ?? 0}
      totalBets={bets?.length ?? 0}
    />
  );
}
