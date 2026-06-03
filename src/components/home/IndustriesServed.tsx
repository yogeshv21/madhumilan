"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Factory, Warehouse, Building2, Cpu, Layout, LucideIcon } from "lucide-react";
import { industries } from "@/data/industries";

const iconMap: Record<string, LucideIcon> = {
  Factory,
  Warehouse,
  Building2,
  Cpu,
  Layout,
};

export default function IndustriesServed() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Sectors We Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brand-blue dark:text-white">
              Engineered Solutions for Diverse Structures
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 mt-4 md:mt-0 text-sm font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange-light transition-colors group focus:outline-none"
          >
            All Industry Cases
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.slice(0, 3).map((ind) => {
            const Icon = iconMap[ind.iconName] || Factory;
            return (
              <div
                key={ind.id}
                className="flex flex-col justify-between p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-brand-orange/20 shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3.5">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-orange/5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-blue dark:text-white group-hover:text-brand-orange transition-colors">
                      {ind.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {ind.description}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-slate-850">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Key Challenges Solved
                    </p>
                    <ul className="space-y-1.5">
                      {ind.challenges.slice(0, 2).map((chal, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                          <span className="leading-tight">{chal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/50 dark:border-slate-800/50">
                  <Link
                    href="/industries"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors focus:outline-none"
                  >
                    View Engineering Details
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
