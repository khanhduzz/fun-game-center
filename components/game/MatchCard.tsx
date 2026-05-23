"use client";

import { useEffect, useState } from "react";

export default function MatchCard({ match, bet, role }: any) {
  const [stake, setStake] = useState(bet?.stake || 10);
  const [loading, setLoading] = useState(false);

  const isLocked = new Date(match.match_time) < new Date();

  useEffect(() => {
    if (bet) {
      setStake(bet.stake);
    }
  }, [bet]);

  const placeBet = async (prediction: string) => {
    // 🚨 prevent duplicate action
    if (bet && bet.prediction === prediction && bet.stake === stake) {
      return; // do nothing
    }

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

    if (!res.ok) {
      alert(data.error);
    } else {
      alert(bet ? "Bet updated 🔄" : "Bet placed 🐟🔥");
      window.location.reload();
    }
  };

  const cancelBet = async () => {
    setLoading(true);

    const res = await fetch("/api/bets/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matchId: match.id }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error);
    } else {
      alert("Bet cancelled ❌");
      window.location.reload();
    }
  };

  const settleMatch = async (matchId: string, result: string) => {
    setLoading(true);

    const res = await fetch("/api/matches/settle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matchId,
        result,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error);
    } else {
      alert("Match settled");
      window.location.reload();
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 hover:border-zinc-600 transition">
      {/* Match Info */}
      <div className="flex justify-between mb-2">
        <div className="font-semibold">
          {match.home_team} 🇭🇴 vs {match.away_team} 🇦🇼
        </div>
        <div className="text-sm text-gray-400">
          {new Date(match.match_time).toLocaleString()}
        </div>
      </div>

      {/* ✅ SHOW CURRENT BET */}
      {bet && (
        <div className="mt-2 p-2 rounded bg-zinc-800 border border-zinc-700 text-sm flex justify-between items-center">
          <div>
            🎯 <b>{bet.prediction}</b> | 🐟 {bet.stake}
          </div>
          <span className="text-green-400 text-xs">YOUR BET</span>
        </div>
      )}

      {/* Stake Input */}
      <div className="flex gap-2 items-center mt-3">
        <input
          aria-label="Stake amount"
          type="number"
          value={stake}
          min={10}
          disabled={isLocked}
          onChange={(e) => setStake(Number(e.target.value))}
          className="w-20 p-1 rounded bg-zinc-800 border border-zinc-700"
        />

        {/* HOME */}
        <button
          onClick={() => placeBet("HOME")}
          disabled={
            loading ||
            isLocked ||
            (bet?.prediction === "HOME" && bet?.stake === stake)
          }
          className={`px-3 py-1 rounded transition ${
            bet?.prediction === "HOME"
              ? "bg-green-800 border border-green-400 opacity-50 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          Home
        </button>

        {/* DRAW */}
        <button
          onClick={() => placeBet("DRAW")}
          disabled={
            loading ||
            isLocked ||
            (bet?.prediction === "DRAW" && bet?.stake === stake)
          }
          className={`px-3 py-1 rounded transition ${
            bet?.prediction === "DRAW"
              ? "bg-yellow-800 border border-yellow-400 opacity-50 cursor-not-allowed"
              : "bg-yellow-600 hover:bg-yellow-500"
          }`}
        >
          Draw
        </button>

        {/* AWAY */}
        <button
          onClick={() => placeBet("AWAY")}
          disabled={
            loading ||
            isLocked ||
            (bet?.prediction === "AWAY" && bet?.stake === stake)
          }
          className={`px-3 py-1 rounded transition ${
            bet?.prediction === "AWAY"
              ? "bg-blue-800 border border-blue-400 opacity-50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          Away
        </button>

        {/* CANCEL BUTTON */}
        {bet && !isLocked && (
          <button
            onClick={cancelBet}
            disabled={loading}
            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {/* 🔐 ADMIN CONTROLS */}
      {role === "admin" && !match.result && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => settleMatch(match.id, "HOME")}
            disabled={loading}
            className="bg-green-700 hover:bg-green-600 px-2 py-1 rounded text-xs"
          >
            Set HOME Win
          </button>

          <button
            onClick={() => settleMatch(match.id, "DRAW")}
            disabled={loading}
            className="bg-yellow-700 hover:bg-yellow-600 px-2 py-1 rounded text-xs"
          >
            Set DRAW
          </button>

          <button
            onClick={() => settleMatch(match.id, "AWAY")}
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded text-xs"
          >
            Set AWAY Win
          </button>
        </div>
      )}

      {/* RESULT */}
      {bet?.result && (
        <div className="text-xs text-blue-400 mt-2">Result: {bet.result}</div>
      )}
    </div>
  );
}
