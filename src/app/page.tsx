import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Subjects from "@/components/Subjects";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import InscricaoForm from "@/components/InscricaoForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Subjects />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <InscricaoForm />
      </main>
      <Footer />
    </>
  );
}
