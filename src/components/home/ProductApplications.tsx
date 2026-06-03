"use client";

import React from "react";
import { Building, Shield, Snowflake, Plane, Minimize2, Anchor } from "lucide-react";

const applications = [
  { title: "Pre-Engineered Buildings (PEB)", desc: "Securing high-span metal sheets with thermal expansion clips onto structural frame purlins.", icon: Building },
  { title: "Cold Storage & Cleanrooms", desc: "Creating airtight side-lap boundary locks with high-density polyolefin foam strips.", icon: Snowflake },
  { title: "Heavy Industrial Factories", desc: "Anti-vibration structural anchors and heavy-gauge fasteners that resist operational stress.", icon: Shield },
  { title: "Aviation & Large Hangars", desc: "Wind-uplift-resistant clip profiling supporting massive continuous roll-formed roof sheets.", icon: Plane },
  { title: "Expansion Joint Sub-Girts", desc: "Accommodating large movement planes at structural seismic dividers.", icon: Minimize2 },
  { title: "Suspension Hanger Brackets", desc: "Securing heavy electrical trays and ventilation duct lines underneath metal roof decks.", icon: Anchor },
];

export default function ProductApplications() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Field Implementations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brand-blue dark:text-white leading-tight">
            Engineered for Demanding Construction Environments
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Our products are installed in critical points across steel constructions to guarantee water tightness and mechanical structural safety.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-brand-orange/20 transition-all duration-300 group"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-brand-orange transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
