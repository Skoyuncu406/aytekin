const siteUrl = "https://www.aytekinotomasyon.com";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/hizmetler`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/galeri`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
