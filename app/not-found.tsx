import Link from "next/link";
import { Gamepad2, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-auto mt-10 bg-black text-white flex items-center justify-center font-sans">
      <div className="max-w-md text-center px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-violet-600 p-4 rounded-2xl">
            <Gamepad2 className="w-12 h-12 text-black" />
          </div>
        </div>

        <h1 className="text-7xl font-black tracking-tighter text-yellow-400 mb-2">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4">Page Under Construction</h2>

        <p className="text-zinc-400 text-lg mb-10">
          This arena is still being built by our engineers. Come back later,
          gamer!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-2xl transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Games
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-3 border border-zinc-700 hover:border-zinc-500 font-medium py-4 px-8 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        <p className="text-zinc-500 text-sm mt-12">
          ARCADE<span className="text-yellow-400">.</span> Team Hub
        </p>
      </div>
    </div>
  );
}
