"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getClientAuth } from "@/lib/firebase/client";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getClientAuth();
    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      if (!next) {
        router.replace("/novyny/admin/login");
      }
    });
    return () => unsub();
  }, [router]);

  if (user === undefined) {
    return (
      <p className="py-12 text-center text-sm text-slate-500">Завантаження…</p>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
