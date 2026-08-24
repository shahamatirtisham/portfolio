import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const title = "Md Shahamat Irtisham | CSE Portfolio";
  const description = "A playful, top-down pixel portfolio featuring Irtisham's projects, achievements, skills, and interests in cybersecurity and machine learning.";

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image, width: 1808, height: 871, alt: "Md Shahamat Irtisham's pixel portfolio town" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
