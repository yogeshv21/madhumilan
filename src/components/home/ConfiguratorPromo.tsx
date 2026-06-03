"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sliders, Building2, Ruler, Palette } from "lucide-react";

const features = [
  { icon: Ruler, label: "Custom Span & Height", desc: "Set width up to 80m, height up to 20m" },
  { icon: Building2, label: "Clear or Multi-Span", desc: "Toggle between single and multi-span frames" },
  { icon: Sliders, label: "Crane & Accessories", desc: "Add overhead crane runway configurations" },
  { icon: Palette, label: "Color Selection", desc: "Choose roof & wall cladding color schemes" },
];

export default function ConfiguratorPromo() {
  return (
    <section className="py-20 lg:py-28 bg-brand-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text & CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange-light text-xs font-bold uppercase tracking-wider">
                <Sliders className="h-3.5 w-3.5" />
                Interactive Design Tool
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Design Your Steel Building in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">
                  Real-Time
                </span>
              </h2>
              <p className="text-base text-slate-300 leading-relaxed max-w-lg">
                Use our interactive PEB configurator to set dimensions, choose framing type, add crane support, and select color schemes — then instantly request a cost estimation from our engineering desk.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                  <div className="rounded-lg bg-brand-orange/15 p-2 shrink-0">
                    <f.icon className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">{f.label}</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/configurator"
              className="inline-flex items-center gap-2.5 rounded-lg bg-brand-orange hover:bg-brand-orange-light px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Open Building Configurator
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>

          {/* Right: Mini SVG preview */}
          <div className="relative hidden lg:block">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Preview — Span 40m × Height 8m
              </div>
              <svg viewBox="0 0 500 300" className="w-full" xmlns="http://www.w3.org/2000/svg">
                {/* Grid */}
                <defs>
                  <pattern id="pgrid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="500" height="300" fill="url(#pgrid)" />

                {/* Ground */}
                <line x1="30" y1="240" x2="470" y2="240" stroke="#475569" strokeWidth="2" />

                {/* Footings */}
                <rect x="58" y="240" width="30" height="10" fill="#334155" rx="1" />
                <rect x="412" y="240" width="30" height="10" fill="#334155" rx="1" />

                {/* Walls */}
                <rect x="70" y="120" width="12" height="120" fill="#1e3a8a" opacity="0.7" />
                <rect x="418" y="120" width="12" height="120" fill="#1e3a8a" opacity="0.7" />

                {/* Columns */}
                <polygon points="60,240 74,240 80,120 60,120" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <polygon points="440,240 426,240 420,120 440,120" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                {/* Rafters */}
                <polygon points="60,120 250,60 260,68 74,128" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <polygon points="440,120 250,60 260,68 426,128" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                {/* Roof skin */}
                <polygon points="55,120 250,55 250,60 55,125" fill="#f26419" opacity="0.85" />
                <polygon points="445,120 250,55 250,60 445,125" fill="#f26419" opacity="0.85" />

                {/* Purlin lines across roof */}
                {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
                  const lx = 55 + t * (250 - 55);
                  const ly = 125 - t * (125 - 60);
                  const rx = 445 - t * (445 - 250);
                  const ry = 125 - t * (125 - 60);
                  return (
                    <React.Fragment key={i}>
                      <line x1={lx} y1={ly} x2={lx} y2={ly + 3} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                      <line x1={rx} y1={ry} x2={rx} y2={ry + 3} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                    </React.Fragment>
                  );
                })}

                {/* Eave gutter dots */}
                <circle cx="55" cy="122" r="3" fill="#f26419" />
                <circle cx="445" cy="122" r="3" fill="#f26419" />

                {/* Dimension annotations */}
                <line x1="60" y1="265" x2="440" y2="265" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                <text x="250" y="278" fontFamily="sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold">Span: 40m</text>

                <line x1="30" y1="120" x2="30" y2="240" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                <text x="22" y="185" fontFamily="sans-serif" fontSize="9" fill="#94a3b8" textAnchor="middle" fontWeight="bold" transform="rotate(-90, 22, 185)">Ht: 8m</text>

                {/* Ridge label */}
                <line x1="250" y1="30" x2="250" y2="55" stroke="#f26419" strokeWidth="1" strokeDasharray="2 2" />
                <text x="250" y="26" fontFamily="sans-serif" fontSize="9" fill="#f26419" textAnchor="middle" fontWeight="bold">Ridge</text>
              </svg>

              <div className="grid grid-cols-3 gap-3 mt-4 border-t border-white/10 pt-4">
                {[
                  { label: "Building Area", val: "2,400 m²" },
                  { label: "Roof Panels", val: "2 × 20.5m" },
                  { label: "Span Type", val: "Clear Span" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-[9px] text-slate-500 uppercase tracking-wide">{s.label}</p>
                    <p className="text-xs font-black text-white mt-0.5">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
