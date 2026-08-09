import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "aamir-khan.design";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Aamir Khan — Lead Product Designer",
    description: "Aamir Khan is a Lead Product Designer with 15+ years of experience designing digital products, AI-powered platforms, SaaS experiences and scalable design systems.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      title: "Aamir Khan — Lead Product Designer",
      description: "15+ years designing thoughtful digital products, platforms and experiences.",
      images: [{ url: "/og.png", width: 1734, height: 907, alt: "Aamir Khan, Lead Product Designer" }],
    },
    twitter: { card: "summary_large_image", title: "Aamir Khan — Lead Product Designer", description: "15+ years designing thoughtful digital products, platforms and experiences.", images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
