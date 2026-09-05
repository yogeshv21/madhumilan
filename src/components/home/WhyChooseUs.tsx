"use client";

import React from "react";
import { Cpu, ShieldCheck, Users, Leaf, LucideIcon } from "lucide-react";
import { companyConfig } from "@/data/company";
import { landingContent } from "@/data/landing";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  ShieldCheck,
  Users,
  Leaf,
};

export default function WhyChooseUs() {
  const content = landingContent.whyChooseUs;

  return (
    <section className="py-20 lg:py-28 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(circle_at_top_left,#b91c1c10,transparent)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,#991b1b20,transparent)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            {content.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            {content.title}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            {content.description}
          </p>
        </div>

        {/* Why Choose Us Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyConfig.coreValues.map((value, idx) => {
            const Icon = iconMap[value.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-orange/20 transition-all duration-300 group"
              >
                {/* Icon wrapper */}
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 text-white/70 group-hover:bg-brand-orange group-hover:text-white transition-colors mb-5">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-base font-bold text-white mb-3 group-hover:text-brand-orange-light transition-colors">
                  {value.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

