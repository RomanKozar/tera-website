import Link from "next/link";
import { getContent } from "@/content";
import { getStatutoryBodies } from "@/content/statutoryBodies";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { OpenableImage } from "@/components/ui/image-lightbox/OpenableImage";
import { PageHeader } from "@/components/ui/PageHeader";
import type { PageContent } from "@/content/types";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { IMAGES as SITE_IMAGES } from "@/lib/images";

const IMAGES = {
  photo1: "/images/annual-meeting/foto-1.webp",
  photo2: "/images/annual-meeting/foto-2.webp",
  photo3: "/images/annual-meeting/foto-3.webp",
  photo4: "/images/annual-meeting/foto-4.webp",
} as const;

export function StatutoryBodiesPage({
  locale,
  page,
}: {
  locale: Locale;
  page: PageContent;
}) {
  const { nav, ui } = getContent(locale);
  const t = getStatutoryBodies(locale);

  const aboutLinks = [
    { href: localePath(locale, "/pro-nas/maoms-tera"), label: nav.aboutMaoms },
    { href: localePath(locale, "/pro-nas/chleny"), label: nav.aboutMembers },
  ];

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWaveStack tops={[0, 520, 1180, 1880, 2580]} start="left" />

          <section className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-tera-border/70 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                {t.pageTitle}
              </p>
              <p className="mt-3 text-2xl font-bold leading-snug text-tera-navy sm:text-3xl">
                {page.lead || page.title}
              </p>
              <div className="prose-tera mt-6 text-base leading-relaxed text-foreground/90">
                {page.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[IMAGES.photo1, IMAGES.photo2].map((src, idx) => (
                <OpenableImage
                  key={src}
                  groupId="statutory-meeting"
                  index={idx}
                  src={src}
                  alt={t.photoAlt(idx + 1)}
                  wrapperClassName="relative aspect-[4/3] overflow-hidden rounded-2xl border border-tera-border/60 bg-tera-nav-bg shadow-md"
                  imageClassName="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tera-navy/35 via-transparent to-transparent" />
                </OpenableImage>
              ))}
            </div>
          </section>

          <section className="relative z-10 mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8">
              <h2 className="border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy">
                {t.assembly}
              </h2>
              <div className="prose-tera mt-6 text-base leading-relaxed text-foreground/90">
                {t.assemblyParagraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-tera-border/70 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md sm:p-8">
              <h2 className="border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy">
                {t.composition}
              </h2>
              <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
                {t.compositionMembers.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-tera-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <OpenableImage
                groupId="statutory-map"
                index={0}
                src={SITE_IMAGES.heroV3}
                alt={t.communitiesMapAlt}
                wrapperClassName="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-tera-border/60 bg-white shadow-sm"
                imageClassName="object-cover object-[center_12%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tera-navy/35 via-transparent to-transparent" />
              </OpenableImage>
            </div>
          </section>

          <section className="relative z-10 mt-10 grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                  {t.chairLabel}
                </p>
                <p className="text-sm font-semibold text-tera-navy">{t.chairName}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {t.chairAndDirector}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{t.chairRule}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-start">
                <OpenableImage
                  groupId="statutory-leaders"
                  index={0}
                  src={IMAGES.photo3}
                  alt={t.chairPhotoAlt}
                  wrapperClassName="relative aspect-[4/3] overflow-hidden rounded-2xl border border-tera-border/60 bg-tera-nav-bg shadow-sm"
                  imageClassName="object-cover object-[center_20%] scale-[0.92]"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-tera-navy">
                    {t.chairBioTitle}
                  </h3>
                  <div className="prose-tera mt-4 text-sm leading-relaxed text-foreground/85">
                    {t.chairBioParagraphs.map((p) => (
                      <p key={p.slice(0, 48)}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                  {t.directorLabel}
                </p>
                <p className="text-sm font-semibold text-tera-navy">{t.directorName}</p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">{t.directorRule}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-start">
                <OpenableImage
                  groupId="statutory-leaders"
                  index={1}
                  src={IMAGES.photo4}
                  alt={t.directorPhotoAlt}
                  wrapperClassName="relative aspect-[4/3] overflow-hidden rounded-2xl border border-tera-border/60 bg-tera-nav-bg shadow-sm"
                  imageClassName="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-tera-navy">
                    {t.directorBioTitle}
                  </h3>
                  <div className="prose-tera mt-4 text-sm leading-relaxed text-foreground/85">
                    {t.directorBioParagraphs.map((p) => (
                      <p key={p.slice(0, 48)}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </section>

          <nav
            className="relative z-10 mt-10"
            aria-label={ui.otherAboutSections}
          >
            <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-tera-navy">
              {t.otherAbout}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </nav>
        </article>
      </section>
    </>
  );
}
