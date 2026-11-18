const ITEMS = [
  "Self-Healing",
  "Anti-Yellowing",
  "Showroom Standard",
  "Precision Installation",
  "Home Service",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-display text-2xl italic text-silver-300 sm:text-3xl">
            {item}
          </span>
          <span className="h-1 w-1 rotate-45 bg-silver-500" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-surface py-6">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}