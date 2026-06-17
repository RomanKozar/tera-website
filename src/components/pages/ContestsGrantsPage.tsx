import {
  getContestsGrantsContent,
  type GrantBlock,
} from "@/content/contests-grants";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { OpenableImage } from "@/components/ui/image-lightbox/OpenableImage";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";

function sectionImageIndices(blocks: GrantBlock[]): Map<number, number> {
  const map = new Map<number, number>();
  let idx = 0;

  blocks.forEach((block, blockIndex) => {
    if (block.type === "image") {
      map.set(blockIndex, idx);
      idx += 1;
    }
  });

  return map;
}

function GrantBlockView({
  block,
  sectionId,
  imageIndex,
}: {
  block: GrantBlock;
  sectionId: string;
  imageIndex?: number;
}) {
  switch (block.type) {
    case "paragraphs":
      return (
        <div className="prose-tera space-y-4 text-base leading-relaxed text-foreground/90">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      );

    case "list":
      return (
        <div>
          <h3 className="text-lg font-bold text-tera-navy">{block.title}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            {block.items.map((item) => (
              <li key={item.slice(0, 48)} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tera-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "highlights":
      return (
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-100 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-4 shadow-sm"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-tera-blue">
                {item.label}
              </dt>
              <dd className="mt-2 text-lg font-bold text-tera-navy">{item.value}</dd>
            </div>
          ))}
        </dl>
      );

    case "image":
      return (
        <OpenableImage
          groupId={`grants-${sectionId}`}
          index={imageIndex ?? 0}
          src={block.src}
          alt={block.alt}
          wrapperClassName="relative min-h-[200px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md sm:min-h-[300px]"
          imageClassName="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      );

    case "deadline":
      return (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-900">
            {block.label}
          </p>
          <p className="mt-1 text-base font-bold text-tera-navy sm:text-lg">
            {block.value}
          </p>
        </div>
      );

    case "link":
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-tera-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tera-blue"
        >
          {block.label}
          <span aria-hidden="true">↗</span>
        </a>
      );

    default:
      return null;
  }
}

export function ContestsGrantsPage({ locale }: { locale: Locale }) {
  const { pageTitle, programs } = getContestsGrantsContent(locale);

  return (
    <>
      <PageHeader title={pageTitle} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWaveStack tops={[0, 900, 1900, 2900]} start="left" />

          <div className="relative z-10 space-y-12 sm:space-y-16">
            {programs.map((program) => {
              const imageIdxMap = sectionImageIndices(program.blocks);

              return (
                <section
                  key={program.id}
                  id={program.id}
                  className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white p-5 shadow-md sm:p-8"
                >
                  <h2 className="text-xl font-bold leading-snug text-tera-navy sm:text-2xl">
                    {program.title}
                  </h2>

                  <div className="mt-6 space-y-6 sm:space-y-8">
                    {program.blocks.map((block, blockIndex) => (
                      <GrantBlockView
                        key={`${program.id}-${blockIndex}`}
                        block={block}
                        sectionId={program.id}
                        imageIndex={imageIdxMap.get(blockIndex)}
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
