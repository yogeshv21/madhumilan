"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { products } from "@/data/products";
import { useQuote } from "@/context/QuoteContext";

export default function FeaturedProducts() {
  const { openQuote, setSelectedProduct } = useQuote();

  const handleInquiry = (slug: string) => {
    setSelectedProduct(slug);
    openQuote();
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Our Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brand-blue dark:text-white">
              Steel Buildings, Structural & Storage Systems
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-4 md:mt-0 text-sm font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange-light transition-colors group focus:outline-none"
          >
            View Full Catalog
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((prod) => (
            <div
              key={prod.slug}
              className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-md bg-brand-blue/80 dark:bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                  <Tag className="h-3 w-3 text-brand-orange" />
                  {prod.category}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col justify-between grow">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white leading-snug group-hover:text-brand-orange transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors focus:outline-none"
                  >
                    Tech Specs
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>

                  <button
                    onClick={() => handleInquiry(prod.slug)}
                    className="cursor-pointer inline-flex items-center rounded-lg bg-brand-blue hover:bg-brand-light-blue px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors focus:outline-none"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
