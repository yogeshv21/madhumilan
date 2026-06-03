"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, CheckSquare, Truck, Wrench, Building2, LucideIcon } from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Compass,
  CheckSquare,
  Truck,
  Wrench,
  Building2,
};

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Value Additions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brand-blue dark:text-white">
              Technical Consultation & Logistics Support
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-4 md:mt-0 text-sm font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange-light transition-colors group focus:outline-none"
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => {
            const Icon = iconMap[service.iconName] || Wrench;
            return (
              <div
                key={service.id}
                className="flex flex-col justify-between p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-brand-orange/20 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-blue/5 dark:bg-white/5 text-brand-blue dark:text-brand-orange group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-brand-blue dark:text-white group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/50 dark:border-slate-800/50">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors focus:outline-none"
                  >
                    View Benefits
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
