import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "structural-design-engineering",
    title: "Structural Detailing & Design",
    description: "Advanced engineering & detailing for high-efficiency PEB and structural steel frames complying with global design standards.",
    iconName: "Compass",
    benefits: [
      "SAP2000, STAAD.Pro & Tekla detailing",
      "Strict conformance to international structural building codes",
      "3D detailing for accurate fabrication",
      "Value engineering to optimize total steel weight"
    ]
  },
  {
    id: "precision-fabrication",
    title: "Advanced Factory Fabrication",
    description: "High-capacity automated fabrication using plasma cutting, H-beam assembly, and certified deep-penetration SAW welding lines.",
    iconName: "CheckSquare",
    benefits: [
      "Sub-millimeter fabrication tolerances",
      "Certified SAW welding for uniform joints",
      "Shot blasting to Sa 2.5 profile standard",
      "Corrosion-resistant epoxy or HDG coatings"
    ]
  },
  {
    id: "fast-track-logistics",
    title: "Sequenced Shipping & Logistics",
    description: "Chronologically sequenced packaging and shipping routed to deliver fabricated steel structures ready for immediate on-site bolted erection.",
    iconName: "Truck",
    benefits: [
      "Export-grade packaging to protect coatings",
      "Site-sequenced loading schedules",
      "Full packing lists and clear part markings",
      "Seamless multi-modal customs coordination"
    ]
  },
  {
    id: "erection-supervision",
    title: "Site Support & Erection Advisory",
    description: "Direct technical guidance and site advisors for assembly, alignment, connection torque audits, and standing seam roof installation.",
    iconName: "Wrench",
    benefits: [
      "On-site guidance for general contractors",
      "Rigging plans and alignment verification",
      "Double-lock seaming equipment and training",
      "Final torque connection audits before signoff"
    ]
  },
  {
    id: "custom-components",
    title: "Custom Steel Accessories",
    description: "Roll-formed panels, custom flashings, gutters, and structural accessories tailored for custom architectural and cladding needs.",
    iconName: "Building2",
    benefits: [
      "Custom components (sag rods, deck hangers)",
      "Standard and custom roll-formed profiles",
      "Fittings and gutters up to 6.0m length",
      "Rapid turnaround on custom fabrication tooling"
    ]
  }
];

export const servicesPageContent = {
  hero: {
    badge: "Our Offerings",
    title: "Consultation, Supply & Support Services",
    description: "From design blueprints to double-lock standing seam seaming training, we provide end-to-end support for your roofing teams."
  },
  callout: {
    title: "Need Site Erection Training Support?",
    description: "Our technical assistance teams are available to travel to major construction sites in India and the MEA region to train local crews on correct fastening torque values and profile overlaps.",
    buttonLabel: "Request On-Site Assistance"
  }
};
