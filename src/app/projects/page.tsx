import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, SquareStack, CheckCircle2, ChevronRight, Briefcase } from "lucide-react";
import { projects, projectsPageContent } from "@/data/projects";
import { constructMetadata } from "@/lib/metadata";
import IndiaMapWrapper from "@/components/projects/IndiaMapWrapper";

export const metadata: Metadata = constructMetadata({
  title: "Completed PEB & Steel Projects",
  description: "Explore our portfolio of completed industrial warehouses, manufacturing foundry shops, commercial composite steel decks, and custom cold storage projects.",
  slug: "projects",
});

export default function ProjectsPage() {
  const content = projectsPageContent;

  return (
    <div className="bg-[#f8fafc] pb-24">
      {/* Header Banner */}
      <section className="relative bg-brand-dark text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-brand-light-blue/20 rounded-full blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center lg:text-left">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-black uppercase tracking-widest text-brand-orange">
            {content.hero.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            {content.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-350 max-w-3xl leading-relaxed mx-auto lg:mx-0">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Interactive India Map */}
      <section className="mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IndiaMapWrapper />
      </section>

      {/* Projects Grid Section */}
      <section className="mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden group p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/50 shadow-[0_15px_30px_-5px_rgba(15,23,42,0.04)] hover:shadow-[0_30px_60px_-15px_rgba(242,100,25,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Visual Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-brand-orange-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-6">
                {/* Type Badge & Location */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-orange/5 text-brand-orange text-xs font-bold uppercase tracking-wider">
                    <Briefcase className="h-3 w-3" />
                    {project.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-brand-orange/70" />
                    {project.location}
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <h2 className="text-2xl font-black text-brand-blue tracking-tight leading-tight group-hover:text-brand-orange transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-bold mt-1">
                    Client: {project.client}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {project.description}
                </p>

                {/* Stats / Details */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <SquareStack className="h-5 w-5 text-brand-orange/75 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total Area</p>
                      <p className="text-sm font-black text-brand-blue mt-1 leading-none">{project.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="h-5 w-5 text-brand-orange/75 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Year Completed</p>
                      <p className="text-sm font-black text-brand-blue mt-1 leading-none">{project.year}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights checklist */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Project Highlights & Performance
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="bg-[#f8fafc] border border-slate-200/30 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2.5 hover:bg-slate-50 hover:border-slate-200 transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight font-medium">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Bottom Scope list */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  Engineering Scope Delivered
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange-light transition-colors group/btn"
                >
                  Consult Similar Build
                  <ChevronRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Callout Block */}
      <section className="mt-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center bg-white border border-slate-200/60 rounded-3xl p-10 lg:p-14 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-orange/5 rounded-full blur-xl" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-light-blue/5 rounded-full blur-xl" />

        <h3 className="text-2xl font-black text-brand-blue tracking-tight mb-4">
          {content.callout.title}
        </h3>
        <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
          {content.callout.description}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold uppercase tracking-wider px-7 py-4 shadow-lg hover:shadow-xl hover:shadow-brand-orange/20 transition-all duration-200 focus:outline-none"
        >
          {content.callout.buttonLabel}
        </Link>
      </section>
    </div>
  );
}

