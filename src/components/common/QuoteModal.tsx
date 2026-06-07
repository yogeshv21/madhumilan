"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, Loader2, User, Building2, Phone, Mail, ClipboardList, MessageSquare } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

const quoteFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^[+]?[0-9\s-]{10,20}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  productRequirement: z.string().min(1, { message: "Please select a product category." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export default function QuoteModal() {
  const { isOpen, closeQuote, selectedProduct } = useQuote();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      productRequirement: "",
      message: "",
    },
  });

  // Pre-fill selected product if set from dynamic trigger
  useEffect(() => {
    if (selectedProduct) {
      setValue("productRequirement", selectedProduct);
    }
  }, [selectedProduct, setValue]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuote();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeQuote]);

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Inquiry Submitted successfully:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    closeQuote();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-brand-blue p-6 text-white dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider">Request an Industrial Quote</h3>
                <p className="mt-1 text-xs text-brand-steel font-bold">
                  We reply with customized pricing configurations within 24 hours.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-xl p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="relative inline-flex items-center justify-center p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 mb-6 ring-8 ring-emerald-500/5">
                    <CheckCircle className="h-12 w-12 animate-pulse" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-brand-blue dark:text-white">
                    Quote Request Received!
                  </h4>
                  <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                    Your design requirements have been routed to our technical engineering department. A quote will be sent to your email shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 cursor-pointer rounded-xl bg-brand-blue hover:bg-brand-orange text-xs sm:text-sm font-bold uppercase tracking-wider text-white px-8 py-3.5 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none"
                  >
                    Return to Page
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-550 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                          <User className="h-4 w-4" />
                        </span>
                        <input
                          {...register("name")}
                          className="w-full rounded-xl border border-slate-250 dark:border-slate-700/80 bg-slate-50/30 dark:bg-slate-850/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all shadow-xs"
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-[10px] text-rose-500 font-semibold">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-555 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                        Company Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                          <Building2 className="h-4 w-4" />
                        </span>
                        <input
                          {...register("company")}
                          className="w-full rounded-xl border border-slate-250 dark:border-slate-700/80 bg-slate-50/30 dark:bg-slate-850/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all shadow-xs"
                          placeholder="Industrial Corp"
                        />
                      </div>
                      {errors.company && (
                        <p className="mt-1 text-[10px] text-rose-500 font-semibold">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-555 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                          <Phone className="h-4 w-4" />
                        </span>
                        <input
                          {...register("phone")}
                          className="w-full rounded-xl border border-slate-250 dark:border-slate-700/80 bg-slate-50/30 dark:bg-slate-855/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all shadow-xs"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-[10px] text-rose-500 font-semibold">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-555 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                          <Mail className="h-4 w-4" />
                        </span>
                        <input
                          {...register("email")}
                          type="email"
                          className="w-full rounded-xl border border-slate-250 dark:border-slate-700/80 bg-slate-50/30 dark:bg-slate-855/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all shadow-xs"
                          placeholder="client@company.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-[10px] text-rose-500 font-semibold">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Dropdown */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-555 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                      Product Requirement *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                        <ClipboardList className="h-4 w-4" />
                      </span>
                      <select
                        {...register("productRequirement")}
                        className="w-full rounded-xl border border-slate-250 dark:border-slate-700/80 bg-slate-50/30 dark:bg-slate-855/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all shadow-xs appearance-none cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        <option value="standing-seam-roofing-clips">Standing Seam Roofing Clips (SSR Clips)</option>
                        <option value="foam-closer-strips">Foam Closer Strips</option>
                        <option value="roofing-accessories">Roofing Accessories (Ridge Caps, Trims)</option>
                        <option value="industrial-fasteners">Industrial Fasteners / Screws</option>
                        <option value="industrial-roofing-components">Industrial Roofing Components (Brackets)</option>
                        <option value="general-inquiry">General Cladding / Custom Fabrications</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                    {errors.productRequirement && (
                      <p className="mt-1 text-[10px] text-rose-500 font-semibold">{errors.productRequirement.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-555 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                      Technical Requirements & Quantities *
                    </label>
                    <div className="relative">
                      <span className="absolute top-3 left-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                        <MessageSquare className="h-4 w-4" />
                      </span>
                      <textarea
                        {...register("message")}
                        rows={4}
                        className="w-full rounded-xl border border-slate-250 dark:border-slate-700/80 bg-slate-50/30 dark:bg-slate-855/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all resize-none shadow-xs"
                        placeholder="Please specify thickness, material grade, and estimated quantities required for your project..."
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-[10px] text-rose-500 font-semibold">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded-xl bg-brand-orange p-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-orange-light transition-all duration-200 disabled:bg-slate-400 shadow-md cursor-pointer hover:shadow-lg focus:outline-none ring-4 ring-transparent focus:ring-brand-orange/10"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" />
                        Processing Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Technical Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
