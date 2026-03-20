import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Index() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <About />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </>
  );
}
