import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "auto-warehouse-hub",
    name: "Automated Fulfillment Logistics Hub",
    location: "Pune, Maharashtra, India",
    client: "Global Logistics Corp",
    type: "Pre-Engineered Building (PEB)",
    area: "125,000 sq.ft.",
    year: "2025",
    description: "Complete design, custom fabrication, and erection support for a high-clearance automated sorting facility featuring heavy-duty secondary members and dynamic expansion-tolerant standing seam roofing.",
    highlights: [
      "125,000 sq.ft. clear-span area",
      "FM Approved double-lock standing seam roof",
      "Completed erection within 48 days from site delivery"
    ],
    scope: [
      "Tekla detailing and structural steel optimization",
      "Primary frame columns and rafters fabrication",
      "Supply of roll-formed Z-purlins and sag rods"
    ]
  },
  {
    id: "heavy-industrial-foundry",
    name: "Heavy Manufacturing Foundry & Press Shop",
    location: "Chennai, Tamil Nadu, India",
    client: "Bharat Heavy Forge",
    type: "Heavy Structural Steel",
    area: "85,000 sq.ft.",
    year: "2024",
    description: "Multi-crane industrial manufacturing shop designed to support massive dynamic process loads, using high-tensile hot-rolled built-up profiles and shot-blasted coatings.",
    highlights: [
      "Designed for twin 35-ton EOT crane operations",
      "Sa 2.5 shot-blasting surface preparation with epoxy coatings",
      "Strict compliance with AISC and local seismic load codes"
    ],
    scope: [
      "Custom welded H-beams and portal frame detailing",
      "Fabrication of crane runway girders and column assemblies",
      "High-shear bolts and structural anchor assembly supply"
    ]
  },
  {
    id: "multi-level-commercial",
    name: "Multi-Level Corporate Showroom & Office",
    location: "Riyadh, Saudi Arabia",
    client: "Al-Rashed Developments",
    type: "Commercial Steel Structure",
    area: "42,000 sq.ft.",
    year: "2025",
    description: "Aesthetic commercial hub utilizing a composite steel deck system, featuring custom painted RAL exterior flashings and noise-insulating roof systems.",
    highlights: [
      "Composite metal deck slab architecture",
      "Premium aesthetic finishes with concealed-fastener panels",
      "Intergated sound-dampening polyolefin foam closers"
    ],
    scope: [
      "Custom flashing profiles and aesthetic trim manufacturing",
      "Supply of galvanized metal deck sheets",
      "On-site alignment supervision and crew training"
    ]
  },
  {
    id: "cold-storage-facility",
    name: "Temperature-Controlled Cold Storage Plant",
    location: "Gujarat, India",
    client: "FreshFoods Logistics",
    type: "PEB / Insulated Warehouse",
    area: "60,000 sq.ft.",
    year: "2024",
    description: "High-efficiency cold storage facility designed to optimize thermal resistance, featuring specialized insulation panels, airtight closer strips, and high-tensile purlins.",
    highlights: [
      "Airtight envelope preventing thermal energy losses",
      "Pre-punched base roofing clips for accelerated installation",
      "Epoxy coated steel framing for moisture protection"
    ],
    scope: [
      "Primary framework fabrication and supply",
      "Closed-cell cross-linked polyolefin foam strips supply",
      "Site advisory on panel lap waterproofing"
    ]
  }
];

export const projectsPageContent = {
  hero: {
    badge: "Our Portfolio",
    title: "Completed Projects & Case Studies",
    description: "Showcasing our precision engineering, high-capacity fabrication, and structural execution for warehousing, industrial foundry, and commercial sites."
  },
  callout: {
    title: "Planning a Pre-Engineered Building Project?",
    description: "Get in touch with our engineering desk to review your structural drawings, optimize steel weight, and receive a competitive fabrication and supply estimate.",
    buttonLabel: "Consult Our Engineers"
  }
};
