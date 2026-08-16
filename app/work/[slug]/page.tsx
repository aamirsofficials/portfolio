import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import CarRentalCaseStudy from "../../components/case-study/CarRentalCaseStudy";
import CaseStudyTemplate from "../../components/case-study/CaseStudyTemplate";
import { caseStudySlugs, getCaseStudy } from "../../data/case-studies";
import "./case-study.css";
import "./car-rental-case-study.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "aamir-khan.design";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const heroUrl = new URL(project.hero.src, `${protocol}://${host}`).toString();
  const title = `${project.title} — UX Case Study · Aamir Khan`;

  return {
    title,
    description: project.proposition,
    openGraph: {
      type: "article",
      title,
      description: project.proposition,
      images: [{ url: heroUrl, alt: project.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.proposition,
      images: [heroUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();
  if (slug === "car-rental") return <CarRentalCaseStudy />;
  return <CaseStudyTemplate project={project} />;
}
