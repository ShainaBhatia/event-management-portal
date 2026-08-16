"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.SubmitEvent) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    router.push("/admin/dashboard");

  } catch (error) {
    console.error("Login error:", error);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071A2B] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0F2740] p-8 shadow-xl shadow-black/20">

        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
            <Ticket size={14} />
            Admin
          </span>

          <h1 className="mt-5 text-3xl font-bold text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to manage events
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="
                w-full
                rounded-lg
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-3
                text-base
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-amber-400/50
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="
                w-full
                rounded-lg
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-3
                text-base
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-amber-400/50
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>


          {error && (
            <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-amber-400
              py-3
              font-semibold
              text-[#071A2B]
              transition
              hover:bg-amber-300
              disabled:cursor-not-allowed
              disabled:opacity-50
          "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </main>
  );
}