import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Factory, Warehouse, Building2, Cpu, Layout, CheckCircle, ArrowRight, ShieldAlert, LucideIcon } from "lucide-react";
import { industries } from "@/data/industries";
import { products } from "@/data/products";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Industries We Serve",
  description: "Specialized roofing accessories and fasteners for warehouses, industrial manufacturing plants, commercial showrooms, and PEB buildings.",
  slug: "industries",
});

const iconMap: Record<string, LucideIcon> = {
  Factory,
  Warehouse,
  Building2,
  Cpu,
  Layout,
};

export default function IndustriesPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header Banner */}
      <section className="relative bg-brand-dark text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Engineering Sectors
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Industries We Serve
          </h1>
          <p className="text-sm text-slate-350 max-w-2xl leading-relaxed">
            Custom-configured cladding parts built to perform in aggressive chemicals, thermal expansion zones, and high wind velocity environments.
          </p>
        </div>
      </section>

      {/* Industries Layout List */}
      <section className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {industries.map((ind) => {
          const Icon = iconMap[ind.iconName] || Factory;
          
          // Resolve relevant product objects from slugs
          const matchedProducts = ind.relevantProductSlugs
            .map((slug) => products.find((p) => p.slug === slug))
            .filter((p): p is typeof products[0] => !!p);

          return (
            <div
              key={ind.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 lg:p-10 shadow-xs space-y-8"
            >
              {/* Header: Icon + Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-6">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-brand-blue dark:text-white leading-tight">
                      {ind.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      {ind.description}
                    </p>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 transition-colors focus:outline-none shrink-0"
                >
                  Consult on {ind.name.split(" ").pop()}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Body: Challenges vs Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Column 1: Challenges */}
                <div className="p-5 rounded-xl bg-rose-50/20 dark:bg-slate-950/20 border border-rose-100/10 dark:border-slate-850 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    Common Engineering Challenges
                  </h3>
                  <ul className="space-y-3">
                    {ind.challenges.map((chal, i) => (
                      <li key={i} className="text-xs text-slate-655 dark:text-slate-305 flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{chal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Solutions */}
                <div className="p-5 rounded-xl bg-emerald-50/20 dark:bg-slate-950/20 border border-emerald-100/10 dark:border-slate-850 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-405 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Our Specialized Solutions
                  </h3>
                  <ul className="space-y-3">
                    {ind.solutions.map((sol, i) => (
                      <li key={i} className="text-xs text-slate-655 dark:text-slate-305 flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer: Relevant Products linking */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-850 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Recommended Roofing Systems
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {matchedProducts.map((prod) => (
                    <Link
                      key={prod.slug}
                      href={`/products/${prod.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200/50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/20 hover:border-brand-orange/30 hover:bg-white dark:hover:bg-slate-900 transition-all group focus:outline-none"
                    >
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-brand-orange transition-colors truncate pr-2">
                        {prod.name}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
