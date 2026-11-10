import Corporate from "@/components/Corporate";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-clip">
      <Hero />
      <Corporate />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
