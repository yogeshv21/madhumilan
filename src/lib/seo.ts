import { Product } from "@/types/product";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Infinity Fabtech Pvt. Ltd.",
    "url": "https://www.infinityfabtech.com",
    "logo": "https://www.infinityfabtech.com/logo.png",
    "description": "Pre-Engineered Steel Building manufacturer based in Indore, M.P. — delivering custom-designed PEB structures for industrial, commercial, and institutional clients across India since 2008.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Survey No. 53/1/2, Bajrang Palia, Ujjain Road",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452010",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9993025599",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-7024145599",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ]
  };
}

export function getProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://www.infinityfabtech.com${product.image}`,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": "Infinity Fabtech Pvt. Ltd."
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "price": "Call for Quote",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Infinity Fabtech Pvt. Ltd."
      }
    }
  };
}

export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Infinity Fabtech Pvt. Ltd.",
    "description": "Get in touch with Infinity Fabtech Pvt. Ltd. for Pre-Engineered Steel Building projects, quotations, and engineering consultations.",
    "url": "https://www.infinityfabtech.com/contact"
  };
}
