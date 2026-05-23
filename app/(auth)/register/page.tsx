"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Account created 🎉");
      router.push("/login");
    } else {
      const err = await res.json();
      alert(err.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-900 p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">🐟 Create Account</h1>

        <input
          {...register("name")}
          placeholder="Name"
          className="w-full p-2 rounded bg-zinc-800"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 rounded bg-zinc-800"
        />

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 rounded bg-zinc-800"
        />

        <button className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="text-center text-sm">
          Already have account?{" "}
          <a href="/login" className="text-green-400">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
