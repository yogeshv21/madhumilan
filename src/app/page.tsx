import React from "react";
import Hero from "@/components/home/Hero";
import CompanyOverview from "@/components/home/CompanyOverview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ConfiguratorPromo from "@/components/home/ConfiguratorPromo";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import IndustriesServed from "@/components/home/IndustriesServed";
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
      <ConfiguratorPromo />
      <ServicesOverview />
      <WhyChooseUs />
      <IndustriesServed />
      <ManufacturingExcellence />
      <ProductApplications />
      <TestimonialsSection />
      <RequestQuoteCTA />
    </>
  );
}

