export type Roof = "pitched" | "mono";

export type FeatureId =
  | "crane"
  | "mezzanine"
  | "skylight"
  | "ventilator"
  | "valley"
  | "canopy"
  | "insulation"
  | "rcc";

export type Features = Record<FeatureId, boolean>;

export const DEF_FEATURES: Features = {
  crane: false,
  mezzanine: false,
  skylight: false,
  ventilator: false,
  valley: false,
  canopy: false,
  insulation: false,
  rcc: false,
};

export const FEATURES: { id: FeatureId; label: string; color: string }[] = [
  { id: "crane", label: "EOT Crane", color: "#C026D3" },
  { id: "mezzanine", label: "Mezzanine Floor", color: "#7C3AED" },
  { id: "skylight", label: "Skylight Strips", color: "#38BDF8" },
  { id: "ventilator", label: "Ridge Ventilator", color: "#EF4444" },
  { id: "valley", label: "Valley Gutter", color: "#0369A1" },
  { id: "canopy", label: "Eave Canopy", color: "#8B5CF6" },
  { id: "insulation", label: "Roof Insulation", color: "#10B981" },
  { id: "rcc", label: "RCC Columns", color: "#78716C" },
];

export interface FrameType {
  id: string;
  name: string;
  sub: string;
  practical: string;
  width: number;
  eave: number;
  pitch: number;
  spans: 1 | 2 | 3;
  bays: number;
  baySpacing: number;
  roof: Roof;
  features: Partial<Features>;
  desc: string;
}

export const FRAME_TYPES: FrameType[] = [
  {
    id: "cs-p",
    name: "Clear Span",
    sub: "Pitched Roof",
    practical: "6m – 70m",
    width: 30,
    eave: 7,
    pitch: 10,
    spans: 1,
    bays: 5,
    baySpacing: 6,
    roof: "pitched",
    features: {},
    desc: "Single bay with no intermediate columns. Symmetric pitched roof — the most common PEB frame for warehouses, hangars and sports halls.",
  },
  {
    id: "cs-m",
    name: "Clear Span",
    sub: "Mono Slope",
    practical: "3m – 18m",
    width: 15,
    eave: 6,
    pitch: 8,
    spans: 1,
    bays: 4,
    baySpacing: 6,
    roof: "mono",
    features: {},
    desc: "Single-slope roof draining to one side. Ideal for lean-to sheds, loading dock covers and small industrial buildings.",
  },
  {
    id: "ms2-p",
    name: "Multi Span MS-2",
    sub: "Pitched Roof",
    practical: "24m – 45m",
    width: 36,
    eave: 7,
    pitch: 10,
    spans: 2,
    bays: 5,
    baySpacing: 7.5,
    roof: "pitched",
    features: {},
    desc: "Two bays with one intermediate column line. Two mirrored pitched spans — efficient for medium to large warehouses.",
  },
  {
    id: "ms2-m",
    name: "Multi Span MS-2",
    sub: "Mono Slope",
    practical: "20m – 35m",
    width: 28,
    eave: 7,
    pitch: 6,
    spans: 2,
    bays: 5,
    baySpacing: 6,
    roof: "mono",
    features: {},
    desc: "Two mono-slope bays with one intermediate column. Used for loading yards, bus terminals and large industrial sheds.",
  },
  {
    id: "ms3-p",
    name: "Multi Span MS-3",
    sub: "Pitched Roof",
    practical: "36m – 72m",
    width: 48,
    eave: 7,
    pitch: 10,
    spans: 3,
    bays: 6,
    baySpacing: 7.5,
    roof: "pitched",
    features: {},
    desc: "Three bays with two intermediate column lines. The most economical frame for very wide industrial buildings up to 72m.",
  },
  {
    id: "ms3-m",
    name: "Multi Span MS-3",
    sub: "Mono + Valley Gutter",
    practical: "24m – 60m",
    width: 42,
    eave: 7,
    pitch: 5,
    spans: 3,
    bays: 5,
    baySpacing: 7.5,
    roof: "mono",
    features: { valley: true },
    desc: "Three mono-slope bays with valley gutters at the intermediate columns. Suited to large-footprint factories and process plants.",
  },
  {
    id: "ms2-cr",
    name: "MS-2 + Crane",
    sub: "EOT Crane & Mezzanine",
    practical: "24m – 45m",
    width: 36,
    eave: 10,
    pitch: 10,
    spans: 2,
    bays: 5,
    baySpacing: 7.5,
    roof: "pitched",
    features: { crane: true, mezzanine: true },
    desc: "Heavy industrial frame: EOT crane rail on corbels in the first bay, mezzanine floor in the second. Requires vibration-rated fasteners.",
  },
  {
    id: "ss-rcc",
    name: "Single Span",
    sub: "RCC Column System",
    practical: "5m – 25m",
    width: 18,
    eave: 5.5,
    pitch: 8,
    spans: 1,
    bays: 4,
    baySpacing: 6,
    roof: "pitched",
    features: { rcc: true },
    desc: "Steel rafter system seated on reinforced-concrete columns — common for roof replacement and extensions on existing RCC structures.",
  },
];

export type PartId =
  | "column"
  | "rafter"
  | "purlin"
  | "girt"
  | "roof-sheet"
  | "cladding"
  | "bracing"
  | "base"
  | "ridge"
  | "crane"
  | "mezzanine"
  | "skylight"
  | "ventilator"
  | "valley"
  | "canopy"
  | "insulation"
  | "rcc";

export interface PartInfo {
  title: string;
  cat: "Structural Member" | "Roofing Component" | "Accessory";
  detail: string;
  products: string[];
}

export const PART_INFO: Record<PartId, PartInfo> = {
  column: {
    title: "Primary Steel Column",
    cat: "Structural Member",
    detail:
      "Tapered built-up I-section column. Transfers roof, wind and crane loads down to the foundation through the base plate.",
    products: ["Column Base Plate Bolts", "Anchor Bolts", "Structural Fasteners"],
  },
  rafter: {
    title: "Steel Rafter",
    cat: "Structural Member",
    detail:
      "Haunched built-up I-section rafter — the primary inclined member running from column top to ridge, deepest at the knee joint.",
    products: ["Haunch Bolts", "Splice Plate Fasteners", "Structural Fasteners"],
  },
  purlin: {
    title: "Z-Purlin (Secondary)",
    cat: "Structural Member",
    detail:
      "Cold-formed Z or C purlins spanning between frames, supporting the roof sheeting and transferring loads into the rafters.",
    products: ["Purlin Cleat Bolts", "Self-Drilling Screws", "Sag Rod Sets"],
  },
  girt: {
    title: "Wall Girt (Secondary)",
    cat: "Structural Member",
    detail:
      "Horizontal cold-formed members on the side and end walls that support the wall cladding against wind pressure.",
    products: ["Girt Cleat Bolts", "Self-Drilling Screws"],
  },
  "roof-sheet": {
    title: "Roof Sheeting",
    cat: "Roofing Component",
    detail:
      "Trapezoidal or standing-seam (SSR) metal panels forming the primary weatherproofing layer over the purlins.",
    products: ["Fixed SSR Clips", "Sliding SSR Clips", "Ridge Foam Closers", "Eave Foam Closers"],
  },
  cladding: {
    title: "Wall Cladding",
    cat: "Roofing Component",
    detail:
      "Profiled metal wall sheeting fixed to the girts, running from eave level down to finished floor level.",
    products: ["Wall Cladding Screws", "Base Trim Closers", "Corner Flashing Fasteners"],
  },
  bracing: {
    title: "Roof & Wall Bracing",
    cat: "Structural Member",
    detail:
      "Cross-braced rods or angles in the end bays that carry longitudinal wind loads and stabilise the frame during erection.",
    products: ["Bracing Rod Assemblies", "Turnbuckles", "Hillside Washers"],
  },
  base: {
    title: "Base Plate & Foundation",
    cat: "Structural Member",
    detail:
      "Welded base plate grouted onto the RCC pedestal and held with cast-in anchor bolts to develop the column reaction.",
    products: ["Anchor Bolts", "Levelling Nuts", "Base Plate Grout Kit"],
  },
  ridge: {
    title: "Ridge Assembly",
    cat: "Roofing Component",
    detail:
      "Apex splice plate connection plus ridge cap and foam closers that seal the crown of the pitched roof.",
    products: ["Ridge Foam Closers", "Ridge Cap Fasteners", "Apex Bolts"],
  },
  crane: {
    title: "EOT Crane & Rail",
    cat: "Accessory",
    detail:
      "Electric overhead travelling crane running on rails carried by bracket corbels welded to the columns. Vibration-rated fixings are mandatory.",
    products: ["Vibration-Rated SSR Clips", "Crane Bracket Bolts", "Anti-Vibration Fasteners"],
  },
  mezzanine: {
    title: "Mezzanine Floor",
    cat: "Accessory",
    detail:
      "Intermediate steel floor on secondary beams and joists, adding usable area inside the building envelope.",
    products: ["Mezzanine Beam Anchor Bolts", "Grating Fasteners", "Deck Screws"],
  },
  skylight: {
    title: "Skylight Strips",
    cat: "Roofing Component",
    detail:
      "Translucent polycarbonate or FRP panels laid in the same profile as the roof sheets for natural daylighting.",
    products: ["Skylight Foam Closers", "Skylight Fasteners", "Sealing Washers"],
  },
  ventilator: {
    title: "Ridge Ventilator",
    cat: "Accessory",
    detail:
      "Continuous or turbine ventilators at the ridge that exhaust hot air by stack effect without mechanical power.",
    products: ["Ridge Vent Foam Closers", "Ventilator Fasteners"],
  },
  valley: {
    title: "Valley Gutter",
    cat: "Roofing Component",
    detail:
      "Internal gutter at the junction of two roof slopes over the intermediate column line, draining to downpipes at each end.",
    products: ["Valley Gutter Brackets", "Valley Foam Closers", "Gutter Sealant Kit"],
  },
  canopy: {
    title: "Eave Canopy",
    cat: "Accessory",
    detail:
      "Cantilevered roof extension at the eave that shelters loading bays and personnel doors from rain and sun.",
    products: ["Canopy SSR Clips", "Eave Gutter Brackets", "Canopy Fasteners"],
  },
  insulation: {
    title: "Roof Insulation",
    cat: "Roofing Component",
    detail:
      "Glass-wool or PUF insulation laid between the purlins and the roof sheeting to cut heat gain and condensation.",
    products: ["Insulated Ridge Closers", "Insulation Valley Strips", "Extended Fasteners"],
  },
  rcc: {
    title: "R.C.C. Column",
    cat: "Structural Member",
    detail:
      "Reinforced concrete column supporting the steel rafter — used where an existing concrete structure is being re-roofed or extended.",
    products: ["Column Base Plate Bolts", "Chemical Anchors", "RCC Interface Fasteners"],
  },
};

export const COLORS = {
  primary: "#C62828",
  primaryDark: "#8E1414",
  secondary: "#64748B",
  roof: "#8FA6BC",
  cladding: "#DDE3EA",
  bracing: "#F59E0B",
  concrete: "#A8A29E",
  crane: "#C026D3",
  mezzanine: "#7C3AED",
  skylight: "#7DD3FC",
  vent: "#EF4444",
  valley: "#0369A1",
  canopy: "#8B5CF6",
  insulation: "#10B981",
};

export interface Config {
  width: number;
  eave: number;
  pitch: number;
  spans: 1 | 2 | 3;
  bays: number;
  baySpacing: number;
  roof: Roof;
  features: Features;
}

export type Pt = [number, number];

export interface Geometry {
  width: number;
  length: number;
  eave: number;
  spanWidth: number;
  columnXs: number[];
  /** Top-of-column point for each column line (cross-section). */
  columnTops: Pt[];
  /** Rafter segments as [start, end] pairs in the cross-section plane. */
  rafters: [Pt, Pt][];
  /** Apex points for pitched roofs. */
  apexes: Pt[];
  /** Full frame outline used to extrude gable end walls. */
  profile: Pt[];
  frameZs: number[];
  ridgeHeight: number;
  maxHeight: number;
}

export function computeGeometry(c: Config): Geometry {
  const { width, eave, pitch, spans, roof } = c;
  const length = c.bays * c.baySpacing;
  const half = width / 2;
  const spanWidth = width / spans;
  const rad = (pitch * Math.PI) / 180;
  const columnXs = Array.from({ length: spans + 1 }, (_, i) => -half + spanWidth * i);

  const columnTops: Pt[] =
    roof === "pitched"
      ? columnXs.map((x) => [x, eave] as Pt)
      : columnXs.map((x, i) => [x, eave + spanWidth * Math.tan(rad) * (spans - i)] as Pt);

  const rafters: [Pt, Pt][] = [];
  const apexes: Pt[] = [];
  for (let i = 0; i < spans; i++) {
    const a = columnTops[i];
    const b = columnTops[i + 1];
    if (roof === "pitched") {
      const apex: Pt = [(a[0] + b[0]) / 2, eave + (spanWidth / 2) * Math.tan(rad)];
      apexes.push(apex);
      rafters.push([a, apex], [apex, b]);
    } else {
      rafters.push([a, b]);
    }
  }

  const profile: Pt[] = [[columnXs[0], 0]];
  profile.push(columnTops[0]);
  rafters.forEach(([, end]) => profile.push(end));
  profile.push([columnXs[spans], 0]);

  const frameZs = Array.from(
    { length: c.bays + 1 },
    (_, i) => -length / 2 + c.baySpacing * i
  );

  const maxHeight = Math.max(...profile.map((p) => p[1]));
  const ridgeHeight =
    roof === "pitched" ? (spanWidth / 2) * Math.tan(rad) : width * Math.tan(rad);

  return {
    width,
    length,
    eave,
    spanWidth,
    columnXs,
    columnTops,
    rafters,
    apexes,
    profile,
    frameZs,
    ridgeHeight: +ridgeHeight.toFixed(1),
    maxHeight,
  };
}

/** Evenly spaced points along a cross-section segment, excluding both ends. */
export function along(a: Pt, b: Pt, spacing: number): Pt[] {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const n = Math.max(1, Math.round(len / spacing));
  const out: Pt[] = [];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  return out;
}

export function productsFor(c: Config): string[] {
  const base =
    c.roof === "pitched"
      ? ["Fixed SSR Clips", "Sliding SSR Clips", "Ridge Foam Closers", "Eave Foam Closers"]
      : ["Sliding SSR Clips", "Eave Foam Closers", "Hip Closers"];
  if (c.spans > 1 && c.roof === "pitched") base.push("Valley Foam Closers");
  base.push("Purlin Cleat Bolts", "Structural Fasteners", "Self-Drilling Screws");
  FEATURES.forEach((f) => {
    if (c.features[f.id]) base.push(...PART_INFO[f.id as PartId].products);
  });
  return Array.from(new Set(base));
}
