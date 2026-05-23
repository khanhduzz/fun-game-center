import Link from "next/link";

export default function GamesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🎮 Game Center</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* World Cup Game */}
        <Link href="/games/worldcup">
          <div className="bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800 cursor-pointer transition">
            <h2 className="text-xl font-bold mb-2">⚽ World Cup 2026</h2>
            <p className="text-gray-400">
              Predict match winners and earn 🐟 Fish Cash
            </p>
          </div>
        </Link>

        {/* Future Game */}
        <div className="bg-zinc-900 p-6 rounded-xl opacity-50">
          <h2 className="text-xl font-bold mb-2">🎲 Coming Soon</h2>
          <p className="text-gray-400">More games will be added...</p>
        </div>
      </div>
    </div>
  );
}
