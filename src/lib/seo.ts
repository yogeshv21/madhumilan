import { Product } from "@/types/product";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Madhu Ratna Industry",
    "url": "https://www.madhuratna.com",
    "logo": "https://www.madhuratna.com/logo.png",
    "description": "Premium manufacturer of standing seam roofing clips, foam closer strips, and industrial roofing fasteners.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Survey No. 452/B, Industrial Zone, G.I.D.C.",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382430",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "contactType": "sales",
      "areaServed": "Global",
      "availableLanguage": ["English", "Hindi", "Gujarati"]
    }
  };
}

export function getProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://www.madhuratna.com${product.image}`,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": "Madhu Ratna Industry"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "price": "Call for Quote",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Madhu Ratna Industry"
      }
    }
  };
}

export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Madhu Ratna Industry",
    "description": "Get in touch with Madhu Ratna Industry for corporate sales inquiries, custom product manufacturing, and technical roofing assistance.",
    "url": "https://www.madhuratna.com/contact"
  };
}
