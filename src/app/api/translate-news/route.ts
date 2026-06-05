import { NextResponse } from "next/server";
import type { JSONContent } from "@tiptap/core";
import { translateNewsToEnglish } from "@/lib/translate/uk-to-en";

export const dynamic = "force-dynamic";

type RequestBody = {
  title?: string;
  excerpt?: string;
  body?: string;
  bodyJson?: JSONContent | null;
};

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const text = String(body.body ?? "").trim();

  if (!title || !text) {
    return NextResponse.json(
      { error: "title and body are required" },
      { status: 400 },
    );
  }

  try {
    const translated = await translateNewsToEnglish({
      title,
      excerpt: String(body.excerpt ?? ""),
      body: text,
      bodyJson: body.bodyJson ?? null,
    });

    return NextResponse.json(translated);
  } catch (error) {
    console.error("[translate-news]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Translation failed. Try again or fill English manually.",
      },
      { status: 502 },
    );
  }
}
