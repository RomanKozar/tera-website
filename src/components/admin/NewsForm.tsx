"use client";

import type { JSONContent } from "@tiptap/core";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type {
  FirebaseNewsDoc,
  FirebaseNewsStatus,
  NewsImageItem,
} from "@/lib/firebase/news-types";
import {
  extractFirstImageSrc,
  MAX_INLINE_IMAGES,
  plainTextToEditorDoc,
} from "@/lib/rich-text";
import {
  createNewsAdmin,
  slugifyTitle,
  updateNewsAdmin,
} from "@/lib/firebase/news-admin";
import { buildNewsPublishedAt } from "@/lib/news-published-at";
import { revalidatePublicSite } from "@/lib/revalidate-public";
import { fetchAutoEnglishTranslation } from "@/lib/translate/client";

type Props = {
  initial?: FirebaseNewsDoc;
};

type EditorPayload = {
  json: JSONContent;
  html: string;
  text: string;
};

const UK_MONTHS = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
] as const;

function todayParts() {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
}

function parsePublishedDate(iso?: string) {
  if (iso?.slice(0, 10)) {
    const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
    if (year && month && day) {
      return { day, month, year };
    }
  }
  return todayParts();
}

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

function NewsDateFields({
  day,
  month,
  year,
  onChange,
}: {
  day: number;
  month: number;
  year: number;
  onChange: (next: { day: number; month: number; year: number }) => void;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 3 + i);
  const maxDay = daysInMonth(month, year);
  const safeDay = Math.min(day, maxDay);

  const selectClass =
    "cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm";

  return (
    <div className="mt-1 flex flex-wrap items-center gap-2">
      <label className="flex items-center gap-1.5 text-sm text-slate-600">
        <span className="sr-only">День</span>
        <select
          className={`${selectClass} min-w-[4.5rem]`}
          value={safeDay}
          onChange={(e) =>
            onChange({ day: Number(e.target.value), month, year })
          }
          aria-label="День"
        >
          {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <span>/</span>
      </label>

      <label className="flex min-w-[8.5rem] flex-1 items-center gap-1.5 text-sm text-slate-600 sm:max-w-[11rem]">
        <span className="sr-only">Місяць</span>
        <select
          className={`${selectClass} w-full`}
          value={month}
          onChange={(e) => {
            const nextMonth = Number(e.target.value);
            const nextMax = daysInMonth(nextMonth, year);
            onChange({
              day: Math.min(safeDay, nextMax),
              month: nextMonth,
              year,
            });
          }}
          aria-label="Місяць"
        >
          {UK_MONTHS.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
        <span>/</span>
      </label>

      <label className="flex items-center gap-1.5 text-sm text-slate-600">
        <span className="sr-only">Рік</span>
        <select
          className={`${selectClass} min-w-[5.5rem]`}
          value={year}
          onChange={(e) => {
            const nextYear = Number(e.target.value);
            const nextMax = daysInMonth(month, nextYear);
            onChange({
              day: Math.min(safeDay, nextMax),
              month,
              year: nextYear,
            });
          }}
          aria-label="Рік"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function resolveNewsImages(
  json: JSONContent,
  html: string,
  initial: FirebaseNewsDoc | undefined,
  coverAlt: string,
): { imageUrl: string; imageAlt: string; images: NewsImageItem[] } {
  const fromEditor = extractFirstImageSrc(json, html);
  if (fromEditor) {
    return {
      imageUrl: fromEditor,
      imageAlt: coverAlt,
      images: [{ url: fromEditor, alt: coverAlt }],
    };
  }

  if (initial?.images?.length) {
    const first = initial.images[0]!;
    return {
      imageUrl: first.url,
      imageAlt: first.alt || coverAlt,
      images: initial.images,
    };
  }

  if (initial?.imageUrl) {
    return {
      imageUrl: initial.imageUrl,
      imageAlt: initial.imageAlt || coverAlt,
      images: [{ url: initial.imageUrl, alt: initial.imageAlt || coverAlt }],
    };
  }

  return { imageUrl: "", imageAlt: coverAlt, images: [] };
}

function buildInitialEditorPayload(
  initial: FirebaseNewsDoc | undefined,
): EditorPayload | null {
  if (!initial) {
    return null;
  }

  if (initial.bodyJson && initial.bodyHtml) {
    return {
      json: initial.bodyJson as JSONContent,
      html: initial.bodyHtml,
      text: initial.body,
    };
  }
  if (initial.body) {
    return { json: plainTextToEditorDoc(initial.body), html: "", text: initial.body };
  }
  return null;
}

export function NewsForm({ initial }: Props) {
  const router = useRouter();
  const storageId = useMemo(
    () => initial?.id ?? `draft-${crypto.randomUUID()}`,
    [initial?.id],
  );

  const initialEditorContent = useMemo(() => {
    if (initial?.bodyJson) {
      return initial.bodyJson as JSONContent;
    }
    if (initial?.body) {
      return plainTextToEditorDoc(initial.body);
    }
    return undefined;
  }, [initial]);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [editorPayload, setEditorPayload] = useState<EditorPayload | null>(() =>
    buildInitialEditorPayload(initial),
  );
  const [publishedDate, setPublishedDate] = useState(() =>
    parsePublishedDate(initial?.publishedAt),
  );
  const [status, setStatus] = useState<FirebaseNewsStatus>(
    initial?.status ?? "draft",
  );
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");

  const slugPreview = slugifyTitle(title);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const text = editorPayload?.text.trim() ?? "";
    const html = editorPayload?.html.trim() ?? "";
    const json = editorPayload?.json;

    if (!title.trim()) {
      setError("Вкажіть заголовок.");
      return;
    }
    if (!text) {
      setError("Вкажіть текст новини.");
      return;
    }
    if (!json) {
      setError("Редактор ще завантажується. Зачекайте секунду.");
      return;
    }

    setSaving(true);

    try {
      setTranslating(true);
      const translated = await fetchAutoEnglishTranslation({
        title: title.trim(),
        excerpt: excerpt.trim(),
        body: text,
        bodyJson: json,
      });
      setTranslating(false);

      const finalSlug = initial?.slug?.trim() || slugifyTitle(title);
      const coverAlt = title.trim();
      const { imageUrl, imageAlt, images } = resolveNewsImages(
        json,
        html,
        initial,
        coverAlt,
      );
      const payload = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt.trim(),
        body: text,
        bodyJson: json as Record<string, unknown>,
        bodyHtml: html,
        titleEn: translated.titleEn,
        slugEn: translated.titleEn ? slugifyTitle(translated.titleEn) : "",
        excerptEn: translated.excerptEn,
        bodyEn: translated.bodyEn,
        bodyJsonEn: translated.bodyJsonEn,
        bodyHtmlEn: translated.bodyHtmlEn,
        imageAltEn: translated.titleEn || coverAlt,
        publishedAt: buildNewsPublishedAt(
          publishedDate.day,
          publishedDate.month,
          publishedDate.year,
          initial?.id ? initial.publishedAt : undefined,
        ),
        status,
        imageUrl,
        imageAlt,
        images,
      };

      let docId = initial?.id;
      if (!docId) {
        docId = await createNewsAdmin(payload);
      } else {
        await updateNewsAdmin(docId, payload);
      }

      await revalidatePublicSite();

      router.push("/novyny/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка збереження.");
    } finally {
      setTranslating(false);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-white p-6 shadow-sm">
      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
        <p className="font-medium text-slate-700">Як заповнити новину:</p>
        <ul className="mt-1 list-inside list-disc space-y-1">
          <li>
            <span className="font-medium">Заголовок</span> — назва новини.
            <span className="block pl-4 text-slate-500">
              Показується на головній (блок «Новини ТеРА»), у списку новин і великим
              текстом у шапці сторінки статті.
            </span>
          </li>
          <li>
            <span className="font-medium">Короткий опис</span> — 1–3 речення.
            <span className="block pl-4 text-slate-500">
              Показується під заголовком у картці на головній та в списку новин (перед
              «Детальніше»).
            </span>
          </li>
          <li>
            <span className="font-medium">Текст новини</span> — повний текст; можна
            додавати фото в редакторі.
            <span className="block pl-4 text-slate-500">
              Показується на сторінці статті під датою. Перше фото в тексті —
              обкладинка в картці на головній і в списку.
            </span>
          </li>
        </ul>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Заголовок *</span>
        <input
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {slugPreview ? (
          <p className="mt-1 text-xs text-slate-500">
            Посилання:{" "}
            <span className="font-mono text-tera-blue">/novyny/{slugPreview}</span>
          </p>
        ) : null}
      </label>

      <div className="block">
        <span className="text-sm font-medium text-slate-700">Дата публікації</span>
        <p className="mt-0.5 text-xs text-slate-500">День / місяць / рік</p>
        <NewsDateFields
          day={publishedDate.day}
          month={publishedDate.month}
          year={publishedDate.year}
          onChange={setPublishedDate}
        />
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Короткий опис</span>
        <textarea
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </label>

      <div className="block">
        <span className="text-sm font-medium text-slate-700">Текст новини *</span>
        <p className="mt-0.5 text-xs text-slate-500">
          «2 в ряд» — два фото поруч. До {MAX_INLINE_IMAGES} фото, до 10 МБ.
        </p>
        <div className="mt-2">
          <RichTextEditor
            storageId={storageId}
            initialContent={initialEditorContent}
            onChange={setEditorPayload}
            onError={setError}
          />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-700">Статус</legend>
        <label className="mr-4 inline-flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="status"
            checked={status === "draft"}
            onChange={() => setStatus("draft")}
          />
          Чернетка
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="status"
            checked={status === "published"}
            onChange={() => setStatus("published")}
          />
          Опубліковано
        </label>
      </fieldset>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="cursor-pointer rounded-lg bg-tera-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {translating ? "Переклад…" : saving ? "Збереження…" : "Зберегти"}
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-slate-200 px-5 py-2.5 text-sm"
          onClick={() => router.push("/novyny/admin/news")}
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}
