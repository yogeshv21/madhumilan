import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "structural-design-engineering",
    title: "Structural Design & Engineering Desk",
    description: "End-to-end design, load calculations, and Tekla detailing for high-efficiency PEB and structural steel frames complying with global codes.",
    iconName: "Compass",
    benefits: [
      "Custom optimization using SAP2000, STAAD.Pro, and Tekla Structures",
      "Full compliance with wind velocity maps, seismic zone regulations, and snow load requirements",
      "Drafting and 3D detailing for perfect fitment of columns, rafters, and connection bolts",
      "Value engineering to reduce total steel weight and overall foundation costs"
    ]
  },
  {
    id: "precision-fabrication",
    title: "Precision Workshop Fabrication",
    description: "High-capacity factory fabrication using automated multi-torch plasma cut, automatic H-beam assembly, and certified SAW welding lines.",
    iconName: "CheckSquare",
    benefits: [
      "Strict quality control with sub-millimeter tolerances on heavy members",
      "Automatic SAW welding producing high-strength, uniform, deep-penetration weld joints",
      "Surface preparation using automated shot blasting to Sa 2.5 profile standards",
      "Multi-coat epoxy paint or Hot-Dip Galvanizing (HDG) matching environmental corrosivity"
    ]
  },
  {
    id: "fast-track-logistics",
    title: "Fast-Track Logistics & Shipping",
    description: "Structured packing and sequenced shipping routes, delivering fabricated steel structures directly to site, ready for immediate bolted erection.",
    iconName: "Truck",
    benefits: [
      "Secured, export-quality container packing to prevent coating scratches",
      "Sequenced loading matching the exact chronological steps of the construction site",
      "Comprehensive packing lists and part markers for rapid on-site sorting",
      "Handling of custom customs clearing and multi-modal transit coordination"
    ]
  },
  {
    id: "erection-supervision",
    title: "Site Supervision & Erection Support",
    description: "Expert technical guidance and site advisors during structural assembly, alignment, and double-lock roof seaming.",
    iconName: "Wrench",
    benefits: [
      "On-site project support and training for general contractor erection crews",
      "Rigging guides and alignment checks to ensure structural load share balance",
      "Double-lock standing seam roof seamer tools supply and on-site operation training",
      "Final connection inspections and bolt torque audits prior to handover"
    ]
  },
  {
    id: "custom-components",
    title: "Custom Accessories & Component Fabrication",
    description: "High-volume stampings, sheet roll-form, and custom brackets matching pre-fabricated structures and custom cladding needs.",
    iconName: "Building2",
    benefits: [
      "Fast production of sag rods, flange braces, deck hangers, and custom brackets",
      "Roll-forming for standard and customized trapezoidal profile panels",
      "Corrosion-resistant custom flashing bends and gutters up to 6.0 meters length",
      "Rapid prototyping with custom design-to-metal tooling in under 7 days"
    ]
  }
];
