import React, { useState } from 'react';
import {
  FiCpu,
  FiLayers,
  FiLock,
  FiCheck,
  FiArrowRight,
  FiZap,
  FiShield,
  FiDownload
} from 'react-icons/fi';
import { CAPABILITIES } from '../data/landingData';

export const FeatureGrid = ({ onOpenDemo }) => {
  const [activeFeatureId, setActiveFeatureId] = useState(CAPABILITIES[0].id);

  const iconMap = {
    'ghg-engine': FiCpu,
    'hierarchical-rollup': FiLayers,
    'assurance-vault': FiLock,
    'sebi-exporter': FiDownload,
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <FiShield className="h-3.5 w-3.5 text-emerald-600" />
            <span>Enterprise Compliance Engine</span>
          </div>
          
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Purpose-Built for SEBI BRSR &amp; Multi-Site Assurance
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Generic ESG spreadsheets crumble when handling 250+ operating units and statutory reasonable assurance. SustainTrace automates the complete data pipeline from utility meter to stock exchange filing.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CAPABILITIES.map((cap) => {
            const Icon = iconMap[cap.id] || FiZap;
            const isSelected = activeFeatureId === cap.id;

            return (
              <div
                key={cap.id}
                onClick={() => setActiveFeatureId(cap.id)}
                className={`group relative rounded-2xl border p-6 sm:p-8 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/20 shadow-md ring-1 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Top Badge & Metric Callout */}
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                      {cap.badge}
                    </span>
                    <span className="mt-1 text-[11px] font-mono font-medium text-emerald-700">
                      {cap.metricLabel}: <strong className="text-slate-900">{cap.metricValue}</strong>
                    </span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {cap.title}
                </h3>
                
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {cap.shortDesc}
                </p>

                <p className="mt-3 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  {cap.fullDesc}
                </p>

                {/* Feature Bullet List */}
                <div className="mt-5 space-y-2">
                  {cap.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <FiCheck className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Feature Interactive Highlight Strip */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Auditor-Endorsed Architecture
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Need to see how your specific plant data structure maps to SEBI Core?
            </h4>
            <p className="text-sm text-slate-600">
              Schedule a technical walk-through with our sustainability engineering team.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Schedule Architecture Review</span>
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
