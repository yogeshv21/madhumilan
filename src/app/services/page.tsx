import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Compass, CheckSquare, Truck, Wrench, Building2, Check, LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Roofing Consultation & Supply Services",
  description: "Read about our roofing site audits, tailored material recommendations, high-volume supply, and PEB engineering project assistance.",
  slug: "services",
});

const iconMap: Record<string, LucideIcon> = {
  Compass,
  CheckSquare,
  Truck,
  Wrench,
  Building2,
};

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header Banner */}
      <section className="relative bg-brand-dark text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Our Offerings
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Consultation, Supply & Support Services
          </h1>
          <p className="text-sm text-slate-350 max-w-2xl leading-relaxed">
            From design blueprints to double-lock standing seam seaming training, we provide end-to-end support for your roofing teams.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || Wrench;
            return (
              <div
                key={service.id}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon + Title Header */}
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-black text-brand-blue dark:text-white leading-tight">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits checklist */}
                  <div className="space-y-3 pt-5 border-t border-slate-100 dark:border-slate-850">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Service Value Highlights
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((ben, i) => (
                        <li key={i} className="text-xs text-slate-655 dark:text-slate-300 flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Corporate Callout Block */}
      <section className="mt-16 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 lg:p-12 shadow-xs">
        <h3 className="text-xl font-black text-brand-blue dark:text-white uppercase tracking-wider mb-4">
          Need Site Erection Training Support?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-450 max-w-xl mx-auto leading-relaxed mb-6">
          Our technical assistance teams are available to travel to major construction sites in India and the MEA region to train local crews on correct fastening torque values and profile overlaps.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold uppercase tracking-wider px-6 py-3 shadow-md transition-colors focus:outline-none"
        >
          Request On-Site Assistance
        </Link>
      </section>
    </div>
  );
}
