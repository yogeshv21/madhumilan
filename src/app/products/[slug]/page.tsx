import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ArrowRight, Tag } from "lucide-react";
import { products } from "@/data/products";
import { constructMetadata } from "@/lib/metadata";
import { getProductSchema } from "@/lib/seo";
import ProductGallery from "@/components/products/ProductGallery";
import ProductDetailsActions from "@/components/products/ProductDetailsActions";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static parameters for static site generation (SSG)
export async function generateStaticParams() {
  return products.map((prod) => ({
    slug: prod.slug,
  }));
}

// Generate metadata for SEO dynamically
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  if (!product) return {};

  return constructMetadata({
    title: product.name,
    description: product.shortDescription,
    image: product.image,
    slug: `products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Find related products (filtering out the current one)
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const jsonLd = getProductSchema(product);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Subheader Banner */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-orange transition-colors focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Core Layout: Gallery + Quick Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Product Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Right: Intro & Specifications */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-orange/10 text-xs font-bold text-brand-orange uppercase tracking-wider">
                <Tag className="h-3.5 w-3.5" />
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-blue dark:text-white leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* CTA action hooks */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-850">
              <ProductDetailsActions slug={product.slug} name={product.name} />
            </div>

            {/* Technical Specifications Table */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-850">
              <h3 className="text-sm font-black uppercase tracking-wider text-brand-blue dark:text-white mb-4">
                Mechanical Specifications
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-3 font-bold uppercase">Specification Parameter</th>
                      <th className="p-3 font-bold uppercase">Certified Rating / Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30">
                        <td className="p-3 font-semibold bg-slate-50/30 dark:bg-slate-850/10 w-2/5">{key}</td>
                        <td className="p-3 font-medium">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Description, Features, Benefits, Applications */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-12">
          {/* Overview */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-brand-blue dark:text-white uppercase tracking-wider">
              Product Overview & Design
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          {/* Features vs Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Features */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-brand-blue dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
                Key Product Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-brand-blue dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
                Structural Benefits
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((ben, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Applications list */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-brand-blue dark:text-white uppercase tracking-wider">
              Recommended Applications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.applications.map((app, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 font-semibold"
                >
                  {app}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-black text-brand-blue dark:text-white uppercase tracking-wider mb-8">
            Related Roofing Accessories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((prod) => (
              <div
                key={prod.slug}
                className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between grow space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-brand-orange transition-colors truncate">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2">
                      {prod.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="inline-flex items-center text-xs font-bold text-brand-orange hover:text-brand-orange-light transition-colors"
                  >
                    View Specs
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
