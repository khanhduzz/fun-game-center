"use client";

interface LoadingWaveProps {
  message?: string;
  minHeight?: string;
  variant?: "default" | "worldcup";
}

export default function LoadingWave({
  message = "Synchronizing Data",
  minHeight = "min-h-[80vh]",
  variant = "default",
}: LoadingWaveProps) {
  const isWorldCup = variant === "worldcup";

  return (
    <div
      className={`${minHeight} flex flex-col items-center justify-center relative overflow-hidden ${
        isWorldCup
          ? "bg-gradient-to-b from-sky-300 via-white to-emerald-50 text-slate-800"
          : "bg-black text-yellow-400"
      }`}
    >
      {/* 🌤️ World Cup Background Effects */}
      {isWorldCup && (
        <>
          {/* soft glow */}
          <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-emerald-400/20 to-transparent blur-[100px]" />
          <div className="absolute -right-10 top-20 w-[200px] h-[200px] bg-yellow-300/30 rounded-full blur-[80px]" />
          <div className="absolute -left-10 top-40 w-[200px] h-[200px] bg-emerald-300/30 rounded-full blur-[80px]" />

          {/* subtle pitch grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(0deg, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </>
      )}

      {/* 🎧 Equalizer Wave */}
      <div className="relative z-10 flex items-end justify-center gap-1.5 h-12 mb-6">
        <div
          className={`w-2 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_100ms] h-6 ${
            isWorldCup ? "bg-emerald-500" : "bg-yellow-400"
          }`}
        />
        <div
          className={`w-2 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_300ms] h-10 ${
            isWorldCup ? "bg-emerald-400" : "bg-yellow-400/90"
          }`}
        />
        <div
          className={`w-2 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_500ms] h-12 ${
            isWorldCup ? "bg-yellow-400" : "bg-yellow-400/80"
          }`}
        />
        <div
          className={`w-2 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_700ms] h-8 ${
            isWorldCup ? "bg-emerald-400" : "bg-yellow-400/90"
          }`}
        />
        <div
          className={`w-2 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_900ms] h-5 ${
            isWorldCup ? "bg-emerald-500" : "bg-yellow-400"
          }`}
        />
      </div>

      {/* ⚽ Message */}
      <p
        className={`relative z-10 text-sm font-black uppercase tracking-[0.25em] animate-pulse ${
          isWorldCup ? "text-emerald-700" : "text-yellow-400/90"
        }`}
      >
        {isWorldCup ? "Preparing Stadium..." : message}
      </p>
    </div>
  );
}
