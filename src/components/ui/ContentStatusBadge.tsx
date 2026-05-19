import type { ContentStatus } from "@/content/types";

export function ContentStatusBadge({
  status,
  label,
}: {
  status: ContentStatus;
  label: string;
}) {
  if (status === "ready" || !label) return null;

  const styles: Record<ContentStatus, string> = {
    ready: "",
    draft: "bg-tera-gold/20 text-amber-900",
    empty: "border border-tera-border bg-white text-stone-600",
    planned: "bg-tera-blue-light/20 text-tera-blue-dark",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {label}
    </span>
  );
}
