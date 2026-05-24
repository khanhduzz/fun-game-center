"use client";

interface LoadingWaveProps {
  message?: string;
  minHeight?: string;
}

export default function LoadingWave({
  message = "Synchronizing Data",
  minHeight = "min-h-[80vh]",
}: LoadingWaveProps) {
  return (
    <div
      className={`${minHeight} flex flex-col items-center justify-center bg-black`}
    >
      {/* Modern Audio/Equalizer Pulse Bar Wave */}
      <div className="flex items-end justify-center gap-1.5 h-12 w-auto mb-6">
        <div className="w-2 bg-yellow-400 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_100ms] h-6" />
        <div className="w-2 bg-yellow-400/90 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_300ms] h-10" />
        <div className="w-2 bg-yellow-400/80 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_500ms] h-12" />
        <div className="w-2 bg-yellow-400/90 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_700ms] h-8" />
        <div className="w-2 bg-yellow-400 rounded-full animate-[pulse_1.2s_infinite_ease-in-out_900ms] h-5" />
      </div>

      {/* Text with subtle modern tracking fade */}
      <p className="text-yellow-400/90 text-sm font-black uppercase tracking-[0.25em] animate-pulse">
        {message}
      </p>
    </div>
  );
}
