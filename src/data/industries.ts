import { Industry } from "@/types/industry";

export const industries: Industry[] = [
  {
    id: "industrial-buildings",
    slug: "industrial-buildings",
    name: "Heavy Industrial Buildings",
    iconName: "Factory",
    description: "Providing high-integrity framing accessories and expansion-tolerant roof clips for heavy industrial complexes exposed to interior process vibrations and hot fumes.",
    challenges: [
      "Continuous equipment vibrations causing fastener loosening",
      "Corrosive internal atmospheres containing chemicals or acidic fumes",
      "Large roof spans subjected to extreme wind suction profiles"
    ],
    solutions: [
      "High-shear stainless steel self-drilling screws with custom plating layers",
      "Locking-seam clips that eliminate skin-piercing fasteners",
      "Thick structural component plates that absorb structural vibrations"
    ],
    relevantProductSlugs: [
      "standing-seam-roofing-clips",
      "industrial-fasteners",
      "industrial-roofing-components"
    ]
  },
  {
    id: "warehouses",
    slug: "warehouses",
    name: "Warehouses & Logistics Hubs",
    iconName: "Warehouse",
    description: "Cost-optimized, weather-tight roofing components that protect billions in inventory assets from monsoons, sand, and heat.",
    challenges: [
      "Risk of water leaks over vast roof expanses damaging inventories",
      "High energy costs for temperature-sensitive storage centers",
      "Rapid construction schedules requiring simplified fitting components"
    ],
    solutions: [
      "EPDM foam closer profiles offering absolute airtight water boundaries",
      "Pre-punched base roofing clips that speed up installation by 25%",
      "Ridge cap flashings that handle heavy rain volume discharges"
    ],
    relevantProductSlugs: [
      "foam-closer-strips",
      "standing-seam-roofing-clips",
      "roofing-accessories"
    ]
  },
  {
    id: "commercial-buildings",
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    iconName: "Building2",
    description: "Premium finish aesthetic profiles, clean flashings, and noise-damping closer strips suitable for offices, showrooms, and retail developments.",
    challenges: [
      "Aesthetic trim lines requiring premium paint matching and zero rust lines",
      "Rain impact noise transfer inside showrooms and commercial spaces",
      "Integration of skylights, PV solar arrays, and complex roof equipment"
    ],
    solutions: [
      "Custom painted RAL polyester flashings matching corporate styling",
      "Sound-dampening polyolefin foam closers that block exterior noises",
      "Solar bracket adapters fitting standing seam ribs without piercing"
    ],
    relevantProductSlugs: [
      "roofing-accessories",
      "foam-closer-strips",
      "standing-seam-roofing-clips"
    ]
  },
  {
    id: "manufacturing-plants",
    slug: "manufacturing-plants",
    name: "Manufacturing Plants",
    iconName: "Cpu",
    description: "Extremely robust fasteners and heavy clips that ensure structural reliability and safety in processing environments.",
    challenges: [
      "Exposure to aggressive thermal cycles (kilns, metal melting, cooling)",
      "Dust and moisture build-ups at panel laps causing premature corrosion",
      "Rigid fire safety regulations demanding fire-retardant filler foams"
    ],
    solutions: [
      "Thermally-flexible sliding clips with high range movement",
      "Class-4 self-drilling fasteners resisting galvanic corrosion",
      "Closed-cell cross-linked polyolefin foam that does not harbor dust"
    ],
    relevantProductSlugs: [
      "standing-seam-roofing-clips",
      "industrial-fasteners",
      "foam-closer-strips"
    ]
  },
  {
    id: "peb-structures",
    slug: "peb-structures",
    name: "Pre-Engineered Buildings (PEB)",
    iconName: "Layout",
    description: "Complete fastener and clip integration for metal building systems, working in perfect synchronization with standard structural components.",
    challenges: [
      "Strict structural calculations requiring certified shear and tensile values",
      "Wide purlin spacings requiring heavy-gauge roofing clips",
      "Tensioning loads on secondary structural members"
    ],
    solutions: [
      "Certified 2.0mm thick heavy-gauge SSR Clips",
      "Custom sag rods and flange braces built to PEB blueprint load specifications",
      "Pre-drilled heavy brackets for quick framing integration"
    ],
    relevantProductSlugs: [
      "standing-seam-roofing-clips",
      "industrial-roofing-components",
      "industrial-fasteners"
    ]
  }
];
