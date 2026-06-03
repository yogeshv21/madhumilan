import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { products } from "@/data/products";
import { constructMetadata } from "@/lib/metadata";
import ProductCardActions from "@/components/products/ProductCardActions";

export const metadata: Metadata = constructMetadata({
  title: "Industrial Roofing Components Catalog",
  description: "Browse standing seam roof clips, polyolefin closer strips, insulation materials, self-drilling screws, and custom PEB fasteners.",
  slug: "products",
});

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

const categories = [
  { name: "All Products", value: "" },
  { name: "Roofing Clips", value: "Clips" },
  { name: "Foam Closers", value: "Closers" },
  { name: "Fasteners", value: "Fasteners" },
  { name: "Accessories", value: "Accessories" },
  { name: "Components", value: "Components" },
];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams.category || "";

  const filteredProducts = activeCategory
    ? products.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : products;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header Banner */}
      <section className="relative bg-brand-dark text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Product Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Industrial Roofing Catalog
          </h1>
          <p className="text-sm text-slate-350 max-w-2xl leading-relaxed">
            High-integrity metallic and polymer accessories for Pre-Engineered Buildings, warehouses, and steel structures.
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 sticky top-16 lg:top-20 z-30 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto scrollbar-none flex items-center justify-start lg:justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.value.toLowerCase();
            return (
              <Link
                key={cat.name}
                href={cat.value ? `?category=${cat.value}` : "/products"}
                className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
                  isActive
                    ? "bg-brand-orange text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Product Grid Area */}
      <section className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No products found in this category.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange-light"
            >
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.slug}
                className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-md bg-brand-blue/80 dark:bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                    <Tag className="h-3 w-3 text-brand-orange" />
                    {prod.category}
                  </span>
                </div>

                {/* Product Detail info */}
                <div className="p-6 flex flex-col justify-between grow">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-brand-blue dark:text-white leading-snug group-hover:text-brand-orange transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {prod.shortDescription}
                    </p>

                    {/* Quick Specs summary */}
                    <div className="pt-3 flex flex-wrap gap-2">
                      {Object.entries(prod.specifications)
                        .slice(0, 2)
                        .map(([key, val]) => (
                          <span
                            key={key}
                            className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-800 text-[9px] font-semibold text-slate-500 dark:text-slate-400 rounded px-2 py-0.5"
                          >
                            <strong>{key}:</strong> {val}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors focus:outline-none"
                    >
                      Specifications
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>

                    {/* Interactive client actions */}
                    <ProductCardActions slug={prod.slug} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
