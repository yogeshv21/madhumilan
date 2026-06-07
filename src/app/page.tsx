import React from "react";
import Hero from "@/components/home/Hero";
import CompanyOverview from "@/components/home/CompanyOverview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProjectsOverview from "@/components/home/ProjectsOverview";
import ManufacturingExcellence from "@/components/home/ManufacturingExcellence";
import ProductApplications from "@/components/home/ProductApplications";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import RequestQuoteCTA from "@/components/home/RequestQuoteCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyOverview />
      <FeaturedProducts />
      <ServicesOverview />
      <WhyChooseUs />
      <ProjectsOverview />
      <ManufacturingExcellence />
      <ProductApplications />
      <TestimonialsSection />
      <RequestQuoteCTA />
    </>
  );
}

