import { Metadata } from "next";

export function constructMetadata({
  title = "Pre-Engineered Steel Building Manufacturer",
  description = "Infinity Fabtech Pvt. Ltd. — leading manufacturer and erector of Pre-Engineered Steel Buildings in India. 500+ projects, 5.2 million sq.ft. built across India since 2008. Based in Indore, M.P.",
  image = "/images/products/peb-building.png",
  noIndex = false,
  slug = "",
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  slug?: string;
} = {}): Metadata {
  const siteUrl = "https://www.infinityfabtech.com";
  const fullUrl = slug ? `${siteUrl}/${slug}` : siteUrl;
  const siteName = "Infinity Fabtech Pvt. Ltd.";
  const finalTitle = slug ? `${title} | ${siteName}` : `${siteName} | ${title}`;

  return {
    title: finalTitle,
    description,
    keywords: [
      "Pre-Engineered Steel Buildings",
      "PEB Manufacturer India",
      "PEB Building Indore",
      "Steel Building Manufacturer Madhya Pradesh",
      "Infinity Fabtech Pvt. Ltd.",
      "Industrial Warehouse PEB",
      "Factory Steel Building India",
      "PEB Construction Indore",
      "Steel Warehouse Manufacturer",
      "Pre-Engineered Building Solutions India",
      "Industrial Shed Manufacturer Indore",
    ],
    authors: [{ name: "Infinity Fabtech Pvt. Ltd." }],
    creator: "Infinity Fabtech Pvt. Ltd.",
    publisher: "Infinity Fabtech Pvt. Ltd.",
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
      creator: "@infinityfabtech",
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
