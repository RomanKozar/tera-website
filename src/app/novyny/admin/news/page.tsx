"use client";

import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { getClientAuth } from "@/lib/firebase/client";
import {
  getLocalNewsCount,
  importLocalNewsToFirestore,
} from "@/lib/firebase/import-local-news";
import {
  deleteNewsAdmin,
  listAllNewsAdminWithTimeout,
} from "@/lib/firebase/news-admin";
import type { FirebaseNewsDoc, FirebaseNewsStatus } from "@/lib/firebase/news-types";
import { revalidatePublicSite } from "@/lib/revalidate-public";

function NewsStatusBadge({ status }: { status: FirebaseNewsStatus }) {
  if (status === "published") {
    return (
      <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
        Опубліковано
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
      Чернетка
    </span>
  );
}

export default function AdminNewsListPage() {
  const [items, setItems] = useState<FirebaseNewsDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");
  const localCount = getLocalNewsCount();

  async function load() {
    setLoading(true);
    setError("");
    try {
      setItems(await listAllNewsAdminWithTimeout());
    } catch (err) {
      const message =
        err instanceof Error && err.message === "timeout"
          ? "Firestore не відповідає. Перевірте інтернет і Rules у Firebase."
          : "Не вдалося завантажити новини. Перевірте Firestore Rules.";
      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const auth = getClientAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        load();
      }
    });
    return () => unsub();
  }, []);

  async function handleImport() {
    setImporting(true);
    setError("");
    try {
      const count = await importLocalNewsToFirestore();
      if (count === 0) {
        setError("Усі новини з сайту вже є в базі.");
      }
      await load();
    } catch {
      setError("Не вдалося імпортувати. Перевірте, що ви увійшли і Rules опубліковані.");
    } finally {
      setImporting(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Видалити «${title}»?`)) {
      return;
    }
    await deleteNewsAdmin(id);
    await revalidatePublicSite();
    await load();
  }

  return (
    <AdminAuthGuard>
      <AdminShell title="Новини">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Опубліковані новини з’являються на{" "}
            <Link
              href="/novyny"
              className="cursor-pointer text-tera-blue hover:underline"
            >
              /novyny
            </Link>
          </p>
          <div className="flex flex-wrap gap-2">
            {items.length < localCount ? (
              <button
                type="button"
                onClick={handleImport}
                disabled={importing || loading}
                className="cursor-pointer rounded-lg border border-tera-navy px-4 py-2 text-sm font-semibold text-tera-navy hover:bg-tera-navy/5 disabled:opacity-60"
              >
                {importing
                  ? "Імпорт…"
                  : `Імпортувати ${localCount} новини з сайту`}
              </button>
            ) : null}
            <Link
              href="/novyny/admin/news/new"
              className="cursor-pointer rounded-lg bg-tera-gold px-4 py-2 text-sm font-semibold text-tera-navy hover:opacity-90"
            >
              + Нова новина
            </Link>
          </div>
        </div>

        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="text-sm text-slate-500">Завантаження…</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-sm text-slate-600 shadow-sm">
            <p>У Firebase ще немає новин.</p>
            <p className="mt-2">
              На сайті зараз показуються {localCount} новини з файлу проєкту.
              Натисніть «Імпортувати», щоб керувати ними тут.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-4 shadow-sm ${
                  item.status === "draft"
                    ? "border-amber-300 bg-amber-50/80"
                    : "border-transparent bg-white"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-tera-navy">{item.title}</p>
                    <NewsStatusBadge status={item.status} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    /novyny/{item.slug} · {item.publishedAt.slice(0, 10)}
                  </p>
                  {item.status === "draft" ? (
                    <p className="mt-1 text-xs font-medium text-amber-800">
                      Не видно на сайті — змініть статус на «Опубліковано».
                    </p>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/novyny/admin/news/${item.id}/edit`}
                    className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
                  >
                    Редагувати
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                  >
                    Видалити
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminShell>
    </AdminAuthGuard>
  );
}
