"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsForm } from "@/components/admin/NewsForm";
import { getNewsByIdAdmin } from "@/lib/firebase/news-admin";
import type { FirebaseNewsDoc } from "@/lib/firebase/news-types";

export default function AdminNewsEditPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<FirebaseNewsDoc | null | undefined>(undefined);

  useEffect(() => {
    getNewsByIdAdmin(params.id).then(setItem);
  }, [params.id]);

  return (
    <AdminAuthGuard>
      <AdminShell title="Редагування новини">
        {item === undefined ? (
          <p className="text-sm text-slate-500">Завантаження…</p>
        ) : item === null ? (
          <p className="text-sm text-red-600">Новину не знайдено.</p>
        ) : (
          <NewsForm initial={item} />
        )}
      </AdminShell>
    </AdminAuthGuard>
  );
}
