import type { ReactNode } from "react";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { PageHeader } from "@/components/ui/PageHeader";
import type { PageContent } from "@/content/types";
import { getContent } from "@/content";
import { getSiteMeta, type Locale } from "@/lib/site";

function ContactCard({
  icon,
  iconClassName,
  label,
  children,
  className = "",
}: {
  icon: ReactNode;
  iconClassName: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-4 rounded-2xl border border-tera-border/60 bg-white p-5 shadow-md sm:p-6 ${className}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${iconClassName}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-tera-blue/80">
          {label}
        </p>
        <div className="mt-2 text-sm font-medium leading-relaxed text-tera-navy sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

function IconGlobe() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M6.6 10.8c1.5 3 3.6 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.8c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
      <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function ContactsPage({
  locale,
  page,
}: {
  locale: Locale;
  page: PageContent;
}) {
  const { ui } = getContent(locale);
  const { contacts, facebookUrl, fullName } = getSiteMeta(locale);

  const linkClass =
    "font-semibold text-tera-blue underline-offset-2 transition-colors hover:text-tera-blue-dark hover:underline";

  return (
    <>
      <PageHeader title={page.title} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWaveStack tops={[0, 520, 1040]} start="left" />

          <section className="relative z-10 mx-auto max-w-5xl">
            <div className="rounded-2xl border border-tera-border/70 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                {ui.orgContactsTitle}
              </p>
              <p className="mt-3 text-lg font-bold leading-snug text-tera-navy sm:text-xl">
                {fullName}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ContactCard
                icon={<IconGlobe />}
                iconClassName="bg-tera-blue"
                label={ui.websiteLabel}
              >
                <a
                  href={contacts.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {contacts.websiteLabel}
                </a>
              </ContactCard>

              <ContactCard
                icon={<IconPhone />}
                iconClassName="bg-emerald-600"
                label={ui.phoneLabel}
              >
                <a href={contacts.phoneHref} className={linkClass}>
                  {contacts.phone}
                </a>
              </ContactCard>

              <ContactCard
                icon={<IconFacebook />}
                iconClassName="bg-[#1877F2]"
                label={ui.facebookLabel}
              >
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ui.facebookPageAria}
                  className={linkClass}
                >
                  {ui.facebookOpen}
                </a>
              </ContactCard>

              <ContactCard
                icon={<IconMail />}
                iconClassName="bg-amber-500"
                label={ui.emailLabel}
              >
                <a href={`mailto:${contacts.email}`} className={linkClass}>
                  {contacts.email}
                </a>
              </ContactCard>

              <ContactCard
                icon={<IconPin />}
                iconClassName="bg-teal-600"
                label={ui.addressLabel}
                className="sm:col-span-2"
              >
                <p className="text-tera-navy">{contacts.address}</p>
              </ContactCard>
            </div>
          </section>
        </article>
      </section>
    </>
  );
}
