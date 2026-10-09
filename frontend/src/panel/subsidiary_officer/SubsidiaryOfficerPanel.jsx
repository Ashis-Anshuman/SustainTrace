import React, { useState } from 'react';
import {
  FiLock,
  FiSend,
  FiBell
} from 'react-icons/fi';
import {
  SUBSIDIARY_SITES_PROGRESS,
  SUBSIDIARY_PRINCIPLES_SUMMARY
} from '../../data/portalData';

export const SubsidiaryOfficerPanel = () => {
  const sites = SUBSIDIARY_SITES_PROGRESS;
  const [activePrincipleTab, setActivePrincipleTab] = useState('p6');
  const [isLockedAndForwarded, setIsLockedAndForwarded] = useState(false);
  const [nudgeAlert, setNudgeAlert] = useState('');

  const handleNudgeSite = (siteName) => {
    setNudgeAlert(`Automated reminder & checklist dispatched to ${siteName} facility manager.`);
    setTimeout(() => setNudgeAlert(''), 3500);
  };

  const handleForwardToGroup = () => {
    setIsLockedAndForwarded(true);
  };

  const overallSubsidiaryProgress = Math.round(
    sites.reduce((acc, s) => acc + s.completionPct, 0) / sites.length
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-800 border border-blue-200 font-mono">
              SUBSIDIARY: MEIL GREEN POWER LTD
            </span>
            <span className="text-xs text-slate-500 font-medium">38 Total Facilities</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
            Subsidiary Consolidation &amp; NGRBC Governance
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Consolidate plant site readings, inspect NGRBC 9 principles alignment, and forward verified bundles to Group Corporate.
          </p>
        </div>

        {/* Action Bar / Forward Upstream */}
        <div className="flex items-center gap-3">
          {isLockedAndForwarded ? (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-800">
              <FiLock className="h-4 w-4 text-emerald-600" />
              <span>Locked &amp; Forwarded to Group HQ</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleForwardToGroup}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <FiSend className="h-4 w-4" />
              <span>Lock &amp; Submit Upstream to Corporate Lead</span>
            </button>
          )}
        </div>
      </div>

      {/* Nudge Alert */}
      {nudgeAlert && (
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-3.5 text-xs text-blue-800 flex items-center gap-2 animate-fade-in">
          <FiBell className="h-4 w-4 text-blue-600 shrink-0" />
          <span>{nudgeAlert}</span>
        </div>
      )}

      {/* Progress & Overview KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Subsidiary Completion
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            {overallSubsidiaryProgress}%
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${overallSubsidiaryProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Subsidiary Scope 1 &amp; 2
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700 font-mono">
            42,100 <span className="text-xs font-sans text-slate-500 font-normal">tCO₂e</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Across 38 operating facilities
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Clean Energy Share
          </div>
          <div className="mt-2 text-2xl font-extrabold text-teal-700 font-mono">
            78.4%
          </div>
          <div className="mt-1 text-xs text-emerald-700 font-medium">
            High renewable export mix
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Audit Assurance Lock
          </div>
          <div className="mt-2 text-base font-extrabold text-slate-900">
            {isLockedAndForwarded ? 'Frozen (Locked)' : 'Open for Revisions'}
          </div>
          <div className="mt-1 text-xs text-slate-500 font-mono">
            Period: Q2 FY 2025-26
          </div>
        </div>
      </div>

      {/* SECTION 1: Multi-Site Progress Tracker Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Constituent Project Sites Submission Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Track real-time data submission velocity, missing invoices, and send reminder nudges.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            6 Sample Display Sites
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-3">Site Facility</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Data Completion</th>
                <th className="py-3 px-3 text-center">Verified KPIs</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {site.siteName}
                  </td>
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {site.category}
                  </td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                    {site.location}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            site.completionPct === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${site.completionPct}%` }}
                        ></div>
                      </div>
                      <span className="font-mono font-bold text-[11px]">{site.completionPct}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono whitespace-nowrap">
                    <span className="text-emerald-700 font-bold">{site.verifiedMetrics}</span> / {site.verifiedMetrics + site.pendingMetrics}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${site.statusColor}`}>
                      {site.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    {site.completionPct < 100 ? (
                      <button
                        type="button"
                        onClick={() => handleNudgeSite(site.siteName)}
                        className="rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        Nudge Site
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-semibold">Ready</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: BRSR Principle Previews (P1 - P9) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            NGRBC 9 Principles Subsidiary Roll-up Health
          </h2>
          <p className="text-xs text-slate-500">
            Automated indicator aggregations prepared for Group Corporate consolidation.
          </p>
        </div>

        {/* 9 Principles Tab Selector */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
          {SUBSIDIARY_PRINCIPLES_SUMMARY.map((p) => {
            const isTabActive = activePrincipleTab === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePrincipleTab(p.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isTabActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{p.code}: {p.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Principle Card Detail */}
        {(() => {
          const activeP = SUBSIDIARY_PRINCIPLES_SUMMARY.find(p => p.id === activePrincipleTab) || SUBSIDIARY_PRINCIPLES_SUMMARY[0];
          return (
            <div className="rounded-xl bg-slate-50 p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-700 uppercase">
                    {activeP.code} Consolidation
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {activeP.title}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Readiness Score</div>
                  <div className="text-xl font-bold font-mono text-emerald-700">{activeP.score}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-lg bg-white p-3 border border-slate-200 text-xs">
                  <span className="text-slate-500">Indicator Status:</span>
                  <div className="font-bold text-slate-900 mt-1">{activeP.indicators}</div>
                </div>
                <div className="rounded-lg bg-white p-3 border border-slate-200 text-xs">
                  <span className="text-slate-500">Assurance Alignment:</span>
                  <div className="font-bold text-emerald-700 mt-1">ISAE 3000 Standard</div>
                </div>
                <div className="rounded-lg bg-white p-3 border border-slate-200 text-xs">
                  <span className="text-slate-500">Discrepancy Flags:</span>
                  <div className="font-bold text-slate-900 mt-1">0 Open Anomalies</div>
                </div>
              </div>
            </div>
          );
        })()}

      </div>

    </div>
  );
};
