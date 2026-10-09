import React, { useState } from 'react';
import {
  FiActivity,
  FiDatabase,
  FiCheckCircle,
  FiFileText,
  FiDownload,
  FiZap,
  FiUsers,
  FiTrendingDown
} from 'react-icons/fi';
import { GROUP_CORPORATE_KPI } from '../../data/portalData';

export const GroupAdminPanel = ({ onOpenReportModal }) => {
  const [selectedSubId, setSelectedSubId] = useState('MEIL Green Power Ltd');
  const [selectedBu, setSelectedBu] = useState('Eastern Solar BU');
  const [validationRunning, setValidationRunning] = useState(false);
  const [xbrlExportAlert, setXbrlExportAlert] = useState(false);

  const kpi = GROUP_CORPORATE_KPI;

  const handleRunValidation = () => {
    setValidationRunning(true);
    setTimeout(() => {
      setValidationRunning(false);
    }, 1200);
  };

  const handleExportXbrl = () => {
    setXbrlExportAlert(true);
    setTimeout(() => setXbrlExportAlert(false), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-800 border border-purple-200 font-mono">
              CONGLOMERATE HQ: MEIL GROUP
            </span>
            <span className="text-xs text-slate-500 font-medium">Top Admin View • 254 Total Sites</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
            Group Corporate ESG &amp; SEBI Master Console
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Enterprise-wide consolidation, statutory compliance validation, and board-level BRSR filing generation.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportXbrl}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <FiDownload className="h-4 w-4 text-purple-600" />
            <span>Generate SEBI XBRL</span>
          </button>

          <button
            type="button"
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700 transition-colors cursor-pointer shadow-xs"
          >
            <FiFileText className="h-4 w-4" />
            <span>Annexure I Board Preview</span>
          </button>
        </div>
      </div>

      {/* XBRL Alert */}
      {xbrlExportAlert && (
        <div className="rounded-xl bg-purple-50 border border-purple-200 p-4 text-xs text-purple-900 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="h-5 w-5 text-purple-600 shrink-0" />
            <span>
              <strong>XBRL Package Generated:</strong> <code>MEIL_BRSR_CORE_FY2025_v1.0.xbrl</code> validated against NSE/BSE Electronic Filing Schema with digital token hash.
            </span>
          </div>
        </div>
      )}

      {/* SECTION 1: Master Corporate Dashboard KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Scope 1 & 2 Emissions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Conglomerate GHG Total
            </span>
            <div className="rounded-lg bg-purple-50 p-1.5 text-purple-700">
              <FiActivity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            {kpi.totalGhgEmissions} <span className="text-xs font-sans text-slate-500 font-normal">tCO₂e</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-700 font-medium">
            <FiTrendingDown className="h-3.5 w-3.5" />
            <span>{kpi.ghgYoYChange} YoY Across 254 Sites</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 font-mono">
            S1: {kpi.conglomerateScope1} | S2: {kpi.conglomerateScope2}
          </div>
        </div>

        {/* Group Energy Intensity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              GHG Intensity / Turnover
            </span>
            <div className="rounded-lg bg-teal-50 p-1.5 text-teal-700">
              <FiZap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            12.80 <span className="text-xs font-sans text-slate-500 font-normal">tCO₂e / ₹ Cr</span>
          </div>
          <div className="mt-1 text-xs text-teal-700 font-medium">
            Turnover: ₹11,634.37 Crore
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            SEBI BRSR Core Metric 1c Aligned
          </div>
        </div>

        {/* Gender Diversity Ratio */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Workforce Diversity
            </span>
            <div className="rounded-lg bg-blue-50 p-1.5 text-blue-700">
              <FiUsers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            {kpi.genderDiversityPct}
          </div>
          <div className="mt-1 text-xs text-blue-700 font-medium">
            +5.1% YoY Permanent Staff
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Board Diversity: 28.5%
          </div>
        </div>

        {/* SEBI Compliance Score */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              SEBI Completeness
            </span>
            <div className="rounded-lg bg-emerald-50 p-1.5 text-emerald-700">
              <FiCheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700 font-mono">
            {kpi.sebiCompleteness}
          </div>
          <div className="mt-1 text-xs text-emerald-700 font-medium">
            {kpi.sitesApproved} of {kpi.totalSites} Sites Signed Off
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Pre-filing status: {kpi.sebiFilingsStatus}
          </div>
        </div>

      </div>

      {/* SECTION 2: Hierarchy Drill-Down Cascading Selector */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Enterprise Hierarchy Drill-Down Inspector
            </h2>
            <p className="text-xs text-slate-500">
              Select any subsidiary or business unit to examine granular emissions and site progress.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
            5 Subsidiaries • 254 Sites
          </span>
        </div>

        {/* Cascading Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              1. Group Entity
            </label>
            <div className="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-xs font-bold text-slate-900">
              MEIL Conglomerate (All Divisions)
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              2. Subsidiary Company
            </label>
            <select
              value={selectedSubId}
              onChange={(e) => setSelectedSubId(e.target.value)}
              className="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              {kpi.subsidiaries.map(s => (
                <option key={s.name} value={s.name}>{s.name} ({s.sites} sites)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              3. Business Unit / Operating Division
            </label>
            <select
              value={selectedBu}
              onChange={(e) => setSelectedBu(e.target.value)}
              className="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="Eastern Solar BU">Eastern Solar BU (Unit 1 - Unit 6)</option>
              <option value="Western Substation BU">Western Substation BU (Unit 7 - Unit 14)</option>
              <option value="Transmission Grid North">Transmission Grid North (Unit 15 - Unit 38)</option>
            </select>
          </div>
        </div>

        {/* Selected Entity Breakdown Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              <FiDatabase className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Selected Division Details:</div>
              <div className="text-sm font-bold text-slate-900">{selectedSubId} &gt; {selectedBu}</div>
              <div className="text-xs text-slate-500">6 Verified Sites • 4,892 MWh Energy • LTIFR 0.00</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-800">
              ✓ Ready for Board Audit
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: SEBI Pre-Filing Validation Engine */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              SEBI Statutory Pre-Filing Validation Engine
            </h2>
            <p className="text-xs text-slate-500">
              Automated rules test Sections A, B, and C against Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunValidation}
            disabled={validationRunning}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <FiCheckCircle className="h-4 w-4" />
            <span>{validationRunning ? 'Executing 140 Check Rules...' : 'Rerun Statutory Validation'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Section A: General Disclosures */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Section A: General</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                100% Passed
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Entity details, employee breakdown, turnover and plant site geographies fully reconciled.
            </p>
          </div>

          {/* Section B: Management & Process */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Section B: Management</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                100% Passed
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Board oversight frequency, committee reviews, and NGRBC policy statements approved.
            </p>
          </div>

          {/* Section C: Principle-wise Performance */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Section C: Principles (P1-P9)</span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                138 / 140 Validated
              </span>
            </div>
            <p className="text-xs text-slate-600">
              138 Essential &amp; Leadership indicators clear. 2 minor site calibration manifests under review.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
