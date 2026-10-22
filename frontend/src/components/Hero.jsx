import React from 'react';
import {
  FiArrowRight,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';
import { MetricsPreviewCard } from './MetricsPreviewCard';
import { STATS_SUMMARY } from '../data/landingData';

export const Hero = ({ onOpenLogin, onOpenDemo, onOpenReport }) => {
  const handleOpenPortal = onOpenLogin || onOpenDemo;

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
          
          {/* Handcrafted Botanical Badge Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/90 bg-emerald-50/95 px-4 py-1.5 text-xs font-semibold text-emerald-900 shadow-xs mb-6 backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-emerald-700 font-bold">🌱 Handcrafted for Indian Enterprise</span>
            <span className="text-emerald-400">•</span>
            <span>Living Forest &amp; Leaf Ledger</span>
            <span className="rounded bg-emerald-200/70 px-1.5 py-0.5 text-[10px] font-bold text-emerald-950 font-mono">SEBI 2023</span>
          </div>

          {/* Value Proposition Headline with Human Editorial Serif Accent */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14]">
            Streamline Corporate BRSR &amp; ESG Disclosures Across{' '}
            <span className="font-serif italic font-normal text-emerald-800 underline decoration-emerald-300 decoration-wavy decoration-1 underline-offset-8">
              250+ Project Sites.
            </span>
          </h1>

          {/* Subtitle with Genuine Human Voice */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            From remote manufacturing plant floors and solar substations to board-level statutory disclosures. 
            Handcrafted with mathematical rigor to eliminate spreadsheet chaos with automated CEA v19 emission accounting, verified cryptographic audit vaults, and instant SEBI Annexure I rollups.
          </p>

          {/* Dual CTAs in Forest & Leaf Palette */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleOpenPortal}
              className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 hover:shadow-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all cursor-pointer border border-emerald-800"
            >
              <span>Explore Portal Dashboard</span>
              <FiArrowRight className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onOpenReport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-6 py-3.5 text-base font-semibold text-slate-800 shadow-xs hover:bg-emerald-50/50 hover:border-emerald-300 hover:text-emerald-900 transition-all cursor-pointer"
            >
              <FiFileText className="h-5 w-5 text-emerald-700" />
              <span>View Sample BRSR Report</span>
            </button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
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
