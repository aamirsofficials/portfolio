import type { MetadataRoute } from "next";
import { caseStudySlugs } from "./data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "/", priority: 1 },
    { url: "/for-hirer", priority: 0.8 },
    { url: "/resume", priority: 0.7 },
    ...caseStudySlugs.map(slug => ({ url: `/work/${slug}`, priority: 0.8 })),
  ];
}
