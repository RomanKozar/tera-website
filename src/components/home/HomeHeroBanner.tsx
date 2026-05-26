import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { getContent } from "@/content";
import { SITE, type Locale } from "@/lib/site";

export function HomeHeroBanner({ locale }: { locale: Locale }) {
  const { home } = getContent(locale);

  return (
    <section className="relative overflow-x-clip bg-white px-4 pb-3 pt-8 sm:px-6 sm:pb-4 sm:pt-10">
      <article className="relative mx-auto max-w-7xl">
        <svg
          aria-hidden="true"
          viewBox="0 0 120 420"
          className="pointer-events-none absolute -left-32 top-2 hidden h-[360px] w-28 -scale-x-100 opacity-80 lg:block"
        >
          <path
            d="M72 18C42 92 81 153 57 230C38 290 16 332 73 402"
            fill="none"
            stroke="#bfe3f5"
            strokeLinecap="round"
            strokeWidth="28"
          />
          <path
            d="M95 48C62 125 92 191 76 265C61 333 47 363 98 404"
            fill="none"
            stroke="#f9e783"
            strokeLinecap="round"
            strokeWidth="24"
          />
        </svg>

        <div className="relative z-10 overflow-hidden rounded-2xl shadow-md">
          <Image
            src={IMAGES.hero}
            alt={
              locale === "uk"
                ? "Карта громад ТеРА — співпраця для розвитку громад"
                : "TeRA communities map"
            }
            width={1280}
            height={520}
            priority
            unoptimized
            className="h-[220px] w-full object-cover object-center sm:h-[300px] lg:h-[380px]"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

          <div className="absolute left-4 top-3 z-10 flex max-w-[180px] flex-col gap-2 sm:left-8 sm:top-4 sm:max-w-xs sm:gap-4 lg:top-5">
            <Image
              src={IMAGES.logoMain}
              alt={SITE.name}
              width={180}
              height={180}
              unoptimized
              className="h-auto w-full max-w-[92px] sm:max-w-[170px]"
            />
            <h1 className="mt-6 text-base font-bold uppercase leading-tight tracking-wide text-tera-navy sm:mt-0 sm:text-2xl lg:text-3xl">
              {home.heroSlogan}
            </h1>
          </div>
        </div>
      </article>
    </section>
  );
}
