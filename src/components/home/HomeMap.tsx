import Image from "next/image";
import type { Locale } from "@/lib/site";

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 675;

export function HomeMap({ locale }: { locale: Locale }) {
  const alt =
    locale === "uk"
      ? "Карта громад ТеРА: Колочавська, Синевирська, Драгівська, Буштинська. Річка Теребля, озеро Синевир"
      : "TeRA communities map: Kolochavska, Synevyrska, Drahivska, Bushtynska. Tereblya River, Lake Synevyr";

  return (
    <figure className="w-full max-w-xl justify-self-start lg:max-w-none lg:pr-4">
      <h1 className="sr-only">
        {locale === "uk" ? "Карта громад ТеРА" : "TeRA communities map"}
      </h1>
      <Image
        src="/hero.png"
        alt={alt}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        priority
        quality={100}
        unoptimized
        className="h-auto w-full max-h-[240px] object-contain object-left sm:max-h-[300px] lg:max-h-[360px]"
        sizes="(max-width: 1024px) 90vw, 55vw"
      />
    </figure>
  );
}
