"use client";

import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsForm } from "@/components/admin/NewsForm";

export default function AdminNewsNewPage() {
  return (
    <AdminAuthGuard>
      <AdminShell title="Нова новина">
        <NewsForm />
      </AdminShell>
    </AdminAuthGuard>
  );
}
