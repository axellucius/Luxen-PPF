import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="chrome-text mt-5 font-display text-6xl sm:text-8xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/70">
          Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <Button href="/" className="mt-10">
          Kembali ke Beranda
        </Button>
      </main>
      <Footer />
    </>
  );
}