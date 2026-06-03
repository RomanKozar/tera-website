import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/novyny");
  revalidatePath("/en/novyny");
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
