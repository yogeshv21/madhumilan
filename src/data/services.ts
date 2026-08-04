import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "structural-design-engineering",
    title: "Structural Design & Engineering",
    description:
      "Full structural engineering for Pre-Engineered Steel Buildings using specialised 3D wireframe analysis software. We convert complex conventional steel building designs into simpler, economical, and optimised PEB solutions — without sacrificing utility or function.",
    iconName: "Compass",
    benefits: [
      "3D wireframe structural analysis and computerised engineering design",
      "Custom developed analysis complying with MBMA, AISC, AISI, IS-800, IS-875, IS-1893",
      "Value engineering to optimise steel weight and reduce foundation costs",
      "Detailed fabrication drawings and erection GA sheets for seamless production",
    ],
  },
  {
    id: "precision-fabrication",
    title: "Factory Fabrication",
    description:
      "High-capacity automated fabrication in our 65,000 sq.ft. plant at Indore using CNC plasma cutting, sub-arc H-beam welding, C & Z purlin forming lines, sheeting machines, and curve profile machines — with sophisticated nesting software for maximum accuracy and minimal wastage.",
    iconName: "CheckSquare",
    benefits: [
      "CNC plasma profile cutting for precise sub-millimetre fabrication",
      "Sub-arc continuous H-beam welding station for certified weld quality",
      "Shot blasting to SA-2.5 standards and airless spray primer + epoxy finish",
      "Separate two assembly and production lines with 10+ fitting stations",
    ],
  },
  {
    id: "fast-track-logistics",
    title: "Site-Sequenced Dispatch & Logistics",
    description:
      "All fabricated PEB members are clearly marked and dispatched in site erection sequence — enabling the erection team to directly bolt together the structure without sorting delays. Export-grade packaging protects coatings during transit.",
    iconName: "Truck",
    benefits: [
      "Site-sequenced loading ensuring members arrive in erection order",
      "Clear part markings and comprehensive packing lists with every dispatch",
      "Pan-India delivery network covering all major industrial zones",
      "Coordinated multi-truck dispatch for large building projects",
    ],
  },
  {
    id: "erection-supervision",
    title: "Erection Advisory & Site Support",
    description:
      "Infinity Fabtech provides direct technical guidance and site advisory for assembly, column alignment, connection torque audits, and roofing installation. Our team supports general contractors to ensure safe, correct, and fast erection of the PEB structure.",
    iconName: "Wrench",
    benefits: [
      "On-site guidance for general contractors and local erection crews",
      "Column alignment verification and anchor bolt checking",
      "Connection torque audits before structural sign-off",
      "Roofing, cladding, and gutter installation advisory",
    ],
  },
  {
    id: "custom-building-components",
    title: "Custom PEB Components & Accessories",
    description:
      "Beyond the primary frame, Infinity Fabtech supplies all secondary and accessory components — C & Z purlins, girts, sag rods, bracing systems, ridge and eave gutters, turbo vents, skylights, mezzanine systems, and framed windows and doors.",
    iconName: "Building2",
    benefits: [
      "Complete PEB component supply: purlins, girts, bracing, and sag rods",
      "Ridge vents, turbo vents, and skylight systems",
      "Mezzanine floor systems and gantry girder and rails",
      "Framed windows and doors, canopies, and anchor bolt sets",
    ],
  },
];

export const servicesPageContent = {
  hero: {
    badge: "Our Services",
    title: "End-to-End PEB Building Services",
    description:
      "From structural engineering and factory fabrication to pan-India logistics and erection advisory — Infinity Fabtech delivers complete Pre-Engineered Steel Buildings under single-source responsibility.",
  },
  callout: {
    title: "Need a Complete Building Solution?",
    description:
      "Our engineering and sales desk is available to discuss your project requirements, review site conditions, and propose the most cost-effective PEB solution for your needs.",
    buttonLabel: "Talk to Our Engineers",
  },
};
