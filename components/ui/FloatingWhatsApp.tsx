import { waLink } from "@/lib/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp LUXEN"
      className="btn-chrome fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-luxe hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.5c0 3.3 2.7 6 6 6l1-1.6-2-1-.8.8a4 4 0 01-2-2l.8-.8-1-2L9 8.5z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}