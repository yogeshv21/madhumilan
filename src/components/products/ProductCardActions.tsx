"use client";

import React from "react";
import { useQuote } from "@/context/QuoteContext";

export default function ProductCardActions({ slug }: { slug: string }) {
  const { openQuote, setSelectedProduct } = useQuote();

  const handleInquiry = () => {
    setSelectedProduct(slug);
    openQuote();
  };

  return (
    <button
      onClick={handleInquiry}
      className="cursor-pointer inline-flex items-center rounded-lg bg-brand-blue hover:bg-brand-light-blue px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors focus:outline-none"
    >
      Get Quote
    </button>
  );
}
