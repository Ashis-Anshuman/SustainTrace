import React, { useState } from 'react';
import {
  FiActivity,
  FiDroplet,
  FiUsers,
  FiShield,
  FiTrendingDown,
  FiTrendingUp,
  FiCheckCircle,
  FiExternalLink
} from 'react-icons/fi';

export const MetricsPreviewCard = ({ onOpenReport }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('FY24');

  const data = selectedPeriod === 'FY24'
    ? {
        scopeTotal: '148,920',
        scope1: '82,410',
        scope2: '66,510',
        ghgTrend: '-14.2% YoY',
        waterPercent: '68.4%',
        waterTrend: '+8.6% YoY',
        diversityPercent: '34.2%',
        diversityTrend: '+5.1% YoY',
        sebiScore: '98.6%',
        sitesVerified: '254 / 254',
        assuranceStatus: 'Reasonable Assurance Level A',
      }
    : {
        scopeTotal: '173,600',
        scope1: '96,120',
        scope2: '77,480',
        ghgTrend: 'Baseline Year',
        waterPercent: '59.8%',
        waterTrend: 'Baseline Year',
        diversityPercent: '29.1%',
        diversityTrend: 'Baseline Year',
        sebiScore: '89.2%',
        sitesVerified: '242 / 242',
        assuranceStatus: 'Limited Assurance Baseline',
      };

  return (
    <div className="relative rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/50">
      
      {/* Top Card Bar with Live Tag & Fiscal Year Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900">
                Live Enterprise Rollup
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-600">
                250+ Sites Live
              </span>
            </div>
            <p className="text-xs text-slate-500">
              SEBI Circular / Annexure I & II Consolidation
            </p>
          </div>
        </div>

        {/* Period Selector Toggle */}
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedPeriod('FY24')}
            className={`rounded-md px-3 py-1 font-medium transition-all cursor-pointer ${
              selectedPeriod === 'FY24'
                ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FY 2024-25 (Current)
          </button>
          <button
            type="button"
            onClick={() => setSelectedPeriod('FY23')}
            className={`rounded-md px-3 py-1 font-medium transition-all cursor-pointer ${
              selectedPeriod === 'FY23'
                ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FY 2023-24 (Base)
          </button>
        </div>
      </div>

      {/* 4 Core Metrics Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Scope 1 & 2 Emissions */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Scope 1 & 2 GHG
            </span>
            <div className="rounded-lg bg-emerald-100/70 p-1.5 text-emerald-700">
              <FiActivity className="h-4 w-4" />
            </div>
          </div>
          
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
              {data.scopeTotal}
            </span>
            <span className="text-xs font-medium text-slate-500">tCO₂e</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
              <FiTrendingDown className="h-3.5 w-3.5" />
              {data.ghgTrend}
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              S1: {data.scope1} | S2: {data.scope2}
            </span>
          </div>
        </div>

        {/* Metric 2: Water Recycled */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-teal-200 hover:bg-teal-50/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Water Recycled %
            </span>
            <div className="rounded-lg bg-teal-100/70 p-1.5 text-teal-700">
              <FiDroplet className="h-4 w-4" />
            </div>
          </div>
          
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
              {data.waterPercent}
            </span>
            <span className="text-xs font-medium text-slate-500">of total draw</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-teal-700">
              <FiTrendingUp className="h-3.5 w-3.5" />
              {data.waterTrend}
            </span>
            <span className="text-[11px] text-slate-500">Target: 75%</span>
          </div>
        </div>

        {/* Metric 3: Gender Diversity Ratio */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Gender Diversity
            </span>
            <div className="rounded-lg bg-blue-100/70 p-1.5 text-blue-700">
              <FiUsers className="h-4 w-4" />
            </div>
          </div>
          
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
              {data.diversityPercent}
            </span>
            <span className="text-xs font-medium text-slate-500">perm. staff</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-blue-700">
              <FiTrendingUp className="h-3.5 w-3.5" />
              {data.diversityTrend}
            </span>
            <span className="text-[11px] text-slate-500">Equal Pay: 100%</span>
          </div>
        </div>

        {/* Metric 4: SEBI Compliance Score */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              SEBI Compliance
            </span>
            <div className="rounded-lg bg-emerald-100/70 p-1.5 text-emerald-700">
              <FiShield className="h-4 w-4" />
            </div>
          </div>
          
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-emerald-700 font-mono">
              {data.sebiScore}
            </span>
            <span className="text-xs font-medium text-slate-500">SEBI Core</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
              <FiCheckCircle className="h-3.5 w-3.5" />
              Assured
            </span>
            <span className="text-[11px] text-slate-500">140 Indicators</span>
          </div>
        </div>

      </div>

      {/* Audit Assurance & Verification Footnote Bar */}
      <div className="mt-5 rounded-xl border border-slate-200/80 bg-slate-900 p-3.5 text-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <FiShield className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-white">Statutory Assurance Status:</span>
              <span className="inline-flex items-center gap-1 rounded bg-emerald-950 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-800">
                <FiCheckCircle className="h-3 w-3" />
                {data.assuranceStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Direct evidence linked for {data.sitesVerified} sites • Timestamped SHA-256 vault
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenReport}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 border border-slate-700 transition-colors cursor-pointer"
        >
          <span>Audit Preview</span>
          <FiExternalLink className="h-3 w-3" />
        </button>
      </div>

    </div>
  );
};
