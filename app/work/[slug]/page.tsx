import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyTemplate from "../../components/case-study/CaseStudyTemplate";
import { caseStudySlugs, getCaseStudy } from "../../data/case-studies";
import "./case-study.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};

  return {
    title: `${project.title} — UX Case Study · Aamir Khan`,
    description: project.proposition,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();
  return <CaseStudyTemplate project={project} />;
}
