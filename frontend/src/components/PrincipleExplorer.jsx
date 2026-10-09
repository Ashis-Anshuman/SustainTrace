import React, { useState } from 'react';
import {
  FiCheckCircle,
  FiShield,
  FiTrendingUp,
  FiCheck
} from 'react-icons/fi';
import { NGRBC_PRINCIPLES } from '../data/landingData';

export const PrincipleExplorer = () => {
  const [activePrincipleId, setActivePrincipleId] = useState('p6'); // Default to P6 (Environment) as it's the core focus

  const activePrinciple = NGRBC_PRINCIPLES.find(p => p.id === activePrincipleId) || NGRBC_PRINCIPLES[0];

  return (
    <section id="principles" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <FiCheckCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>National Guidelines on Responsible Business Conduct (NGRBC)</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Interactive Principle Explorer: The 9 NGRBC Pillars
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            SEBI mandates reporting across 9 distinct principles. Select any principle below to examine the specific Essential and Leadership Indicators captured and verified across your sites.
          </p>
        </div>

        {/* 9 Principles Pill / Button Selector */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
          {NGRBC_PRINCIPLES.map((principle) => {
            const isSelected = activePrincipleId === principle.id;
            return (
              <button
                key={principle.id}
                type="button"
                onClick={() => setActivePrincipleId(principle.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500 ring-offset-2'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                }`}
              >
                <span className={`font-mono text-xs ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {principle.code}
                </span>
                <span className="truncate max-w-[150px] sm:max-w-none">
                  {principle.title.split(' ')[0]} {principle.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Principle Detail Card */}
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
            
            {/* Detail Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {activePrinciple.code}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {activePrinciple.category}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {activePrinciple.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 italic">
                  "{activePrinciple.tagline}"
                </p>
              </div>

              {/* Counts Badge */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-right">
                  <div className="text-xs text-slate-500 font-medium">SEBI Mandatory</div>
                  <div className="font-mono text-lg font-bold text-slate-900">
                    {activePrinciple.essentialCount} Essential Indicators
                  </div>
                </div>
                <div className="text-xs text-emerald-700 font-medium">
                  + {activePrinciple.leadershipCount} Leadership Indicators
                </div>
              </div>
            </div>

            {/* Core KPI Banner */}
            <div className="mt-6 rounded-xl bg-emerald-50/70 border border-emerald-200 p-4 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-600 p-2 text-white shrink-0">
                <FiTrendingUp className="h-4 w-4" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-emerald-900">Key BRSR Core Metric: </span>
                <span className="text-emerald-800 font-medium">{activePrinciple.coreKpi}</span>
              </div>
            </div>

            {/* Dual Column: Essential Indicators vs Leadership Indicators */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Essential Indicators (Mandatory) */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600"></span>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                      Essential Indicators (Mandatory)
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    100% Assurance
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {activePrinciple.essentialIndicators.map((ind, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-200/80 text-emerald-800">
                        <FiCheck className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership Indicators (Voluntary) */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500"></span>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                      Leadership Indicators (Voluntary)
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-medium text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded">
                    ESG Differentiation
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {activePrinciple.leadershipIndicators.map((lind, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-200/80 text-teal-800">
                        <FiCheck className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{lind}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom-up Data Evidence Inputs */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Captured Source Documents (Plant / Site Level):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activePrinciple.dataInputs.map((input, inIdx) => (
                      <span
                        key={inIdx}
                        className="rounded-md bg-white border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600"
                      >
                        📄 {input}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Assurance Note */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3 text-xs text-slate-600">
              <FiShield className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Assurance Auditor Protocol: </strong>
                {activePrinciple.assuranceFocus}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
