import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import { AccentWave } from "@/components/ui/AccentWave";
import { ContentStatusBadge } from "@/components/ui/ContentStatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { PageContent } from "@/content/types";
import { IMAGES } from "@/lib/images";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";

function MaomsTeraPage({
  locale,
  page,
  statusLabel,
}: {
  locale: Locale;
  page: PageContent;
  statusLabel: string;
}) {
  const aboutLinks = [
    {
      href: localePath(locale, "/pro-nas/chleny"),
      label: locale === "uk" ? "Члени асоціації" : "Association members",
    },
    {
      href: localePath(locale, "/pro-nas/statutni-organy"),
      label: locale === "uk" ? "Статутні органи" : "Statutory bodies",
    },
  ];

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWave className="-left-32 top-0 -scale-x-100" />
          <AccentWave className="-right-40 top-[520px]" />
          <AccentWave className="-left-36 top-[1180px] -scale-x-100" />

        <section className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-tera-border/70 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md sm:p-8">
            <ContentStatusBadge status={page.status} label={statusLabel} />
            {page.lead && (
              <p className="mt-4 text-2xl font-bold leading-snug text-tera-navy sm:text-3xl">
                {page.lead}
              </p>
            )}
            {page.highlights?.length ? (
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                {page.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/80 bg-white/85 p-4 shadow-sm"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-lg font-bold text-tera-navy">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md">
            <Image
              src={IMAGES.heroV3}
              alt={locale === "uk" ? "Карта громад ТеРА" : "TeRA communities map"}
              fill
              className="object-cover object-[center_10%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tera-navy/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/90 p-4 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wide text-tera-blue">
                {locale === "uk" ? "Тереблянська долина" : "Tereblya Valley"}
              </p>
              <p className="mt-1 text-lg font-bold text-tera-navy">
                {locale === "uk"
                  ? "Співпраця громад для сталого розвитку"
                  : "Community cooperation for sustainable development"}
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mt-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-6">
            <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md">
              <Image
                src={IMAGES.river}
                alt={locale === "uk" ? "Річка Теребля" : "Tereblya River"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
              <h2 className="border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy">
                {locale === "uk" ? "Принципи діяльності" : "Operating principles"}
              </h2>
              <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                {[
                  locale === "uk" ? "законність" : "legality",
                  locale === "uk" ? "добровільність" : "voluntary participation",
                  locale === "uk" ? "рівноправність членів" : "equality of members",
                  locale === "uk" ? "відкритість і публічність" : "openness and transparency",
                  locale === "uk" ? "демократичність" : "democratic governance",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-tera-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8">
            <h2 className="border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy">
              {locale === "uk" ? "Про асоціацію" : "About the association"}
            </h2>
            <div className="prose-tera mt-6 text-base leading-relaxed text-foreground/90">
              {page.body.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        </section>

        {page.goals?.length ? (
          <section className="relative z-10 mt-10 rounded-2xl border border-tera-border/70 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md sm:p-8">
            <h2 className="border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy">
              {locale === "uk" ? "Основна мета Асоціації" : "Main goals"}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {page.goals.map((goal, index) => (
                <li
                  key={goal.slice(0, 48)}
                  className="list-none rounded-xl border border-white/80 bg-white/90 p-4 shadow-sm"
                >
                  <span className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tera-gold text-sm font-bold text-tera-navy">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">
                      {goal}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2" aria-label="About pages">
          {aboutLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-tera-gold hover:shadow-md"
            >
              <span className="text-lg font-bold text-tera-navy group-hover:text-tera-blue">
                {link.label}
              </span>
              <span className="mt-2 block text-sm font-medium text-tera-blue">
                {locale === "uk" ? "Перейти до розділу" : "Open section"} →
              </span>
            </Link>
          ))}
        </nav>
        </article>
      </section>
    </>
  );
}

export function ContentPage({
  locale,
  pageKey,
}: {
  locale: Locale;
  pageKey: string;
}) {
  const { pages, statusLabels } = getContent(locale);
  const page = pages[pageKey];

  if (!page) {
    return null;
  }

  if (pageKey === "maoms-tera" && page.goals?.length) {
    return (
      <MaomsTeraPage
        locale={locale}
        page={page}
        statusLabel={statusLabels[page.status]}
      />
    );
  }

  return (
    <>
      <PageHeader title={page.title} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <AccentWave className="-left-32 top-0 -scale-x-100" />
          <AccentWave className="-right-40 top-28" />

          <div className="relative z-10">
            <ContentStatusBadge
              status={page.status}
              label={statusLabels[page.status]}
            />
            <section className="prose-tera mt-6 max-w-4xl rounded-2xl border border-slate-100 bg-white p-6 text-base leading-relaxed text-foreground/90 shadow-md sm:p-8">
              {page.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </section>
          </div>
        </article>
      </section>
    </>
  );
}
