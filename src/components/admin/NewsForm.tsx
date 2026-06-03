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
  }, [initial?.bodyJson, initial?.body]);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [editorPayload, setEditorPayload] = useState<EditorPayload | null>(() => {
    if (initial?.bodyJson && initial.bodyHtml) {
      return {
        json: initial.bodyJson as JSONContent,
        html: initial.bodyHtml,
        text: initial.body,
      };
    }
    if (initial?.body) {
      const json = plainTextToEditorDoc(initial.body);
      return { json, html: "", text: initial.body };
    }
    return null;
  });
  const [publishedAt, setPublishedAt] = useState(
    initial?.publishedAt?.slice(0, 10) ?? todayDateInputValue(),
  );
  const [status, setStatus] = useState<FirebaseNewsStatus>(
    initial?.status ?? "draft",
  );
  const [saving, setSaving] = useState(false);
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

      await fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);

      router.push("/novyny/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка збереження.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-white p-6 shadow-sm">
      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

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
        <span className="text-sm font-medium text-slate-700">Дата публікації</span>
        <input
          type="date"
          className="mt-1 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
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
          Ставте курсор у потрібне місце → «Вставити фото». Щоб перенести фото — виріжте
          «2 в ряд» — два фото поруч; або вставте «Мале» двічі в один рядок (курсор між
          ними). Розмір — кутики або «½ ряд» / «Мале». До {MAX_INLINE_IMAGES} фото, до 10 МБ.
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
          {saving ? "Збереження…" : "Зберегти"}
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
