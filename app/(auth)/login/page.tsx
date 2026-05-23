"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-900 p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          🐟 Login to Fish Game Center
        </h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 rounded bg-zinc-800"
        />
        {errors.email && <p className="text-red-500">Invalid email</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 rounded bg-zinc-800"
        />
        {errors.password && <p className="text-red-500">Min 6 characters</p>}

        <button className="w-full bg-green-600 p-2 rounded hover:bg-green-700">
          Login
        </button>

        <p className="text-center text-sm">
          No account?{" "}
          <a href="/register" className="text-blue-400">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
