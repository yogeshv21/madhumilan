"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, Loader2 } from "lucide-react";
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
            className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-brand-blue p-5 text-white dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Request an Industrial Quote</h3>
                <p className="mt-1 text-xs text-brand-steel font-medium">
                  We reply with customized pricing configurations within 24 hours.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
                  <h4 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
                    Quote Request Received!
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xs">
                    Your design requirements have been routed to our technical engineering department. A quote will be sent to your email shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-light-blue transition-colors shadow-md"
                  >
                    Return to Page
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Company Name *
                      </label>
                      <input
                        {...register("company")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                        placeholder="Industrial Corp"
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-rose-500 font-medium">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        {...register("phone")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-500 font-medium">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                        placeholder="client@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Product Requirement *
                    </label>
                    <select
                      {...register("productRequirement")}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="standing-seam-roofing-clips">Standing Seam Roofing Clips (SSR Clips)</option>
                      <option value="foam-closer-strips">Foam Closer Strips</option>
                      <option value="roofing-accessories">Roofing Accessories (Ridge Caps, Trims)</option>
                      <option value="industrial-fasteners">Industrial Fasteners / Screws</option>
                      <option value="industrial-roofing-components">Industrial Roofing Components (Brackets)</option>
                      <option value="general-inquiry">General Cladding / Custom Fabrications</option>
                    </select>
                    {errors.productRequirement && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.productRequirement.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Technical Requirements & Quantities *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all resize-none"
                      placeholder="Please specify thickness, material grade, and estimated quantities required for your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded-lg bg-brand-orange p-3 text-sm font-semibold text-white hover:bg-brand-orange-light transition-all duration-200 disabled:bg-slate-400 shadow-md cursor-pointer hover:shadow-lg focus:outline-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
