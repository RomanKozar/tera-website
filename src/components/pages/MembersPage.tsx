import Link from "next/link";
import { getContent } from "@/content";
import { getMembers, zakarpattyaMapUrl } from "@/content/members";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { OpenableImage } from "@/components/ui/image-lightbox/OpenableImage";
import { PageHeader } from "@/components/ui/PageHeader";
import type { PageContent } from "@/content/types";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";

export function MembersPage({
  locale,
  page,
}: {
  locale: Locale;
  page: PageContent;
}) {
  const members = getMembers(locale);
  const { nav, ui } = getContent(locale);
  const labels = {
    area: ui.area,
    population: ui.population,
    head: ui.head,
    website: ui.communityWebsite,
    mapSource: ui.mapSource,
    established: ui.established,
    otherAbout: ui.otherAboutSections,
    maoms: nav.aboutMaoms,
    statutory: nav.aboutStatutory,
    goTo: ui.goToSection,
  };

  const aboutLinks = [
    { href: localePath(locale, "/pro-nas/maoms-tera"), label: labels.maoms },
    {
      href: localePath(locale, "/pro-nas/statutni-organy"),
      label: labels.statutory,
    },
  ];

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWaveStack tops={[0, 680, 1480, 2280, 3080]} start="left" />

          {page.lead && (
            <section className="relative z-10 rounded-2xl border border-tera-border/70 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md sm:p-8">
              <p className="text-xl font-bold leading-relaxed text-tera-navy sm:text-2xl">
                {page.lead}
              </p>
              {page.body.length > 0 && (
                <div className="prose-tera mt-5 max-w-4xl text-base leading-relaxed text-foreground/90">
                  {page.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              )}
              <p className="mt-6 text-sm text-slate-600">
                <a
                  href={zakarpattyaMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-tera-blue underline-offset-2 hover:underline"
                >
                  {labels.mapSource}
                </a>
              </p>
            </section>
          )}

          <div className="relative z-10 mt-12 space-y-16">
            {members.map((member, index) => {
              const reversed = index % 2 === 1;
              return (
                <section
                  key={member.id}
                  id={member.id}
                  className="scroll-mt-28"
                  aria-labelledby={`member-${member.id}`}
                >
                  <h2
                    id={`member-${member.id}`}
                    className="section-heading text-2xl sm:text-3xl"
                  >
                    {member.name}
                  </h2>

                  <div
                    className={`mt-8 grid gap-8 lg:grid-cols-2 lg:items-start ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className="flex w-full flex-col items-center gap-4 self-start">
                      <OpenableImage
                        groupId="members"
                        index={index}
                        src={member.image}
                        alt={member.imageAlt}
                        wrapperClassName="relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md"
                        imageClassName="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tera-navy/40 via-transparent to-transparent" />
                      </OpenableImage>
                    </div>

                    <div className="space-y-6">
                      <dl className="grid gap-3 sm:grid-cols-2">
                        {member.established && (
                          <div className="rounded-xl border border-tera-border/70 bg-tera-nav-bg/40 p-4">
                            <dt className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                              {labels.established}
                            </dt>
                            <dd className="mt-1 text-sm font-bold text-tera-navy">
                              {member.established}
                            </dd>
                          </div>
                        )}
                        <div className="rounded-xl border border-tera-border/70 bg-tera-nav-bg/40 p-4">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                            {labels.area}
                          </dt>
                          <dd className="mt-1 text-sm font-bold text-tera-navy">
                            {member.area}
                          </dd>
                        </div>
                        <div className="rounded-xl border border-tera-border/70 bg-tera-nav-bg/40 p-4">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                            {labels.population}
                          </dt>
                          <dd className="mt-1 text-sm font-bold text-tera-navy">
                            {member.population}
                          </dd>
                        </div>
                        <div className="rounded-xl border border-tera-border/70 bg-white p-4 shadow-sm sm:col-span-2">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                            {labels.head}
                          </dt>
                          <dd className="mt-1 text-sm font-bold text-tera-navy">
                            {member.head}
                          </dd>
                        </div>
                      </dl>

                      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
                        <div className="prose-tera text-base leading-relaxed text-foreground/90">
                          {member.paragraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                          ))}
                        </div>
                        <p className="mt-5 border-t border-tera-border/60 pt-4 text-sm">
                          <span className="font-semibold text-tera-navy">
                            {labels.website}:{" "}
                          </span>
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-tera-blue underline-offset-2 hover:underline"
                          >
                            {member.website.replace(/^https?:\/\//, "")}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <nav
            className="relative z-10 mt-14 grid gap-4 sm:grid-cols-2"
            aria-label={labels.otherAbout}
          >
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
                  {labels.goTo} →
                </span>
              </Link>
            ))}
          </nav>
        </article>
      </section>
    </>
  );
}
