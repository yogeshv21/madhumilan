import React from "react";
import { Metadata } from "next";
import { Cpu, ShieldCheck, Users, Leaf, LucideIcon, Award, CheckSquare } from "lucide-react";
import { companyConfig } from "@/data/company";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "About Our Infrastructure & Values",
  description: "Learn about Madhu Ratna Industry's manufacturing facility, progressive stamping lines, quality control tests, and history of engineering excellence.",
  slug: "about",
});

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  ShieldCheck,
  Users,
  Leaf,
};

export default function AboutPage() {
  const infra = companyConfig.infrastructure;

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      {/* Page Header Banner */}
      <section className="relative bg-brand-dark text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Enterprise Profile
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            About Madhu Ratna Industry
          </h1>
          <p className="text-sm text-slate-350 max-w-2xl leading-relaxed">
            Leading the manufacturing and delivery of high-integrity pre-engineered metal roofing parts, weather-proof foam profiles, and heavy fastening systems.
          </p>
        </div>
      </section>

      {/* Company Story & Statistics */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Story Text */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue dark:text-white">
                Our Corporate Journey
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {companyConfig.history}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {companyConfig.shortDescription}
              </p>
              
              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-orange mb-2">
                    Mission
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {companyConfig.mission}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-orange mb-2">
                    Vision
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {companyConfig.vision}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Graphic Column */}
            <div className="bg-brand-blue text-white rounded-2xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,#f2641925,transparent)] pointer-events-none" />
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-orange mb-8 border-b border-white/10 pb-4">
                Operational Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {companyConfig.stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-3xl lg:text-4xl font-black text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs text-brand-steel font-bold uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Company Culture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue dark:text-white">
              The Principles That Guide Our Manufacturing
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyConfig.coreValues.map((value, idx) => {
              const Icon = iconMap[value.icon] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-brand-orange/20 shadow-xs transition-all group"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Infrastructure & Operations */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Factory Assets
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue dark:text-white">
              High-Capacity Stamping & Extrusion Plant
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {infra.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {infra.sections.map((section, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 space-y-4 shadow-xs"
              >
                <div className="text-xs font-black text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md inline-block">
                  Line Phase 0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-850 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Workflow Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue dark:text-white">
              End-to-End Precision Fabrication Process
            </h2>
            <p className="text-sm text-slate-550 dark:text-slate-450 leading-relaxed">
              From design reviews to final dispatch, our process ensures absolute adherence to engineering tolerance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: "01", label: "Tooling & Die Design", desc: "CAD/CAM blueprint design of progressive dies and extrusion molds for custom profiles." },
              { step: "02", label: "Material Sourcing", desc: "Receiving certified high-tensile steel coils and UV-stabilized chemical granules." },
              { step: "03", label: "Automated Stamping", desc: "Continuous progressive press lines fabricating clips and brackets with zero deviation." },
              { step: "04", label: "Testing & Assembly", desc: "Subjecting batches to load limits and corrosion tests before packing for dispatch." }
            ].map((proc, idx) => (
              <div key={idx} className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                <span className="text-3xl font-black text-brand-orange/20 dark:text-brand-orange/10 block">
                  {proc.step}
                </span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  {proc.label}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange mb-2">
            <CheckSquare className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue dark:text-white">
            Our Quality Commitment Statement
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 max-w-3xl mx-auto leading-relaxed">
            At Madhu Ratna Industry, quality is not a department; it is a manufacturing philosophy. We purchase only mill-certified coils, utilize advanced automation to minimize manual assembly errors, and execute structural shear inspections on every production lot. We guarantee our roofing clips and components are designed to equal or exceed the service lifecycle of your cladding panels.
          </p>
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4 text-brand-orange" />
              ISO 9001:2015 Approved
            </span>
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4 text-brand-orange" />
              AS3566 Standard Compliant
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
