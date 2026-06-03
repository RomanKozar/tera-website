"use client";

import Link from "@tiptap/extension-link";
import { NewsImage } from "@/lib/tiptap/news-image-extension";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Editor, JSONContent } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import { useRef } from "react";
import {
  convertFileToWebp,
  MAX_NEWS_IMAGE_BYTES,
  readImageFileDimensions,
  validateImageFile,
} from "@/lib/firebase/news-image";
import { uploadNewsImage } from "@/lib/firebase/news-admin";
import {
  computeDefaultImageDimensions,
  computeImageRowCellDimensions,
  computeImageRowCellWidth,
  countImagesInDoc,
  IMAGES_PER_ROW,
  MAX_INLINE_IMAGES,
  NEWS_CONTENT_IMAGE_MAX_WIDTH,
} from "@/lib/rich-text";

type Props = {
  storageId: string;
  initialContent?: JSONContent | null;
  onChange: (payload: { json: JSONContent; html: string; text: string }) => void;
  onError: (message: string) => void;
};

const IMAGE_WIDTH_PRESETS = [
  { label: "Мале", width: 320 },
  { label: "Середнє", width: 480 },
  { label: "½ ряд", width: computeImageRowCellWidth(IMAGES_PER_ROW) },
  { label: "На всю ширину", width: NEWS_CONTENT_IMAGE_MAX_WIDTH },
] as const;

type PreparedImage = {
  src: string;
  width: number;
  height: number;
};

export function RichTextEditor({
  storageId,
  initialContent,
  onChange,
  onError,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rowFileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      NewsImage.configure({
        inline: true,
        HTMLAttributes: {
          class: "news-inline-image",
        },
        resize: {
          enabled: true,
          directions: [
            "bottom-right",
            "bottom-left",
            "top-right",
            "top-left",
            "right",
            "left",
          ],
          minWidth: 120,
          minHeight: 80,
          alwaysPreserveAspectRatio: true,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-tera-blue underline" },
      }),
      Placeholder.configure({
        placeholder:
          "«Вставити фото» — на всю ширину. «2 в ряд» — два маленькі поруч. Або вставте «Мале» двічі в один рядок.",
      }),
    ],
    content: initialContent ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor min-h-[280px] px-4 py-3 text-base leading-relaxed text-foreground/90 focus:outline-none",
      },
    },
    onCreate: ({ editor: ed }) => {
      onChange({
        json: ed.getJSON(),
        html: ed.getHTML(),
        text: ed.getText(),
      });
    },
    onUpdate: ({ editor: ed }) => {
      onChange({
        json: ed.getJSON(),
        html: ed.getHTML(),
        text: ed.getText(),
      });
    },
  });

  async function prepareUploadedImage(
    file: File,
    sizeMode: "full" | "row-cell",
  ): Promise<PreparedImage> {
    const webp = await convertFileToWebp(file);
    if (webp.size > MAX_NEWS_IMAGE_BYTES) {
      throw new Error("Фото після стиснення все ще більше 10 МБ.");
    }

    const natural = await readImageFileDimensions(webp);
    const { width, height } =
      sizeMode === "row-cell"
        ? computeImageRowCellDimensions(natural.width, natural.height)
        : computeDefaultImageDimensions(natural.width, natural.height);

    const uploaded = await uploadNewsImage(storageId, webp);
    return { src: uploaded.url, width, height };
  }

  async function insertImage(file: File) {
    if (!editor) {
      return;
    }

    const validationError = validateImageFile(file);
    if (validationError) {
      onError(validationError);
      return;
    }

    const currentImages = countImagesInDoc(editor.getJSON());
    if (currentImages >= MAX_INLINE_IMAGES) {
      onError(`Максимум ${MAX_INLINE_IMAGES} фото в тексті.`);
      return;
    }

    try {
      const prepared = await prepareUploadedImage(file, "full");
      editor
        .chain()
        .focus()
        .setImage({ src: prepared.src, alt: "", width: prepared.width, height: prepared.height })
        .run();
      onError("");
    } catch (err) {
      onError(err instanceof Error ? err.message : "Не вдалося завантажити фото.");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function insertImageRow(files: FileList | File[]) {
    if (!editor) {
      return;
    }

    const picked = Array.from(files).slice(0, IMAGES_PER_ROW);
    if (picked.length < IMAGES_PER_ROW) {
      onError(`Оберіть ${IMAGES_PER_ROW} фото для рядка.`);
      return;
    }

    for (const file of picked) {
      const validationError = validateImageFile(file);
      if (validationError) {
        onError(validationError);
        return;
      }
    }

    const currentImages = countImagesInDoc(editor.getJSON());
    if (currentImages + IMAGES_PER_ROW > MAX_INLINE_IMAGES) {
      onError(`Максимум ${MAX_INLINE_IMAGES} фото в тексті.`);
      return;
    }

    try {
      const prepared = await Promise.all(
        picked.map((file) => prepareUploadedImage(file, "row-cell")),
      );

      editor
        .chain()
        .focus()
        .insertContent({
          type: "paragraph",
          content: prepared.map((img) => ({
            type: "image",
            attrs: {
              src: img.src,
              alt: "",
              width: img.width,
              height: img.height,
            },
          })),
        })
        .run();

      onError("");
    } catch (err) {
      onError(err instanceof Error ? err.message : "Не вдалося завантажити фото.");
    }

    if (rowFileInputRef.current) {
      rowFileInputRef.current.value = "";
    }
  }

  const selectionVersion = useEditorState({
    editor,
    selector: ({ editor: ed }) => ({
      active: ed?.isActive("image") ?? false,
      width: Number(ed?.getAttributes("image")?.width) || 0,
      revision: ed?.state.selection.from ?? 0,
    }),
  });

  if (!editor) {
    return <p className="text-sm text-slate-500">Завантаження редактора…</p>;
  }

  const imageCount = countImagesInDoc(editor.getJSON());
  const rowDisabled = imageCount > MAX_INLINE_IMAGES - IMAGES_PER_ROW;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
        <ToolbarButton
          label="Жирний"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          label="Курсив"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ToolbarButton>
        <ToolbarButton
          label="Заголовок"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          label="Список"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          •
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/bmp,image/avif,.jpg,.jpeg,.png,.webp,.gif"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              void insertImage(file);
            }
          }}
        />
        <input
          ref={rowFileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif,image/bmp,image/avif,.jpg,.jpeg,.png,.webp,.gif"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const files = e.target.files;
            if (files?.length) {
              void insertImageRow(files);
            }
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={imageCount >= MAX_INLINE_IMAGES}
          className="cursor-pointer rounded-md bg-tera-navy px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Вставити фото
        </button>
        <button
          type="button"
          title="Завантажити 2 фото поруч в один ряд"
          onClick={() => rowFileInputRef.current?.click()}
          disabled={rowDisabled}
          className="cursor-pointer rounded-md bg-tera-blue px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          2 в ряд
        </button>
        <ImageSizeToolbar
          editor={editor}
          editorStateVersion={
            selectionVersion ?? { active: false, width: 0, revision: 0 }
          }
        />
        <span className="ml-auto self-center text-xs text-slate-500">
          Фото в тексті: {imageCount}/{MAX_INLINE_IMAGES}
        </span>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ImageSizeToolbar({
  editor,
  editorStateVersion,
}: {
  editor: Editor;
  editorStateVersion: { active: boolean; width: number; revision: number };
}) {
  void editorStateVersion.revision;

  if (!editorStateVersion.active) {
    return null;
  }

  const currentWidth = editorStateVersion.width;
  const rowWidth = computeImageRowCellWidth(IMAGES_PER_ROW);

  return (
    <span className="flex flex-wrap items-center gap-1 border-l border-slate-200 pl-2">
      <span className="text-xs text-slate-500">Розмір:</span>
      {IMAGE_WIDTH_PRESETS.map((preset) => (
        <button
          key={preset.width}
          type="button"
          title={`Ширина ${preset.width}px`}
          onClick={() => resizeSelectedImage(editor, preset.width)}
          className={`cursor-pointer rounded-md px-2 py-1 text-xs font-medium ${
            currentWidth === preset.width ||
            (preset.label === "½ ряд" && currentWidth === rowWidth)
              ? "bg-tera-blue text-white"
              : "bg-white text-tera-navy ring-1 ring-slate-200 hover:bg-slate-100"
          }`}
        >
          {preset.label}
        </button>
      ))}
    </span>
  );
}

function findSelectedImagePos(editor: Editor): number | undefined {
  const { selection } = editor.state;

  if (selection instanceof NodeSelection && selection.node.type.name === "image") {
    return selection.from;
  }

  const { $from } = selection;
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    const parent = $from.node(depth);
    if (parent.type.name === "image") {
      return $from.before(depth);
    }
  }

  if ($from.nodeAfter?.type.name === "image") {
    return $from.pos;
  }

  if ($from.nodeBefore?.type.name === "image") {
    return $from.pos - $from.nodeBefore.nodeSize;
  }

  return undefined;
}

function resizeSelectedImage(editor: Editor, targetWidth: number) {
  const pos = findSelectedImagePos(editor);
  if (pos === undefined) {
    return;
  }

  const node = editor.state.doc.nodeAt(pos);
  if (!node || node.type.name !== "image") {
    return;
  }

  let width = Number(node.attrs.width);
  let height = Number(node.attrs.height);

  if (!width && !height) {
    width = targetWidth;
    height = Math.round(targetWidth * 0.75);
  } else if (width && !height) {
    height = Math.round(targetWidth * 0.75);
  } else if (!width && height) {
    width = targetWidth;
  } else {
    height = Math.round(targetWidth * (height / width));
  }

  editor
    .chain()
    .focus()
    .setNodeSelection(pos)
    .updateAttributes("image", {
      width: targetWidth,
      height,
    })
    .run();
}

function ToolbarButton({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-semibold ${
        active
          ? "bg-tera-navy text-white"
          : "bg-white text-tera-navy ring-1 ring-slate-200 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
