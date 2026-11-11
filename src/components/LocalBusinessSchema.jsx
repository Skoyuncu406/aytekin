
/* =========================================
   AYTEKİN OTOMASYON
   LOCAL BUSINESS STRUCTURED DATA
========================================= */

const siteUrl = "https://www.aytekinotomasyon.com";

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",

  "@id": `${siteUrl}/#business`,

  name: "Aytekin Otomasyon",

  description:
    "Aytekin Otomasyon, Gaziantep'te otomatik kapı, kepenk, panjur, tente, pergola ve modern otomasyon sistemleri alanında hizmet sunmaktadır.",

  url: siteUrl,

  telephone: "+905531304458",

  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Mavikent Mahallesi, Şahinbey Sanayi Sitesi",
    addressLocality: "Şahinbey",
    addressRegion: "Gaziantep",
    addressCountry: "TR",
  },

  areaServed: {
    "@type": "City",
    name: "Gaziantep",
  },

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Aytekin Otomasyon Hizmetleri",

    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Otomatik Kapı Sistemleri",
      },
      {
        "@type": "OfferCatalog",
        name: "Otomatik Kepenk Sistemleri",
      },
      {
        "@type": "OfferCatalog",
        name: "Panjur Sistemleri",
      },
      {
        "@type": "OfferCatalog",
        name: "Tente Sistemleri",
      },
      {
        "@type": "OfferCatalog",
        name: "Pergola Sistemleri",
      },
    ],
  },

  sameAs: [
    "https://www.instagram.com/aytekinotomasyon/",
  ],
};

export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessData).replace(
          /</g,
          "\\u003c"
        ),
      }}
    />
  );
}