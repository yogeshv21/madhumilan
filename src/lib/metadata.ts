import { Metadata } from "next";

export function constructMetadata({
  title = "Precision Roofing SSR Clips & Foam Closers",
  description = "Premium manufacturer and supplier of standing seam clips, foam closer strips, fasteners, and PEB roofing components. Certified premium quality.",
  image = "/images/products/ssr-clips.png",
  noIndex = false,
  slug = "",
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  slug?: string;
} = {}): Metadata {
  const siteUrl = "https://www.madhuratna.com";
  const fullUrl = slug ? `${siteUrl}/${slug}` : siteUrl;
  const siteName = "Madhu Ratna Industry";
  const finalTitle = slug ? `${title} | ${siteName}` : `${siteName} | ${title}`;

  return {
    title: finalTitle,
    description,
    keywords: [
      "Standing Seam Clips",
      "SSR Clips",
      "Foam Closer Strips",
      "EPDM Foam Closers",
      "Roofing Accessories",
      "Industrial Fasteners",
      "PEB Roofing Components",
      "Roofing Sheet Clips Gujarat",
      "Madhu Ratna Industry Ahmedabad",
      "Metal Roofing Fasteners India",
    ],
    authors: [{ name: "Madhu Ratna Industry" }],
    creator: "Madhu Ratna Industry",
    publisher: "Madhu Ratna Industry",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: finalTitle,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: [image],
      creator: "@madhuratnaind",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}
