import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyLuxen from "@/components/WhyLuxen";
import Services from "@/components/Services";
import CollectionTiers from "@/components/CollectionTiers";
import HomeService from "@/components/HomeService";
import BookCta from "@/components/BookCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyLuxen />
        <Services />
        <CollectionTiers />
        <HomeService />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}