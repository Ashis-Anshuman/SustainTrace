import React from 'react';
import {
  FiArrowRight,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';
import { MetricsPreviewCard } from './MetricsPreviewCard';
import { STATS_SUMMARY } from '../data/landingData';

export const Hero = ({ onOpenDemo, onOpenReport }) => {
  return (
    <section id="overview" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative background grid and gradient accents */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.100/40),theme(colors.slate.50))]"></div>
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_right,theme(colors.teal.100/30),transparent_70%)]"></div>
      
      {/* Top subtle grid pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      ></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header Content */}
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs mb-6 backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SEBI Mandated • NGRBC Compliant • BRSR Core Ready</span>
          </div>

          {/* Value Proposition Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Streamline Corporate BRSR &amp; ESG Disclosures Across{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              250+ Project Sites.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Automate bottom-up ESG data capture from remote manufacturing plants, mines, and operating units. 
            Deliver instant corporate roll-ups, CEA-aligned GHG accounting, and statutory assurance-ready disclosures for SEBI filing.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/35 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all cursor-pointer"
            >
              <span>Explore Portal Dashboard</span>
              <FiArrowRight className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onOpenReport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all cursor-pointer"
            >
              <FiFileText className="h-5 w-5 text-slate-500" />
              <span>View Sample BRSR Report</span>
            </button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-600" />
              9 NGRBC Principles Covered
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-600" />
              ISAE 3000 Reasonable Assurance
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-600" />
              Zero Spreadsheet Reconciliations
            </span>
          </div>

        </div>

        {/* Hero Visual Card / Dashboard Mockup */}
        <div className="mt-12 sm:mt-14 max-w-5xl mx-auto">
          <MetricsPreviewCard onOpenReport={onOpenReport} />
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {STATS_SUMMARY.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-xs p-4 sm:p-5 text-center shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
                {stat.label}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
