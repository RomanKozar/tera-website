export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="border-b border-tera-border bg-white px-4 py-8 sm:px-6 sm:py-10">
      <article className="mx-auto max-w-7xl">
        <h1 className="section-heading text-2xl sm:text-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-sm text-foreground/70 sm:text-base">{subtitle}</p>
        )}
      </article>
    </header>
  );
}
