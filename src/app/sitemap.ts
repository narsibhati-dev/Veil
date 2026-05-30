import type { MetadataRoute } from "next";

const BASE = "https://veil.audoralabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,       lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${BASE}/app`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
