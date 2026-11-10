import { Italiana, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Aytekin Otomasyon | Modern Otomasyon Sistemleri",
  description:
    "Aytekin Otomasyon; otomatik kapı, kepenk, panjur, pergola ve modern otomasyon sistemleriyle yaşam alanlarınıza değer katar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${italiana.variable} ${outfit.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
