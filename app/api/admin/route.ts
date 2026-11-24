import { timingSafeEqual } from "node:crypto";
import { checkText } from "@/lib/moderation";
import {
  clientIp, deleteItem, getItem, listItems, rateLimit, saveItem, storeEnabled,
} from "@/lib/faq-store";

const headers = { "Cache-Control": "no-store" };
const json = (body: unknown, status = 200) => Response.json(body, { status, headers });

async function guard(request: Request): Promise<Response | null> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!storeEnabled() || !expected) return json({ error: "Belum dikonfigurasi (env)." }, 503);

  if (!(await rateLimit(`luxen:rl:admin:${clientIp(request)}`, 60, 900))) {
    return json({ error: "Terlalu banyak percobaan." }, 429);
  }

  const given = Buffer.from(request.headers.get("x-admin-key") ?? "");
  const want = Buffer.from(expected);
  const ok = given.length === want.length && timingSafeEqual(given, want);
  return ok ? null : json({ error: "Password salah." }, 401);
}

export async function GET(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  const items = (await listItems()).sort((a, b) => b.createdAt - a.createdAt);
  return json({ items });
}

// Answer (or edit an answer). Answer is also checked for profanity.
export async function PATCH(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;

  const body = (await request.json().catch(() => ({}))) as { id?: unknown; answer?: unknown };
  const id = typeof body.id === "string" ? body.id : "";
  const answer = typeof body.answer === "string" ? body.answer.trim() : "";

  if (!id || answer.length < 2 || answer.length > 1000) {
    return json({ error: "Jawaban harus 2–1000 karakter." }, 422);
  }
  if (!checkText(answer, { allowContact: true }).ok) {
    return json({ error: "Jawaban mengandung kata yang tidak diperbolehkan." }, 422);
  }

  const item = await getItem(id);
  if (!item) return json({ error: "Pertanyaan tidak ditemukan." }, 404);

  await saveItem({ ...item, answer, status: "answered", answeredAt: Date.now() });
  return json({ ok: true });
}

export async function DELETE(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return json({ error: "ID kosong." }, 422);
  await deleteItem(id);
  return json({ ok: true });
}