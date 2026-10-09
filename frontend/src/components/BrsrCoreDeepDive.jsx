import React from 'react';
import {
  FiCheckCircle,
  FiShield,
  FiFileText,
  FiCheck
} from 'react-icons/fi';
import { BRSR_CORE_ATTRIBUTES } from '../data/landingData';

export const BrsrCoreDeepDive = ({ onOpenReport }) => {
  return (
    <section id="brsr-core" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <FiShield className="h-3.5 w-3.5 text-emerald-600" />
            <span>SEBI Circular July 2023 Compliance</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            The 9 Mandated Attributes of BRSR Core
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            SEBI mandates the top 1,000 listed entities to obtain <strong className="text-slate-900 font-semibold">Reasonable Assurance</strong> on the 9 key ESG attributes of BRSR Core. SustainTrace maps all 9 attributes directly to verifiable evidentiary records.
          </p>
        </div>

        {/* 9 Attributes Matrix Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {BRSR_CORE_ATTRIBUTES.map((attr) => (
            <div
              key={attr.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {attr.code}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <FiCheckCircle className="h-3.5 w-3.5" />
                  Reasonable Assured
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {attr.title}
              </h3>

              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                {attr.scope}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>SEBI Annexure I Metric</span>
                <span className="text-emerald-600 font-semibold">100% Pre-Mapped</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout: Standard ESG vs SustainTrace */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Audit Readiness Comparison
              </span>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                Why Conventional Spreadsheets Fail Reasonable Assurance
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Limited assurance only requires high-level inquiry, but SEBI’s Reasonable Assurance requires substantive testing, source document inspection, and traceable computation methodologies.
              </p>
              
              <div className="mt-5 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <FiCheck className="h-4 w-4 text-emerald-600 stroke-[3]" />
                  <span>Tamper-evident SHA-256 logs for every kWh &amp; kiloliter entered</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="h-4 w-4 text-emerald-600 stroke-[3]" />
                  <span>Standardized CEA v19 emission factors updated annually</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="h-4 w-4 text-emerald-600 stroke-[3]" />
                  <span>Direct reconciliation with financial statements for turnover intensity</span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Report Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>Sample Annexure I Extract</span>
                <span className="font-mono text-emerald-700">SEBI Taxonomy v2023.1</span>
              </div>

              <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Scope 1 (tCO₂e):</span>
                  <span className="font-bold text-slate-900">82,410.00</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Scope 2 (tCO₂e):</span>
                  <span className="font-bold text-slate-900">66,510.00</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Turnover Intensity:</span>
                  <span className="font-bold text-emerald-700">12.80 tCO₂e / ₹ Cr</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Water Recycled (%):</span>
                  <span className="font-bold text-slate-900">68.4%</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenReport}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <FiFileText className="h-3.5 w-3.5" />
                <span>Launch Interactive Report Viewer</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
