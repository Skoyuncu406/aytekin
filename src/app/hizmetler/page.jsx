
import { Suspense } from "react";
import ServicesPage from "@/components/ServicesPage";

export const metadata = {
  title: "Hizmetlerimiz | Aytekin Otomasyon",
  description:
    "Aytekin Otomasyon kapı, kepenk, panjur, tente, pergola ve modern otomasyon sistemleri çözümlerini keşfedin.",
};

export default function HizmetlerPage() {
  return (
    <Suspense fallback={null}>
      <ServicesPage />
    </Suspense>
  );
}
