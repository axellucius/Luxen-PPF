// Tiny Upstash Redis REST client (no dependency). Works with Vercel's Upstash integration.

export type FaqItem = {
  id: string;
  name: string;
  question: string;
  answer: string | null;
  status: "pending" | "answered";
  createdAt: number;
  answeredAt: number | null;
};

const HASH = "luxen:faq";

function conf() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export const storeEnabled = () => conf() !== null;

async function cmd<T>(command: (string | number)[]): Promise<T> {
  const c = conf();
  if (!c) throw new Error("store-disabled");
  const res = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const data = (await res.json()) as { result: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result;
}

export async function listItems(): Promise<FaqItem[]> {
  const raw = await cmd<string[] | Record<string, string>>(["HGETALL", HASH]);
  const values = Array.isArray(raw) ? raw.filter((_, i) => i % 2 === 1) : Object.values(raw);
  const items: FaqItem[] = [];
  for (const v of values) {
    try {
      items.push(JSON.parse(v) as FaqItem);
    } catch {
      /* skip corrupt entry */
    }
  }
  return items;
}

export async function getItem(id: string): Promise<FaqItem | null> {
  const v = await cmd<string | null>(["HGET", HASH, id]);
  return v ? (JSON.parse(v) as FaqItem) : null;
}

export async function saveItem(item: FaqItem) {
  await cmd(["HSET", HASH, item.id, JSON.stringify(item)]);
}

export async function deleteItem(id: string) {
  await cmd(["HDEL", HASH, id]);
}

export async function countItems() {
  return cmd<number>(["HLEN", HASH]);
}

/** Returns true if the action is still within the limit. */
export async function rateLimit(key: string, limit: number, windowSec: number) {
  const n = await cmd<number>(["INCR", key]);
  if (n === 1) await cmd(["EXPIRE", key, windowSec]);
  return n <= limit;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}