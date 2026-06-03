"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export default function RequestQuoteCTA() {
  const { openQuote } = useQuote();

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-r from-slate-100 via-brand-gray to-slate-50 text-slate-900 border-y border-slate-200 relative overflow-hidden">
      {/* Decorative Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b254505_1px,transparent_1px),linear-gradient(to_bottom,#0b254505_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto text-brand-blue">
          Need a Custom Pre-Engineered Building or Structural Steel System?
        </h2>
        
        <p className="text-base text-slate-650 max-w-xl mx-auto leading-relaxed">
          Submit your project requirements to our structural engineering desk today. We offer custom span configurations, material grade selections, and detailed pricing packages for contractors and developers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={openQuote}
            className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-orange hover:bg-brand-orange-light px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            Request Custom Quotation
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
          
          <a
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-250 hover:border-slate-350 px-8 py-4 text-sm font-bold uppercase tracking-wider text-slate-700 shadow-xs hover:shadow-sm transition-all"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
