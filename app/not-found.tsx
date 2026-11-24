import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { getI18n } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t } = await getI18n();

  return (
    <>
      <Navbar />
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow">{t("nf.eyebrow")}</p>
        <h1 className="chrome-text mt-5 font-display text-6xl sm:text-8xl">{t("nf.title")}</h1>
        <p className="mt-6 max-w-md text-sm text-white/70">{t("nf.p")}</p>
        <Button href="/" className="mt-10">{t("nf.home")}</Button>
      </main>
      <Footer />
    </>
  );
}