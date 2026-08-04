"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { MapPin, X, Building2 } from "lucide-react";

/* ─── Client locations with pre-projected coordinate positions (viewBox 800x750) ─── */
const CLIENT_LOCATIONS = [
  {
    id: "indore",
    city: "Indore",
    state: "Madhya Pradesh",
    x: 292.8,
    y: 361.42,
    clients: [
      "Metal Profile Unit II (2016)",
      "Metal Profile Unit III (2018)",
      "Hi-Tech Metal Forming Unit I (2015)",
      "Hi-Tech Metal Forming Unit II (2016)",
      "Shyam Automotive-I, Indore (2016)",
      "Shyam Automotive-II, Indore (2018)",
      "Flexi Flex, Indore (2015)",
      "Inno Flex & Opal Wear, Indore (2016)",
      "Ajmera Metals, Indore",
      "MB Jigson Hydraulics Pvt. Ltd., Indore",
      "Shreyash Securities Pvt. Ltd. — WC-1 (2015)",
      "Shreyash Securities Pvt. Ltd. — WC-2 (2016)",
      "Shreyash Securities Pvt. Ltd. — WC-3 (2017)",
      "Anant Agro, Indore (2016 & 2018)",
    ],
  },
  {
    id: "pithampur",
    city: "Pithampur",
    state: "Madhya Pradesh",
    x: 289.92,
    y: 363.39,
    clients: [
      "Bhagirath Coach & Metal Fabricators Pvt. Ltd.",
      "MD Enterprises",
      "DBL Central Warehouse (2019)",
      "Jalpa Devi Engineering Pvt. Ltd. (2019)",
      "Macleods Pharmaceuticals Ltd. — SEZ Unit (2019)",
    ],
  },
  {
    id: "ujjain",
    city: "Ujjain",
    state: "Madhya Pradesh",
    x: 291.59,
    y: 352.76,
    clients: [
      "Bhagirath Motors, Ujjain",
      "ALIMCO Auxiliary Production Center, Ujjain",
    ],
  },
  {
    id: "ratlam",
    city: "Ratlam",
    state: "Madhya Pradesh",
    x: 278.47,
    y: 349.82,
    clients: [
      "Katariya Packaging, Ratlam",
      "IPCA, Ratlam",
      "Fortune Stone Limited (I & II), Chatterpur",
    ],
  },
  {
    id: "dewas",
    city: "Dewas",
    state: "Madhya Pradesh",
    x: 296.21,
    y: 356.72,
    clients: ["Gupta Steel, Dewas"],
  },
  {
    id: "nemawar",
    city: "Nemawar",
    state: "Madhya Pradesh",
    x: 301.91,
    y: 365.54,
    clients: [
      "Garg Warehouse, Nemawar",
      "Khandelwal Agrihouse, Nemawar",
      "Shree Salasar Logistics, Nemawar",
      "Master Plast, Nemawar",
      "Natural Grains, Indore",
    ],
  },
  {
    id: "badwah",
    city: "Badwah",
    state: "Madhya Pradesh",
    x: 305.49,
    y: 370.92,
    clients: [
      "Associated Alcohol, Unit-I, Badwah (2014)",
      "Associated Alcohol, Unit-II, Badwah (2016)",
      "Associated Alcohol, Unit-III, Badwah (2018)",
    ],
  },
  {
    id: "nimrani",
    city: "Nimrani",
    state: "Madhya Pradesh",
    x: 289.75,
    y: 371.23,
    clients: ["Varad Polyfab, Nimrani"],
  },
  {
    id: "rau",
    city: "Rau",
    state: "Madhya Pradesh",
    x: 290.92,
    y: 363.68,
    clients: [
      "Rasayan Agro, Rau",
      "Deevin Seismic Systems Pvt. Ltd. (2019)",
    ],
  },
  {
    id: "bhopal",
    city: "Bhopal",
    state: "Madhya Pradesh",
    x: 319.93,
    y: 351.18,
    clients: ["Commercial Synbag, Pithampur", "Prestige Foods Industries"],
  },
  {
    id: "mundra",
    city: "Mundra",
    state: "Gujarat",
    x: 185.66,
    y: 359.15,
    clients: [
      "Transworld Terminal Pvt. Ltd. — Mundra",
      "TG Terminal — Mundra",
    ],
  },
  {
    id: "gandhinagar",
    city: "Gandhinagar",
    state: "Gujarat",
    x: 236.58,
    y: 352.02,
    clients: [
      "Transworld Terminal Pvt. Ltd. (WH-4), Gujarat",
      "TG Terminal, Gujarat",
    ],
  },
  {
    id: "ambala",
    city: "Ambala",
    state: "Haryana",
    x: 308.84,
    y: 211.83,
    clients: ["Gurudwara, Ambala"],
  },
  {
    id: "amravati",
    city: "Amravati",
    state: "Maharashtra",
    x: 325.86,
    y: 395.03,
    clients: ["Shyam Indofab (P) Ltd., Amravati"],
  },
  {
    id: "shirdi",
    city: "Shirdi",
    state: "Maharashtra",
    x: 268.68,
    y: 416.69,
    clients: ["Atma Malik Dhyanpeeth, Shirdi, Shahpur, Nerla"],
  },
  {
    id: "kolkata",
    city: "Kolkata",
    state: "West Bengal",
    x: 511.07,
    y: 364.2,
    clients: ["Transworld Terminal Pvt. Ltd. — Kolkata"],
  },
  {
    id: "goldstar",
    city: "Sanawad",
    state: "Madhya Pradesh",
    x: 296.5,
    y: 371.8,
    clients: [
      "Gold Star Warehouses (WH-I, II, III, IV, V)",
      "Belmaks Metal India Ltd.",
    ],
  },
];

type LocationData = (typeof CLIENT_LOCATIONS)[number];

export default function IndiaClientMap() {
  const [active, setActive] = useState<LocationData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const totalClients = CLIENT_LOCATIONS.reduce((s, l) => s + l.clients.length, 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">
            Pan-India Presence
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue dark:text-white">
            PEB Steel Buildings Delivered Across India
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Click any orange marker to see all clients at that location.
          </p>
        </div>
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-center">
            <p className="text-2xl font-black text-brand-orange">{CLIENT_LOCATIONS.length}+</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-brand-blue dark:text-white">{totalClients}+</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Projects</p>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div
          className="lg:col-span-2 relative rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg aspect-[800/750] w-full"
          style={{ backgroundColor: "#f8fafc" }}
        >
          {/* Static SVG Map of India */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src="/india-map.svg"
              alt="India Client Map"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Legend */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2">
            <div className="h-3 w-3 rounded-full bg-brand-orange shadow-[0_0_0_3px_rgba(242,100,25,0.3)]" />
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              Client Location
            </span>
          </div>

          {/* Client markers rendered as absolute-positioned interactive divs */}
          <div className="absolute inset-0 z-10">
            {CLIENT_LOCATIONS.map((loc) => {
              const isActive = active?.id === loc.id;
              const isHovered = hovered === loc.id;
              const leftPercent = (loc.x / 800) * 100;
              const topPercent = (loc.y / 750) * 100;

              return (
                <div
                  key={loc.id}
                  style={{
                    position: "absolute",
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isActive || isHovered ? 30 : 20,
                  }}
                  className="cursor-pointer"
                  onClick={() => setActive(isActive ? null : loc)}
                  onMouseEnter={() => setHovered(loc.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Outer glowing ripple ring */}
                  <div
                    className={`absolute -inset-3 rounded-full transition-all duration-300 pointer-events-none ${
                      isActive || isHovered
                        ? "bg-brand-orange/20 scale-100"
                        : "bg-transparent scale-50"
                    }`}
                  />

                  {/* Inner orange circle pin */}
                  <div
                    className={`h-7 w-7 rounded-full border border-white/80 flex items-center justify-center shadow-md transition-all duration-300 ${
                      isActive
                        ? "bg-brand-orange scale-110"
                        : "bg-brand-orange/95 hover:bg-brand-orange hover:scale-105"
                    }`}
                  >
                    <span className="text-[9px] font-black text-white select-none">
                      {loc.clients.length}
                    </span>
                  </div>

                  {/* Label tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-slate-950/90 border border-slate-700 shadow-sm transition-all duration-200 pointer-events-none whitespace-nowrap z-50 ${
                      isActive || isHovered
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-1 scale-95"
                    }`}
                  >
                    <p className="text-[9px] font-black text-white leading-none">
                      {loc.city}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {active ? (
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-brand-orange/30 shadow-lg overflow-hidden flex flex-col">
              <div className="bg-brand-blue p-5 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-orange flex-shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
                      {active.state}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white leading-tight">{active.city}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {active.clients.length} client{active.clients.length > 1 ? "s" : ""} served
                  </p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="flex-shrink-0 h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ maxHeight: 430 }}>
                {active.clients.map((client, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-lg bg-brand-orange/10 flex items-center justify-center mt-0.5">
                      <Building2 className="h-3 w-3 text-brand-orange" />
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-350 font-medium leading-snug">
                      {client}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 dark:border-slate-850">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                  All Served Locations
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Click a pin or row to view clients
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1" style={{ maxHeight: 460 }}>
                {CLIENT_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActive(loc)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-brand-orange/5 border border-transparent hover:border-brand-orange/20 transition-all group"
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-brand-orange/10 group-hover:bg-brand-orange transition-colors flex items-center justify-center">
                      <MapPin className="h-3.5 w-3.5 text-brand-orange group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight truncate">
                        {loc.city}
                      </p>
                      <p className="text-[10px] text-slate-450 truncate">{loc.state}</p>
                    </div>
                    <span className="flex-shrink-0 text-[10px] font-black text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">
                      {loc.clients.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "500+", label: "Projects" },
              { value: "10+",  label: "States" },
              { value: "65%+", label: "Repeat" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-3 text-center"
              >
                <p className="text-base font-black text-brand-blue dark:text-white">{s.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
