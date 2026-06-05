/** Скидає кеш головної та /novyny після змін у Firebase. */
export async function revalidatePublicSite(): Promise<void> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const token = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  await fetch("/api/revalidate", { method: "POST", headers }).catch(() => undefined);
}
