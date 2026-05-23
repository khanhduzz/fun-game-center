"use client";

import { useState } from "react";

export default function MatchCard({ match }: any) {
  const [stake, setStake] = useState(10);
  const [loading, setLoading] = useState(false);

  const placeBet = async (prediction: string) => {
    setLoading(true);

    const res = await fetch("/api/bets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matchId: match.id,
        prediction,
        stake,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Bet placed 🐟🔥");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <div className="flex justify-between mb-2">
        <div>
          {match.home_team} 🇭🇴 vs {match.away_team} 🇦🇼
        </div>
        <div className="text-sm text-gray-400">
          {new Date(match.match_time).toLocaleString()}
        </div>
      </div>

      <div className="flex gap-2 items-center mt-3">
        <input
          aria-label="Stake amount"
          type="number"
          value={stake}
          min={10}
          onChange={(e) => setStake(Number(e.target.value))}
          className="w-20 p-1 rounded bg-zinc-800"
        />

        <button
          onClick={() => placeBet("HOME")}
          disabled={loading}
          className="bg-green-600 px-3 py-1 rounded"
        >
          Home
        </button>

        <button
          onClick={() => placeBet("DRAW")}
          disabled={loading}
          className="bg-yellow-600 px-3 py-1 rounded"
        >
          Draw
        </button>

        <button
          onClick={() => placeBet("AWAY")}
          disabled={loading}
          className="bg-blue-600 px-3 py-1 rounded"
        >
          Away
        </button>
      </div>
    </div>
  );
}
