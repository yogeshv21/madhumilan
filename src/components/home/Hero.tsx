"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, CheckCircle2 } from "lucide-react";

export default function Hero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark -mt-16 lg:-mt-20">
      {/* Background Image with dark industrial gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-0 scale-105 transform transition-transform duration-[10s]"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-0" />

      {/* Grid background mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Trust Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange-light text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Shield className="h-3.5 w-3.5" />
            ISO 9001:2015 Certified Manufacturer
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6"
          >
            Pre-Engineered Steel Buildings <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
              & Heavy Structural Steel
            </span>{" "}
            Systems
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl"
          >
            Global leaders in the engineering, fabrication, and supply of custom steel buildings, structural steel frames, and smart warehouse racking systems. Built for structural longevity and rapid bolted site erection.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link
              href="/configurator"
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange hover:bg-brand-orange-light px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Build Your Design
              <ArrowRight className="h-4.5 w-4.5 animate-pulse" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all"
            >
              Explore Solutions
            </Link>
          </motion.div>

          {/* Trust Highlights Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/5 p-2 text-brand-orange">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-black text-white leading-none">18+ Years</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Structural Leadership</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/5 p-2 text-brand-orange">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-black text-white leading-none">AISC & MBMA</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Design Conformance</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/5 p-2 text-brand-orange">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-black text-white leading-none">75,000+ MT</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Annual Fabrication Capacity</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
