import { checkText } from "@/lib/moderation";
import {
  clientIp, countItems, listItems, rateLimit, saveItem, storeEnabled, type FaqItem,
} from "@/lib/faq-store";

const headers = { "Cache-Control": "no-store" };
const json = (body: unknown, status = 200) => Response.json(body, { status, headers });

// Public: only ANSWERED items are ever returned.
export async function GET() {
  if (!storeEnabled()) return json({ items: [] });
  try {
    const items = (await listItems())
      .filter((i) => i.status === "answered" && i.answer)
      .sort((a, b) => (b.answeredAt ?? 0) - (a.answeredAt ?? 0))
      .slice(0, 50)
      .map((i) => ({
        id: i.id,
        name: i.name,
        question: i.question,
        answer: i.answer,
        answeredAt: i.answeredAt,
      }));
    return json({ items });
  } catch {
    return json({ error: "generic" }, 500);
  }
}

// Public: submit a question (stored as "pending", never shown until answered).
export async function POST(request: Request) {
  if (!storeEnabled()) return json({ error: "disabled" }, 503);

  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed === "object" && parsed !== null) body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "generic" }, 400);
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") return json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 40) : "";
  const question = typeof body.question === "string" ? body.question.trim() : "";

  if (question.length < 10 || question.length > 300) return json({ error: "length" }, 422);

  for (const text of [name, question]) {
    if (!text) continue;
    const verdict = checkText(text);
    if (!verdict.ok) return json({ error: verdict.reason }, 422);
  }

  try {
    const allowed = await rateLimit(`luxen:rl:ask:${clientIp(request)}`, 3, 3600);
    if (!allowed) return json({ error: "rate" }, 429);
    if ((await countItems()) >= 1000) return json({ error: "rate" }, 429);

    const item: FaqItem = {
      id: crypto.randomUUID(),
      name,
      question,
      answer: null,
      status: "pending",
      createdAt: Date.now(),
      answeredAt: null,
    };
    await saveItem(item);
    return json({ ok: true });
  } catch {
    return json({ error: "generic" }, 500);
  }
}