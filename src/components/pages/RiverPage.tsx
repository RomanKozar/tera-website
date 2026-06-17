import { getRiverContent, type RiverSection } from "@/content/river";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { OpenableImage } from "@/components/ui/image-lightbox/OpenableImage";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";

function sectionImageIndices(blocks: RiverSection[]): Map<number, number | number[]> {
  const map = new Map<number, number | number[]>();
  let idx = 0;

  blocks.forEach((block, blockIndex) => {
    if (block.type === "image") {
      map.set(blockIndex, idx);
      idx += 1;
    } else if (block.type === "images-row") {
      map.set(
        blockIndex,
        block.images.map(() => {
          const current = idx;
          idx += 1;
          return current;
        }),
      );
    }
  });

  return map;
}

function RiverBlock({
  block,
  sectionId,
  tributariesTitle,
  tributariesRightLabel,
  tributariesLeftLabel,
  imageIndices,
}: {
  block: RiverSection;
  sectionId: string;
  tributariesTitle: string;
  tributariesRightLabel: string;
  tributariesLeftLabel: string;
  imageIndices?: number | number[];
}) {
  switch (block.type) {
    case "highlights":
      return (
        <dl className="grid gap-4 sm:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/80 bg-white/90 p-4 shadow-sm"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                {item.label}
              </dt>
              <dd className="mt-2 text-xl font-bold text-tera-navy sm:text-2xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "paragraphs":
      return (
        <div className="prose-tera space-y-4 text-base leading-relaxed text-foreground/90">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      );

    case "tributaries":
      return (
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-lg font-bold text-tera-navy">{tributariesTitle}</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-tera-blue">
                {tributariesRightLabel}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700">
                {block.right.map((name) => (
                  <li key={name} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tera-gold" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-tera-blue">
                {tributariesLeftLabel}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700">
                {block.left.map((name) => (
                  <li key={name} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tera-gold" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    case "image":
      return (
        <OpenableImage
          groupId={`river-${sectionId}`}
          index={typeof imageIndices === "number" ? imageIndices : 0}
          src={block.src}
          alt={block.alt}
          wrapperClassName={`relative overflow-hidden rounded-2xl border border-tera-border/60 shadow-md ${
            block.wide ? "min-h-[220px] sm:min-h-[320px]" : "min-h-[200px] sm:min-h-[280px]"
          }`}
          imageClassName="object-cover"
          sizes={
            block.wide
              ? "(max-width: 768px) 100vw, 896px"
              : "(max-width: 768px) 100vw, 720px"
          }
        />
      );

    case "images-row":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {block.images.map((img, imgIndex) => (
            <OpenableImage
              key={img.src}
              groupId={`river-${sectionId}`}
              index={
                Array.isArray(imageIndices) ? (imageIndices[imgIndex] ?? imgIndex) : imgIndex
              }
              src={img.src}
              alt={img.alt}
              wrapperClassName="relative min-h-[200px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md sm:min-h-[240px]"
              imageClassName="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function RiverPage({ locale }: { locale: Locale }) {
  const content = getRiverContent(locale);
  const tributariesTitle =
    locale === "en" ? "Tributaries of the Tereblya" : "Притоки Тереблі";
  const tributariesRightLabel = locale === "en" ? "Right" : "Праві";
  const tributariesLeftLabel = locale === "en" ? "Left" : "Ліві";

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWaveStack
            tops={[0, 520, 1180, 1880, 2580, 3280, 3980]}
            start="left"
          />

          <section className="relative z-10 max-w-4xl">
            <div className="rounded-2xl border border-tera-border/70 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md sm:p-8">
              <p className="text-xl font-bold leading-relaxed text-tera-navy sm:text-2xl">
                {content.lead}
              </p>
            </div>
          </section>

          <div className="relative z-10 mt-12 space-y-12 sm:space-y-16">
            {content.sections.map((section) => {
              const imageIdxMap = sectionImageIndices(section.blocks);

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white p-5 shadow-md sm:p-8"
                >
                  <h2 className="border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-6 sm:space-y-8">
                    {section.blocks.map((block, blockIndex) => (
                      <RiverBlock
                        key={`${section.id}-${blockIndex}`}
                        block={block}
                        sectionId={section.id}
                        tributariesTitle={tributariesTitle}
                        tributariesRightLabel={tributariesRightLabel}
                        tributariesLeftLabel={tributariesLeftLabel}
                        imageIndices={imageIdxMap.get(blockIndex)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </article>
      </section>
    </>
  );
}
