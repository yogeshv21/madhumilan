"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Box, Crosshair, Layers, Maximize2, Minimize2, Minus, Plus, RotateCw, Ruler } from "lucide-react";
import {
  COLORS,
  DEF_FEATURES,
  FEATURES,
  FRAME_TYPES,
  PART_INFO,
  computeGeometry,
  productsFor,
  type Config,
  type FeatureId,
  type Features,
  type FrameType,
  type PartId,
  type Roof,
} from "./frames";
import FrameThumb from "./FrameThumb";
import type { ViewMode } from "./BuildingModel";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-orange" />
        <span className="text-xs font-semibold text-slate-400">Loading 3D model…</span>
      </div>
    </div>
  ),
});

type FsElement = HTMLDivElement & { webkitRequestFullscreen?: () => void };
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
};

const VIEW_MODES: { id: ViewMode; label: string }[] = [
  { id: "solid", label: "Solid" },
  { id: "xray", label: "X-Ray" },
  { id: "frame", label: "Frame Only" },
  { id: "wire", label: "Wireframe" },
];

const LEGEND: [string, string][] = [
  [COLORS.primary, "Primary Steel"],
  [COLORS.secondary, "Purlins & Girts"],
  [COLORS.bracing, "Bracing"],
  [COLORS.roof, "Roof Sheeting"],
  [COLORS.cladding, "Wall Cladding"],
];

export default function FrameExplorer3D({ showHeader = true }: { showHeader?: boolean }) {
  const [typeId, setTypeId] = useState(FRAME_TYPES[0].id);
  const type = FRAME_TYPES.find((t) => t.id === typeId)!;
  const [width, setWidth] = useState(type.width);
  const [eave, setEave] = useState(type.eave);
  const [pitch, setPitch] = useState(type.pitch);
  const [spans, setSpans] = useState<1 | 2 | 3>(type.spans);
  const [bays, setBays] = useState(type.bays);
  const [roof, setRoof] = useState<Roof>(type.roof);
  const [features, setFeatures] = useState<Features>({ ...DEF_FEATURES, ...type.features });

  const [mode, setMode] = useState<ViewMode>("xray");
  const [explode, setExplode] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showDims, setShowDims] = useState(true);
  const [selected, setSelected] = useState<PartId | null>(null);
  const [resetKey, setResetKey] = useState("cs-p-0");

  const holder = useRef<HTMLDivElement>(null);
  const inView = useInView(holder, { once: true, margin: "300px" });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsSupported, setFsSupported] = useState(true);

  useEffect(() => {
    const el = holder.current as FsElement | null;
    setFsSupported(
      Boolean(document.fullscreenEnabled ?? true) &&
        Boolean(el?.requestFullscreen || el?.webkitRequestFullscreen)
    );
    const sync = () => {
      const doc = document as FsDocument;
      const active = Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement);
      setIsFullscreen(active);
      // Re-fit the camera to the new viewport shape.
      setResetKey(`fs-${active}-${Date.now()}`);
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const doc = document as FsDocument;
    const el = holder.current as FsElement | null;
    if (doc.fullscreenElement ?? doc.webkitFullscreenElement) {
      (doc.exitFullscreen ?? doc.webkitExitFullscreen)?.call(document);
    } else if (el) {
      (el.requestFullscreen ?? el.webkitRequestFullscreen)?.call(el);
    }
  }, []);

  const config: Config = useMemo(
    () => ({
      width,
      eave,
      pitch,
      spans,
      bays,
      baySpacing: type.baySpacing,
      roof,
      features,
    }),
    [width, eave, pitch, spans, bays, type.baySpacing, roof, features]
  );
  const geo = useMemo(() => computeGeometry(config), [config]);

  const applyType = (t: FrameType) => {
    setTypeId(t.id);
    setWidth(t.width);
    setEave(t.eave);
    setPitch(t.pitch);
    setSpans(t.spans);
    setBays(t.bays);
    setRoof(t.roof);
    setFeatures({ ...DEF_FEATURES, ...t.features });
    setSelected(null);
    setExplode(0);
    setResetKey(`${t.id}-${Date.now()}`);
  };

  const toggleFeature = (id: FeatureId) =>
    setFeatures((f) =>
      id === "crane" && !f.crane ? { ...f, crane: true, mezzanine: true } : { ...f, [id]: !f[id] }
    );

  const info = selected ? PART_INFO[selected] : null;
  const activeFeatures = FEATURES.filter((f) => features[f.id]);
  const pitchRatio = `1:${Math.round(1 / Math.tan((pitch * Math.PI) / 180))}`;

  return (
    <section className={showHeader ? "bg-brand-dark py-20" : "bg-brand-dark pb-16 pt-10"} id="peb-3d-models">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="mb-9 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-1.5 text-sm font-semibold text-orange-300"
            >
              <Box size={15} /> Interactive 3D Models
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-3 text-3xl font-bold text-white sm:text-4xl"
            >
              All 8 PEB Frame Types — In 3D
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-slate-400"
            >
              Orbit, zoom and explode the full building model. Switch between solid, x-ray and
              frame-only views, then click any member to see the Infinity Fabtech products it needs.
            </motion.p>
          </div>
        )}

        {/* Frame type selector */}
        <div className="mb-6">
          <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Select Frame Type
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {FRAME_TYPES.map((t) => {
              const on = t.id === typeId;
              return (
                <motion.button
                  key={t.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => applyType(t)}
                  className={`overflow-hidden rounded-xl border-2 text-left transition-all duration-200 ${
                    on
                      ? "border-brand-orange bg-white shadow-lg shadow-brand-orange/20"
                      : "border-white/10 bg-white/5 hover:border-white/25"
                  }`}
                >
                  <div className={on ? "bg-white" : "bg-white/90"}>
                    <FrameThumb type={t} active={on} />
                  </div>
                  <div className="px-2 py-1.5">
                    <div
                      className={`truncate text-[10px] font-bold ${
                        on ? "text-brand-orange" : "text-slate-200"
                      }`}
                    >
                      {t.name}
                    </div>
                    <div
                      className={`truncate text-[9px] ${on ? "text-orange-400/80" : "text-slate-500"}`}
                    >
                      {t.sub}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
          {/* Viewport */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
            <div
              ref={holder}
              className={`relative w-full bg-slate-100 ${
                isFullscreen ? "h-screen" : "h-[380px] sm:h-[480px] lg:h-[540px]"
              }`}
            >
              {inView ? (
                <Scene
                  config={config}
                  mode={mode}
                  explode={explode}
                  selected={selected}
                  onSelect={setSelected}
                  showDims={showDims}
                  autoRotate={autoRotate}
                  resetKey={resetKey}
                />
              ) : (
                <div className="h-full w-full bg-slate-800" />
              )}

              {/* Viewport toolbar */}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-3">
                <div className="pointer-events-auto flex rounded-lg border border-slate-200 bg-white/95 p-0.5 shadow-sm backdrop-blur">
                  {VIEW_MODES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setMode(v.id)}
                      className={`rounded-md px-2 py-1.5 text-[10px] font-bold transition-colors sm:px-2.5 sm:text-[11px] ${
                        mode === v.id
                          ? "bg-brand-orange text-white"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                <div className="pointer-events-auto flex gap-1.5">
                  {[
                    {
                      icon: <RotateCw size={14} />,
                      on: autoRotate,
                      label: "Auto-rotate",
                      act: () => setAutoRotate((v) => !v),
                    },
                    {
                      icon: <Ruler size={14} />,
                      on: showDims,
                      label: "Dimensions",
                      act: () => setShowDims((v) => !v),
                    },
                    {
                      icon: <Crosshair size={14} />,
                      on: false,
                      label: "Reset view",
                      act: () => setResetKey(`${typeId}-${Date.now()}`),
                    },
                    ...(fsSupported
                      ? [
                          {
                            icon: isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />,
                            on: isFullscreen,
                            label: isFullscreen ? "Exit fullscreen" : "Fullscreen",
                            act: toggleFullscreen,
                          },
                        ]
                      : []),
                  ].map((b) => (
                    <button
                      key={b.label}
                      onClick={b.act}
                      title={b.label}
                      aria-label={b.label}
                      className={`rounded-lg border p-2 shadow-sm transition-colors ${
                        b.on
                          ? "border-brand-orange bg-brand-orange text-white"
                          : "border-slate-200 bg-white/95 text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {b.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explode slider */}
              <div className="pointer-events-auto absolute bottom-3 left-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
                <Layers size={14} className="text-brand-orange" />
                <span className="text-[11px] font-bold text-slate-600">Exploded</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={explode}
                  onChange={(e) => setExplode(parseFloat(e.target.value))}
                  className="h-1.5 w-28 cursor-pointer appearance-none rounded-full"
                  style={{
                    background: `linear-gradient(to right,#B91C1C 0%,#B91C1C ${explode * 100}%,#E2E8F0 ${
                      explode * 100
                    }%,#E2E8F0 100%)`,
                  }}
                  aria-label="Exploded view amount"
                />
              </div>

              <div className="pointer-events-none absolute bottom-3 right-3 hidden rounded-lg bg-slate-900/70 px-2.5 py-1 text-[10px] font-medium text-slate-300 sm:block">
                Drag to orbit · Scroll to zoom · Click a member
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 px-4 py-3">
              {LEGEND.map(([c, t]) => (
                <div key={t} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
                  {t}
                </div>
              ))}
              {activeFeatures.map((f) => (
                <div key={f.id} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: f.color }} />
                  {f.label}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="border-t border-white/10 bg-slate-900/40 p-5">
              <div className="mb-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <Slider label="Building Width" value={width} min={10} max={72} step={2} unit="m" onChange={setWidth} />
                <Slider label="Eave Height" value={eave} min={4} max={14} step={0.5} unit="m" onChange={setEave} />
                <Slider label="Roof Pitch" value={pitch} min={3} max={20} step={1} unit="°" onChange={setPitch} />
                <Slider label="Number of Bays" value={bays} min={2} max={10} step={1} unit="" onChange={setBays} />
              </div>
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Spans</span>
                  {([1, 2, 3] as const).map((n) => (
                    <button
                      key={n}
                      onClick={() => setSpans(n)}
                      className={`h-8 w-9 rounded-lg border text-xs font-bold transition-all ${
                        spans === n
                          ? "border-brand-orange bg-brand-orange text-white"
                          : "border-white/15 bg-white/5 text-slate-300"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Roof</span>
                  {([["pitched", "Pitched ▲"], ["mono", "Mono ⟍"]] as [Roof, string][]).map(
                    ([r, l]) => (
                      <button
                        key={r}
                        onClick={() => setRoof(r)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                          roof === r
                            ? "border-brand-orange bg-brand-orange text-white"
                            : "border-white/15 bg-white/5 text-slate-300"
                        }`}
                      >
                        {l}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Add / Remove Components
                  </span>
                  <button
                    onClick={() => setFeatures(DEF_FEATURES)}
                    className="text-[10px] text-slate-500 underline hover:text-slate-300"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FEATURES.map((f) => {
                    const on = features[f.id];
                    return (
                      <motion.button
                        key={f.id}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => toggleFeature(f.id)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                          on
                            ? "border-transparent text-white shadow-sm"
                            : "border-white/15 bg-white/5 text-slate-400 hover:text-slate-200"
                        }`}
                        style={on ? { background: f.color, borderColor: f.color } : undefined}
                      >
                        {on ? <Minus size={11} /> : <Plus size={11} />}
                        {f.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5">
              <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-orange">
                {type.name} — {type.sub}
              </div>
              <div className="mb-2 text-sm font-bold text-slate-800">
                Practical: {type.practical}
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-500">{type.desc}</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "Width", v: `${width} m` },
                  { l: "Length", v: `${geo.length} m` },
                  { l: "Eave Ht.", v: `${eave} m` },
                  { l: "Ridge Rise", v: `+${geo.ridgeHeight} m` },
                  { l: "Pitch", v: `${pitch}° (${pitchRatio})` },
                  { l: "Bay Spacing", v: `${type.baySpacing} m` },
                  { l: "Spans", v: `${spans} Bay${spans > 1 ? "s" : ""}` },
                  { l: "Roof", v: roof === "pitched" ? "Pitched" : "Mono Slope" },
                ].map(({ l, v }) => (
                  <div key={l} className="rounded-lg bg-slate-100 p-2">
                    <div className="text-[9px] uppercase tracking-wide text-slate-400">{l}</div>
                    <div className="mt-0.5 text-xs font-bold text-slate-800">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-brand-orange/10 p-2.5">
                <div className="text-[9px] uppercase tracking-wide text-brand-orange">
                  Covered Floor Area
                </div>
                <div className="mt-0.5 text-sm font-bold text-slate-800">
                  {(width * geo.length).toLocaleString()} m²
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {info && (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl border border-brand-orange/40 bg-amber-50 p-4"
                >
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                    ● {info.cat}
                  </div>
                  <div className="mb-1 text-sm font-bold text-slate-800">{info.title}</div>
                  <p className="mb-3 text-xs leading-relaxed text-slate-600">{info.detail}</p>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Products required
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {info.products.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand-orange" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Products for This Config
              </h4>
              <ul className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
                {productsFor(config).map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand-orange" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/contact"
              className="block rounded-xl bg-brand-orange py-3 text-center text-sm font-bold text-white shadow-md shadow-brand-orange/25 transition-colors duration-200 hover:bg-brand-orange-light"
            >
              Get Quote for This Config →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-400">{label}</label>
        <span className="text-sm font-bold tabular-nums text-orange-400">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to right,#EA580C 0%,#EA580C ${pct}%,#334155 ${pct}%,#334155 100%)`,
        }}
      />
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
