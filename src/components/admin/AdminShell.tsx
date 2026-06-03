"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getClientAuth } from "@/lib/firebase/client";

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getClientAuth());
    router.replace("/novyny/admin/login");
  }

  return (
    <div className="min-h-dvh bg-slate-100">
      <header className="border-b border-slate-200 bg-tera-navy text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
              Адмін-панель
            </p>
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/novyny/admin/news"
              className="cursor-pointer hover:text-tera-gold"
            >
              Новини
            </Link>
            <Link href="/novyny" className="cursor-pointer hover:text-tera-gold">
              Сайт
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-white/30 px-3 py-1.5 hover:bg-white/10"
            >
              Вийти
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
