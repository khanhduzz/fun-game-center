// import { supabaseServer } from "@/lib/supabase-server";

// export default async function LeaderBoard() {
//   const { data: bets } = await supabaseServer.from("bets").select(`
//       *,
//       users (
//         name
//       )
//     `);

//   const userStats: Record<
//     string,
//     { user_id: string; name: string; win: number; lose: number }
//   > = {};

//   for (const bet of bets ?? []) {
//     if (!userStats[bet.user_id]) {
//       userStats[bet.user_id] = {
//         user_id: bet.user_id,
//         name: bet.users?.name || "Unknown",
//         win: 0,
//         lose: 0,
//       };
//     }

//     if (bet.result === "WIN" || bet.is_won === true) {
//       userStats[bet.user_id].win += bet.stake;
//     } else if (bet.result === "LOSE") {
//       userStats[bet.user_id].lose += bet.stake;
//     }
//   }

//   const users = Object.values(userStats);

//   const topWinners = [...users].sort((a, b) => b.win - a.win).slice(0, 10);

//   const topLosers = [...users].sort((a, b) => b.lose - a.lose).slice(0, 10);

//   return (
//     <div className="w-full px-10 py-10 space-y-10">
//       {/* HEADER */}
//       <div className="text-center space-y-2">
//         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
//           ⚽ World Cup Leaderboard
//         </h1>
//         <p className="text-slate-600">Champions rise. Others... not so much.</p>
//       </div>

//       {/* BOARDS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* 🏆 WINNERS */}
//         <div className="relative rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-emerald-200 shadow-[0_10px_40px_rgba(16,185,129,0.15)]">
//           <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />

//           <h2 className="text-xl font-bold mb-4 text-emerald-600 flex items-center gap-2">
//             🏆 Top Winners
//           </h2>

//           <div className="space-y-3">
//             {topWinners.map((user, index) => (
//               <div
//                 key={user.user_id}
//                 className="flex justify-between items-center bg-white/70 border border-emerald-100 px-4 py-2 rounded-xl shadow-sm"
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 font-bold text-emerald-500">
//                     {index === 0
//                       ? "🥇"
//                       : index === 1
//                         ? "🥈"
//                         : index === 2
//                           ? "🥉"
//                           : `#${index + 1}`}
//                   </span>
//                   <span className="text-slate-800 font-medium">
//                     {user.name}
//                   </span>
//                 </div>

//                 <span className="text-emerald-600 font-semibold">
//                   +{user.win}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 💀 LOSERS */}
//         <div className="relative rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-rose-200 shadow-[0_10px_40px_rgba(244,63,94,0.15)]">
//           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />

//           <h2 className="text-xl font-bold mb-4 text-rose-500 flex items-center gap-2">
//             💀 Top Losers
//           </h2>

//           <div className="space-y-3">
//             {topLosers.map((user, index) => (
//               <div
//                 key={user.user_id}
//                 className="flex justify-between items-center bg-white/70 border border-rose-100 px-4 py-2 rounded-xl shadow-sm"
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 font-bold text-rose-400">
//                     #{index + 1}
//                   </span>
//                   <span className="text-slate-800 font-medium">
//                     {user.name}
//                   </span>
//                 </div>

//                 <span className="text-rose-500 font-semibold">
//                   -{user.lose}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { supabaseServer } from "@/lib/supabase-server";

export default async function LeaderBoard() {
  const { data: bets } = await supabaseServer.from("bets").select(`
      *,
      users ( name )
    `);

  const userStats: Record<
    string,
    { user_id: string; name: string; win: number; lose: number }
  > = {};

  for (const bet of bets ?? []) {
    if (!userStats[bet.user_id]) {
      userStats[bet.user_id] = {
        user_id: bet.user_id,
        name: bet.users?.name || "Unknown",
        win: 0,
        lose: 0,
      };
    }

    if (bet.result === "WIN" || bet.is_won === true) {
      userStats[bet.user_id].win += bet.stake;
    } else if (bet.result === "LOSE") {
      userStats[bet.user_id].lose += bet.stake;
    }
  }

  const users = Object.values(userStats);

  const topWinners = [...users].sort((a, b) => b.win - a.win).slice(0, 10);

  const topLosers = [...users].sort((a, b) => b.lose - a.lose).slice(0, 10);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 relative">
      {/* 🏆 HEADER (match GamesLayout tone) */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/30 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-yellow-400 text-emerald-600 px-4 py-1.5 rounded-full shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-wider">
              🏆 Leaderboard Arena
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Rankings Table
          </h2>
        </div>

        <div className="text-xs font-black uppercase tracking-wider text-slate-700 bg-white/95 border border-slate-200 px-4 py-2.5 rounded-2xl shadow-md backdrop-blur-md">
          ⚡ Live Rankings
        </div>
      </header>

      {/* 🏟️ BOARDS */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* 🏆 WINNERS CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-white border-4 border-emerald-400 shadow-xl p-6 md:p-8">
          {/* top ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-500" />

          <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            🏆 Top Winners
          </h3>

          <div className="space-y-3">
            {topWinners.map((user, index) => (
              <div
                key={user.user_id}
                className="flex justify-between items-center bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-emerald-600 w-6">
                    {index === 0
                      ? "🥇"
                      : index === 1
                        ? "🥈"
                        : index === 2
                          ? "🥉"
                          : `#${index + 1}`}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {user.name}
                  </span>
                </div>

                <span className="font-extrabold text-emerald-600">
                  +{user.win}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 💀 LOSERS CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-white border-4 border-rose-400 shadow-xl p-6 md:p-8">
          {/* top ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400" />

          <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            💀 Top Losers
          </h3>

          <div className="space-y-3">
            {topLosers.map((user, index) => (
              <div
                key={user.user_id}
                className="flex justify-between items-center bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-rose-500 w-6">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {user.name}
                  </span>
                </div>

                <span className="font-extrabold text-rose-500">
                  -{user.lose}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
