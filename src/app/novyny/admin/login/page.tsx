"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getClientAuth } from "@/lib/firebase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getClientAuth(), email.trim(), password);
      router.replace("/novyny/admin/news");
    } catch {
      setError("Невірний email або пароль.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-xl font-bold text-tera-navy">Вхід для адміністратора</h1>
        <p className="mt-1 text-sm text-slate-600">МАОМС «ТеРА» — керування новинами</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Пароль</span>
            <input
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-tera-navy py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Вхід…" : "Увійти"}
          </button>
        </form>

        <Link href="/novyny" className="mt-6 block text-center text-sm text-tera-blue hover:underline">
          ← На сайт
        </Link>
      </div>
    </div>
  );
}
