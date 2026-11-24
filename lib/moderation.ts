// Works in the browser (instant feedback) and on the server (authoritative).

export type ModerationReason = "profanity" | "link" | "contact" | "spam";
export type ModerationResult = { ok: true } | { ok: false; reason: ModerationReason };

// Indonesian + English. Add words here anytime (lowercase, letters only).
const WORDS = [
  // Indonesian
  "anjing", "anjg", "anying", "babi", "bangsat", "bajingan", "brengsek", "keparat", "bedebah",
  "kontol", "kntl", "memek", "ngentot", "ngewe", "jancok", "jancuk", "asu", "tolol", "goblok",
  "goblog", "bodoh", "idiot", "dungu", "sialan", "kampret", "pantek", "pukimak", "cibai", "kimak",
  "puki", "tai", "taik", "peler", "pepek", "coli", "colmek", "bokep", "lonte", "jalang",
  "pelacur", "perek", "sundal", "bego",
  // English
  "fuck", "fuk", "shit", "bitch", "asshole", "bastard", "dick", "dickhead", "cunt", "pussy",
  "motherfucker", "slut", "whore", "nigger", "nigga", "retard", "faggot",
];

const LEET: Record<string, string> = {
  "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s", "!": "i",
};

const collapse = (s: string) => s.replace(/(.)\1+/g, "$1");
const BAD = new Set(WORDS.map(collapse));
const BAD_LONG = [...BAD].filter((w) => w.length >= 6);
const SUFFIXES = new Set(["nya", "ku", "mu", "lah", "kah", "an", "in", "s", "ing", "er", "ed"]);

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[013457@$!]/g, (c) => LEET[c] ?? c);
}

function hasProfanity(text: string) {
  const norm = normalize(text);

  // 1) token match (handles short words and common suffixes without false positives)
  const tokens = norm.split(/[^a-z]+/).filter(Boolean).map(collapse);
  for (const tok of tokens) {
    if (BAD.has(tok)) return true;
    for (const w of BAD) {
      if (w.length >= 4 && tok.startsWith(w) && SUFFIXES.has(tok.slice(w.length))) return true;
    }
  }

  // 2) squashed match catches "a n j i n g" / "a.n.j.i.n.g" for longer words
  const squashed = collapse(norm.replace(/[^a-z]/g, ""));
  return BAD_LONG.some((w) => squashed.includes(w));
}

const URL_RE = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|id|net|org|co|io|xyz|me|link|ly)\b)/i;
const EMAIL_RE = /\S+@\S+\.\S+/;
const PHONE_RE = /(?:\+?62|\b0)\s?8\d{1,2}[\s.-]?\d{3,4}[\s.-]?\d{3,5}/;

export function checkText(
  text: string,
  opts: { allowContact?: boolean } = {}
): ModerationResult {
  if (hasProfanity(text)) return { ok: false, reason: "profanity" };
  if (/(.)\1{9,}/.test(text)) return { ok: false, reason: "spam" };
  if (!opts.allowContact) {
    if (URL_RE.test(text)) return { ok: false, reason: "link" };
    if (EMAIL_RE.test(text) || PHONE_RE.test(text)) return { ok: false, reason: "contact" };
  }
  return { ok: true };
}