import React from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-md space-y-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
          <AlertTriangle className="h-6 w-6" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-brand-blue dark:text-white leading-none">404</h1>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Page Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 shadow-md transition-colors w-full focus:outline-none"
        >
          Return to Homepage
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
