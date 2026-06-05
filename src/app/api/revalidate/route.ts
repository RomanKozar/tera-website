import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidatePath("/", "layout");
  revalidatePath("/novyny");
  revalidatePath("/en");
  revalidatePath("/en/novyny");
  revalidatePath("/novyny", "page");
  revalidatePath("/en/novyny", "page");

  return NextResponse.json({ ok: true });
}
