"use client";

import { useState, useEffect } from "react"; // 1. Added useState & useEffect
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Gamepad2,
  User,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"; // Added icons for toast

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const router = useRouter();

  // 2. Added your custom toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // 3. Added your auto-hide timer effect
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      // 4. Trigger success state
      setToast({ message: "Account created successfully 🎉", type: "success" });

      // Delay navigation slightly so they can actually see your beautiful toast
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      const err = await res.json();
      // 5. Trigger error state
      setToast({ message: err.error || "Registration failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* 6. Custom Floating Toast UI */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400 shadow-emerald-950/50"
              : toast.type === "error"
                ? "bg-red-950/90 border-red-500/30 text-red-400 shadow-red-950/50"
                : "bg-zinc-900/90 border-zinc-700 text-zinc-300 shadow-black/50"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="font-medium text-sm tracking-wide">
            {toast.message}
          </span>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-violet-600 p-5 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.4)]">
            <Gamepad2 className="w-14 h-14 text-black" />
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-700 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-4xl font-black text-white text-center mb-2 tracking-tighter">
            Join the Arena
          </h1>
          <p className="text-zinc-400 text-center mb-8 text-lg">
            Create your{" "}
            <span className="text-yellow-400 font-bold">ARCADE</span> account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-3.5 text-zinc-500">
                <User className="w-5 h-5" />
              </div>
              <input
                {...register("name")}
                placeholder="Full Name"
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-yellow-400 pl-12 py-3.5 rounded-2xl text-white placeholder-zinc-500 focus:outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute left-4 top-3.5 text-zinc-500">
                <Mail className="w-5 h-5" />
              </div>
              <input
                {...register("email")}
                placeholder="Email Address"
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-yellow-400 pl-12 py-3.5 rounded-2xl text-white placeholder-zinc-500 focus:outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute left-4 top-3.5 text-zinc-500">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="Create Password"
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-yellow-400 pl-12 py-3.5 rounded-2xl text-white placeholder-zinc-500 focus:outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-lg transition-all disabled:opacity-70 mt-2"
            >
              {isSubmitting ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-400 mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-yellow-400 hover:underline font-medium"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
