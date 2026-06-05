"use client";

import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { getClientAuth } from "@/lib/firebase/client";
import {
  deleteNewsAdmin,
  getNewsByIdAdmin,
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

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

  async function handleDelete(item: FirebaseNewsDoc) {
    const date = item.publishedAt.slice(0, 10);
    if (
      !confirm(
        `Видалити цю новину?\n\n«${item.title}»\n${date} · /novyny/${item.slug}`,
      )
    ) {
      return;
    }

    setDeletingId(item.id);
    setError("");
    try {
      const doc = await getNewsByIdAdmin(item.id);
      if (!doc) {
        setError("Новину вже видалено. Оновіть список.");
        await load();
        return;
      }
      if (doc.title !== item.title || doc.slug !== item.slug) {
        setError(
          "Список застарів. Оновіть сторінку й спробуйте ще раз.",
        );
        await load();
        return;
      }

      await deleteNewsAdmin(item.id);
      await revalidatePublicSite();
      await load();
    } catch {
      setError("Не вдалося видалити новину. Спробуйте ще раз.");
    } finally {
      setDeletingId(null);
    }
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
              Натисніть «+ Нова новина», щоб додати першу публікацію.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className={`rounded-xl border px-4 py-4 shadow-sm ${
                  item.status === "draft"
                    ? "border-amber-300 bg-amber-50/80"
                    : "border-transparent bg-white"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
                  <div className="flex shrink-0 gap-2 self-end sm:self-center">
                    <Link
                      href={`/novyny/admin/news/${item.id}/edit`}
                      className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                      Редагувати
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      disabled={deletingId !== null}
                      className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      {deletingId === item.id ? "Видалення…" : "Видалити"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminShell>
    </AdminAuthGuard>
  );
}
