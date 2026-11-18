import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant?: "chrome" | "outline";
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Button({
  href,
  variant = "chrome",
  external = false,
  className = "",
  children,
}: ButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 text-[13px] font-semibold tracking-wide transition-all duration-500 ease-luxe";
  const styles =
    variant === "chrome"
      ? "btn-chrome hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(180,186,196,0.25)]"
      : "border border-white/25 text-white hover:border-silver-200 hover:bg-white hover:text-ink";
  const cls = `${base} ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}