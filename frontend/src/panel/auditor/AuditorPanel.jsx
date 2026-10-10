import React, { useState } from 'react';
import {
  FiShield,
  FiAward,
  FiFileText,
  FiCheckCircle,
  FiDownload,
  FiEye,
  FiX,
  FiPrinter
} from 'react-icons/fi';
import { AUDITOR_CHECKLIST } from '../../data/portalData';
import { downloadSignedAssuranceStatement } from '../../utils/exportUtils';

export const AuditorPanel = () => {
  const [checklist, setChecklist] = useState(AUDITOR_CHECKLIST);
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [editingKpi, setEditingKpi] = useState(null);
  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [statusAlert, setStatusAlert] = useState('');

  const handleUpdateStatus = (id, newStatus, newNotes) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          auditStatus: newStatus,
          auditorNotes: newNotes || item.auditorNotes
        };
      }
      return item;
    }));
    setStatusAlert(`Audit status for ${id} updated to "${newStatus}".`);
    setEditingKpi(null);
    setTimeout(() => setStatusAlert(''), 3000);
  };

  const verifiedCount = checklist.filter(c => c.auditStatus === 'Verified').length;
  const flaggedCount = checklist.filter(c => c.auditStatus === 'Flagged for Discrepancy').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 border border-amber-200 font-mono">
              AUDIT FIRM: INDEPENDENT ASSURANCE PANEL
            </span>
            <span className="text-xs text-slate-500 font-medium">ISAE 3000 / SSAE 3000 Standard</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
            Independent Statutory Assurance Console
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Read-only cryptographic verification of SEBI BRSR Core disclosures, source invoices, and statistical site sampling.
          </p>
        </div>

        {/* Action Button: Issue Assurance Statement */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setStatementModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors cursor-pointer shadow-xs"
          >
            <FiAward className="h-4 w-4" />
            <span>Generate Statutory Assurance Statement</span>
          </button>
        </div>
      </div>

      {/* Status Update Alert */}
      {statusAlert && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
          <FiCheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{statusAlert}</span>
        </div>
      )}

      {/* Assurance Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Mandatory BRSR Core KPIs
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            {checklist.length} Attributes
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Annexure I Verification
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Verified Substantively
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700 font-mono">
            {verifiedCount} / {checklist.length}
          </div>
          <div className="mt-1 text-xs text-emerald-700 font-medium">
            Tied to primary bank/meter vouchers
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Open Discrepancies
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-700 font-mono">
            {flaggedCount} Flagged
          </div>
          <div className="mt-1 text-xs text-amber-700 font-medium">
            Calibration cert pending Unit 4
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Assurance Readiness Level
          </div>
          <div className="mt-2 text-base font-extrabold text-slate-900">
            Reasonable Assurance Grade A
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Digital SHA-256 Vault: Intact
          </div>
        </div>
      </div>

      {/* SECTION 1: BRSR Core KPI Verification Checklist Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              BRSR Core Reasonable Assurance Checklist (SEBI Mandated)
            </h2>
            <p className="text-xs text-slate-500">
              Click any attribute to inspect supporting primary invoices, calibration manifests, and SHA-256 hashes.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500">
            ISAE 3000 Protocol
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-3">KPI ID</th>
                <th className="py-3 px-3">Mandated Attribute</th>
                <th className="py-3 px-3 text-right">Reported Figure</th>
                <th className="py-3 px-3">Testing Standard</th>
                <th className="py-3 px-3">Sample Testing Coverage</th>
                <th className="py-3 px-3 text-center">Assurance Decision</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {checklist.map((item) => {
                const isVerified = item.auditStatus === 'Verified';
                const isFlagged = item.auditStatus === 'Flagged for Discrepancy';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.id}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{item.attribute}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.auditorNotes}</div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.reportedValue}
                    </td>

                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {item.standard}
                    </td>

                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {item.sampleSize}
                    </td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        isVerified
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : isFlagged
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {item.auditStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedKpi(item)}
                          className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-xs font-semibold cursor-pointer"
                        >
                          <FiEye className="h-3 w-3" />
                          <span>Inspect Proof</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingKpi(item)}
                          className="text-amber-700 hover:text-amber-800 text-xs font-bold underline cursor-pointer"
                        >
                          Modify Verdict
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Evidence Inspection Drawer / Modal */}
      {selectedKpi && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FiShield className="h-5 w-5 text-amber-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Evidence Inspection Vault: {selectedKpi.attribute}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    KPI Ref: {selectedKpi.id}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedKpi(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <strong>Reported Metric:</strong>
                  <span className="font-mono font-bold text-slate-900">{selectedKpi.reportedValue}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Testing Standard:</strong>
                  <span>{selectedKpi.standard}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Cryptographic Document Hash:</strong>
                  <span className="font-mono text-emerald-700 font-bold">{selectedKpi.evidenceHash}</span>
                </div>
              </div>

              <div>
                <strong className="block text-slate-800 font-semibold mb-1">
                  Attached Primary Source Evidentiary Files:
                </strong>
                <div className="space-y-1.5">
                  {selectedKpi.evidenceDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg bg-white border border-slate-200 p-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-800">
                        <FiFileText className="h-4 w-4 text-emerald-600" />
                        <span className="font-mono">{doc}</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold">✓ Stamped SHA-256</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <strong className="block text-slate-800 font-semibold mb-1">
                  Auditor Audit Trail &amp; Workpapers:
                </strong>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700 italic">
                  "{selectedKpi.auditorNotes}"
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setSelectedKpi(null)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verdict Modification Modal */}
      {editingKpi && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Update Assurance Verdict for {editingKpi.id}
              </h3>
              <button
                type="button"
                onClick={() => setEditingKpi(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assurance Opinion Decision
                </label>
                <select
                  defaultValue={editingKpi.auditStatus}
                  id="decision-select"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Verified">Verified (Reasonable Assurance Clear)</option>
                  <option value="Flagged for Discrepancy">Flagged for Discrepancy (Requires Management Action)</option>
                  <option value="Approved with Limited Assurance">Approved with Limited Assurance (Interim Scope)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Auditor Technical Workpaper Note
                </label>
                <textarea
                  id="decision-notes"
                  rows={3}
                  defaultValue={editingKpi.auditorNotes}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingKpi(null)}
                  className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const sel = document.getElementById('decision-select').value;
                    const notes = document.getElementById('decision-notes').value;
                    handleUpdateStatus(editingKpi.id, sel, notes);
                  }}
                  className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 cursor-pointer"
                >
                  Commit Verdict
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statutory Assurance Statement Modal */}
      {statementModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <FiAward className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Independent Assurance Statement (ISAE 3000)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Issued to the Board of Directors of MEIL Group for SEBI Filing
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStatementModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-xs text-slate-700 leading-relaxed font-serif">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs space-y-1">
                <div><strong>Assurance Provider:</strong> KPMG Independent Assurance Services LLP</div>
                <div><strong>Client Entity:</strong> MEIL Conglomerate Group</div>
                <div><strong>Reporting Period:</strong> FY 2025-26 (BRSR Core Attributes 1 through 9)</div>
                <div><strong>Standards Applied:</strong> ISAE 3000 (Revised) &amp; SEBI CIR/2023/122</div>
              </div>

              <h4 className="font-sans font-bold text-slate-900 text-sm">
                Scope &amp; Assurance Conclusion
              </h4>
              <p>
                We have undertaken a <strong>Reasonable Assurance</strong> engagement on the selected sustainability performance metrics of MEIL Group presented in the BRSR Core Annexure I report for the period ending March 31, 2026.
              </p>
              <p>
                Our procedures included statistical sampling across 48 out of 254 operating sites, independent recalculation of Scope 1 fuel combustion and Scope 2 grid electricity emissions using CEA User Guide v19 factors, and physical reconciliation against primary DISCOM and oil company invoices.
              </p>
              <p>
                In our professional opinion, except for the matter regarding water meter recalibration at Unit 4 Cuttack (currently being remedied), the BRSR Core disclosures are, in all material respects, fairly stated in accordance with SEBI disclosure guidelines.
              </p>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between font-sans">
                <div>
                  <div className="font-bold text-slate-900">Marcus Vance, Lead Assurance Partner</div>
                  <div className="text-[11px] text-slate-500">ICAI Membership No: 089241</div>
                  <div className="text-[10px] font-mono text-emerald-700">Digital Cryptographic Signature: VALID</div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <FiPrinter className="h-3.5 w-3.5" />
                    <span>Print</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadSignedAssuranceStatement();
                      setStatusAlert('Official Signed Assurance Statement (ISAE 3000) downloaded successfully.');
                      setTimeout(() => setStatusAlert(''), 3500);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-amber-700 cursor-pointer shadow-xs"
                  >
                    <FiDownload className="h-3.5 w-3.5" />
                    <span>Download Signed Statement</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
