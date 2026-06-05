"use client";

import type { JSONContent } from "@tiptap/core";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { FirebaseNewsDoc, FirebaseNewsStatus } from "@/lib/firebase/news-types";
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
import { revalidatePublicSite } from "@/lib/revalidate-public";
import {
  fetchAutoEnglishTranslation,
  shouldAutoTranslateEnglish,
} from "@/lib/translate/client";

type Props = {
  initial?: FirebaseNewsDoc;
};

type EditorPayload = {
  json: JSONContent;
  html: string;
  text: string;
};

function todayDateInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function buildInitialEditorPayload(
  initial: FirebaseNewsDoc | undefined,
  lang: "uk" | "en",
): EditorPayload | null {
  if (!initial) {
    return null;
  }

  const bodyJson = lang === "en" ? initial.bodyJsonEn : initial.bodyJson;
  const bodyHtml = lang === "en" ? initial.bodyHtmlEn : initial.bodyHtml;
  const body = lang === "en" ? initial.bodyEn : initial.body;

  if (bodyJson && bodyHtml) {
    return {
      json: bodyJson as JSONContent,
      html: bodyHtml,
      text: body ?? "",
    };
  }
  if (body) {
    return { json: plainTextToEditorDoc(body), html: "", text: body };
  }
  return null;
}

export function NewsForm({ initial }: Props) {
  const router = useRouter();
  const storageId = useMemo(
    () => initial?.id ?? `draft-${crypto.randomUUID()}`,
    [initial?.id],
  );
  const storageIdEn = `${storageId}-en`;

  const initialEditorContent = useMemo(() => {
    if (initial?.bodyJson) {
      return initial.bodyJson as JSONContent;
    }
    if (initial?.body) {
      return plainTextToEditorDoc(initial.body);
    }
    return undefined;
  }, [initial?.bodyJson, initial?.body]);

  const initialEditorContentEn = useMemo(() => {
    if (initial?.bodyJsonEn) {
      return initial.bodyJsonEn as JSONContent;
    }
    if (initial?.bodyEn) {
      return plainTextToEditorDoc(initial.bodyEn);
    }
    return undefined;
  }, [initial?.bodyJsonEn, initial?.bodyEn]);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [titleEn, setTitleEn] = useState(initial?.titleEn ?? "");
  const [excerptEn, setExcerptEn] = useState(initial?.excerptEn ?? "");
  const [editorPayload, setEditorPayload] = useState<EditorPayload | null>(() =>
    buildInitialEditorPayload(initial, "uk"),
  );
  const [editorEnPayload, setEditorEnPayload] = useState<EditorPayload | null>(
    () => buildInitialEditorPayload(initial, "en"),
  );
  const [publishedAt, setPublishedAt] = useState(
    initial?.publishedAt?.slice(0, 10) ?? todayDateInputValue(),
  );
  const [status, setStatus] = useState<FirebaseNewsStatus>(
    initial?.status ?? "draft",
  );
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");

  const slugPreview = slugifyTitle(title);
  const slugEnPreview = titleEn.trim() ? slugifyTitle(titleEn) : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const text = editorPayload?.text.trim() ?? "";
    const html = editorPayload?.html.trim() ?? "";
    const json = editorPayload?.json;

    const textEn = editorEnPayload?.text.trim() ?? "";
    const htmlEn = editorEnPayload?.html.trim() ?? "";
    const jsonEn = editorEnPayload?.json;

    if (!title.trim()) {
      setError("Вкажіть заголовок (українською).");
      return;
    }
    if (!text) {
      setError("Вкажіть текст новини (українською).");
      return;
    }
    if (!json) {
      setError("Редактор ще завантажується. Зачекайте секунду.");
      return;
    }
    setSaving(true);

    try {
      let resolvedTitleEn = titleEn.trim();
      let resolvedExcerptEn = excerptEn.trim();
      let resolvedTextEn = textEn;
      let resolvedHtmlEn = htmlEn;
      let resolvedJsonEn = jsonEn as Record<string, unknown> | null;

      if (shouldAutoTranslateEnglish(resolvedTitleEn, resolvedExcerptEn, resolvedTextEn)) {
        setTranslating(true);
        const translated = await fetchAutoEnglishTranslation({
          title: title.trim(),
          excerpt: excerpt.trim(),
          body: text,
          bodyJson: json,
        });
        resolvedTitleEn = translated.titleEn;
        resolvedExcerptEn = translated.excerptEn;
        resolvedTextEn = translated.bodyEn;
        resolvedHtmlEn = translated.bodyHtmlEn;
        resolvedJsonEn = translated.bodyJsonEn;
        setTranslating(false);
      }

      const finalSlug = slugifyTitle(title);
      const coverUrl = extractFirstImageSrc(json, html) ?? "";
      const coverAlt = title.trim();
      const payload = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt.trim(),
        body: text,
        bodyJson: json as Record<string, unknown>,
        bodyHtml: html,
        titleEn: resolvedTitleEn,
        slugEn: resolvedTitleEn ? slugifyTitle(resolvedTitleEn) : "",
        excerptEn: resolvedExcerptEn,
        bodyEn: resolvedTextEn,
        bodyJsonEn: resolvedJsonEn,
        bodyHtmlEn: resolvedHtmlEn,
        imageAltEn: resolvedTitleEn || coverAlt,
        publishedAt: new Date(publishedAt).toISOString(),
        status,
        imageUrl: coverUrl,
        imageAlt: coverAlt,
        images: coverUrl
          ? [{ url: coverUrl, alt: coverAlt }]
          : [],
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

      <fieldset className="space-y-5 rounded-lg border border-slate-200 p-4">
        <legend className="px-1 text-sm font-semibold text-tera-navy">
          Українська версія ( /novyny )
        </legend>

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
      </fieldset>

      <fieldset className="space-y-5 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
        <legend className="px-1 text-sm font-semibold text-tera-navy">
          English version ( /en/novyny )
        </legend>
        <p className="text-xs text-slate-500">
          Можна залишити порожнім — при збереженні текст автоматично перекладається
          українською → англійською для /en/novyny. Або заповніть вручну, якщо потрібен
          свій переклад.
        </p>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
          />
          {slugEnPreview ? (
            <p className="mt-1 text-xs text-slate-500">
              Link:{" "}
              <span className="font-mono text-tera-blue">
                /en/novyny/{slugEnPreview}
              </span>
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Short description</span>
          <textarea
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            rows={3}
            value={excerptEn}
            onChange={(e) => setExcerptEn(e.target.value)}
          />
        </label>

        <div className="block">
          <span className="text-sm font-medium text-slate-700">Article text</span>
          <div className="mt-2">
            <RichTextEditor
              storageId={storageIdEn}
              initialContent={initialEditorContentEn}
              onChange={setEditorEnPayload}
              onError={setError}
            />
          </div>
        </div>
      </fieldset>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Дата публікації</span>
        <input
          type="date"
          className="mt-1 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
      </label>

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
