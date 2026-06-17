import Link from "next/link";
import { getContent } from "@/content";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { OpenableImage } from "@/components/ui/image-lightbox/OpenableImage";
import { ContentStatusBadge } from "@/components/ui/ContentStatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { PageContent } from "@/content/types";
import { MembersPage } from "@/components/pages/MembersPage";
import { ContestsGrantsPage } from "@/components/pages/ContestsGrantsPage";
import { BestPracticesPage } from "@/components/pages/BestPracticesPage";
import { RiverPage } from "@/components/pages/RiverPage";
import { ContactsPage } from "@/components/pages/ContactsPage";
import { StatutoryBodiesPage } from "@/components/pages/StatutoryBodiesPage";
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
  const { nav, ui } = getContent(locale);
  const aboutLinks = [
    {
      href: localePath(locale, "/pro-nas/chleny"),
      label: nav.aboutMembers,
    },
    {
      href: localePath(locale, "/pro-nas/statutni-organy"),
      label: nav.aboutStatutory,
    },
  ];

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWaveStack tops={[0, 520, 1180, 1880]} start="left" />

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

          <OpenableImage
            groupId="maoms-tera"
            index={0}
            src={IMAGES.heroV3}
            alt={ui.communitiesMapAlt}
            wrapperClassName="relative min-h-[300px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md"
            imageClassName="object-cover object-[center_10%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tera-navy/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/90 p-4 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wide text-tera-blue">
                {ui.tereblyaValley}
              </p>
              <p className="mt-1 text-lg font-bold text-tera-navy">
                {ui.cooperationTagline}
              </p>
            </div>
          </OpenableImage>
        </section>

        <section className="relative z-10 mt-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-6">
            <OpenableImage
              groupId="maoms-tera"
              index={1}
              src={IMAGES.river}
              alt={ui.riverAlt}
              wrapperClassName="relative min-h-[260px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md"
              imageClassName="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
              <h2 className="border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy">
                {ui.operatingPrinciples}
              </h2>
              <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                {ui.principles.map((item) => (
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
              {ui.aboutAssociation}
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
              {ui.mainGoals}
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
                {ui.goToSection} →
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

  if (pageKey === "chleny") {
    return <MembersPage locale={locale} page={page} />;
  }

  if (pageKey === "statutni-organy") {
    return <StatutoryBodiesPage locale={locale} page={page} />;
  }

  if (pageKey === "kontakty") {
    return <ContactsPage locale={locale} page={page} />;
  }

  if (pageKey === "richka-tereblya") {
    return <RiverPage locale={locale} />;
  }

  if (pageKey === "krashi-praktyky") {
    return <BestPracticesPage locale={locale} />;
  }

  if (pageKey === "konkursy-ta-granty") {
    return <ContestsGrantsPage locale={locale} />;
  }

  return (
    <>
      <PageHeader title={page.title} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <AccentWaveStack tops={[0, 112, 720]} start="left" />

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
