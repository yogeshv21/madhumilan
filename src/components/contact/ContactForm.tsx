"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
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

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      productRequirement: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact inquiry submitted successfully:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    reset();
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-xs min-h-[300px]">
        <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce mb-4" />
        <h3 className="text-xl font-bold text-slate-850 dark:text-white">
          Inquiry Submitted Successfully!
        </h3>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
          Thank you for contacting us. A sales engineer from our GIDC Ahmedabad office will review your specifications and contact you shortly.
        </p>
        <button
          onClick={handleReset}
          className="mt-6 rounded-lg bg-brand-blue hover:bg-brand-light-blue px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xs"
    >
      <h3 className="text-base font-bold text-brand-blue dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        Technical Inquiry Form
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
            Full Name *
          </label>
          <input
            {...register("name")}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 p-2.5 text-xs text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-[10px] text-rose-500 font-medium">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
            Company Name *
          </label>
          <input
            {...register("company")}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 p-2.5 text-xs text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
            placeholder="Engineering Corp Ltd"
          />
          {errors.company && (
            <p className="mt-1 text-[10px] text-rose-500 font-medium">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
            Contact Number *
          </label>
          <input
            {...register("phone")}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 p-2.5 text-xs text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
            placeholder="+91 98765 43210"
          />
          {errors.phone && (
            <p className="mt-1 text-[10px] text-rose-500 font-medium">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
            Email Address *
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 p-2.5 text-xs text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
            placeholder="client@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-[10px] text-rose-500 font-medium">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
          Product Requirement *
        </label>
        <select
          {...register("productRequirement")}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 p-2.5 text-xs text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
        >
          <option value="">Select Product Category</option>
          <option value="ssr-clips">Standing Seam Roofing Clips (SSR Clips)</option>
          <option value="foam-closers">Foam Closer Strips</option>
          <option value="accessories">Roofing Accessories (Ridge Caps, Trims)</option>
          <option value="fasteners">Industrial Fasteners / Screws</option>
          <option value="components">Industrial Roofing Components (Brackets)</option>
          <option value="custom">Custom Metal Stamping / Stretched Parts</option>
        </select>
        {errors.productRequirement && (
          <p className="mt-1 text-[10px] text-rose-500 font-medium">{errors.productRequirement.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
          Detailed Message & Specifications *
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 p-2.5 text-xs text-slate-900 dark:text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all resize-none"
          placeholder="Please describe thickness, material grade, profiles, quantities, and site logistics details..."
        />
        {errors.message && (
          <p className="mt-1 text-[10px] text-rose-500 font-medium">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-brand-orange p-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-orange-light transition-all disabled:bg-slate-400 shadow-md hover:shadow-lg cursor-pointer focus:outline-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Inquiry...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Inquiry Message
          </>
        )}
      </button>
    </form>
  );
}
