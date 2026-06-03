"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(images[0] || "/images/products/ssr-clips.png");

  return (
    <div className="space-y-4">
      {/* Active Image */}
      <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800 shadow-md">
        <Image
          src={activeImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 transition-all focus:outline-none ${
                activeImage === img ? "border-brand-orange" : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
