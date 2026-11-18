import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyLuxen from "@/components/WhyLuxen";
import Services from "@/components/Services";
import CollectionTiers from "@/components/CollectionTiers";
import Results from "@/components/Results";
import HomeService from "@/components/HomeService";
import FAQ from "@/components/FAQ";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <WhyLuxen />
        <Services />
        <CollectionTiers />
        <Results />
        <HomeService />
        <FAQ />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}