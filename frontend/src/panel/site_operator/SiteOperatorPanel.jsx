import React, { useState } from 'react';
import {
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiFileText,
  FiSave,
  FiSend,
  FiZap,
  FiX
} from 'react-icons/fi';
import { INITIAL_OPERATOR_METRICS } from '../../data/portalData';

export const SiteOperatorPanel = () => {
  const [metrics, setMetrics] = useState(INITIAL_OPERATOR_METRICS);
  const [selectedMetricForUpload, setSelectedMetricForUpload] = useState(null);
  const [submittedAlert, setSubmittedAlert] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  // Dynamic calculations based on input
  const handleValueChange = (id, newVal) => {
    const num = parseFloat(newVal) || 0;
    setMetrics(prev => prev.map(m => {
      if (m.id === id) {
        let calc = m.calcEmission;
        if (m.id === 'elec-grid') {
          calc = Number(((num * 0.716) / 1000).toFixed(2));
        } else if (m.id === 'diesel-genset') {
          calc = Number(((num * 2.68) / 1000).toFixed(2));
        }
        return { ...m, value: num, calcEmission: calc, status: 'Pending Review' };
      }
      return m;
    }));
  };

  const handleSaveDraft = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleSubmitToBu = () => {
    setMetrics(prev => prev.map(m => ({ ...m, status: 'Pending Review' })));
    setSubmittedAlert(true);
    setTimeout(() => setSubmittedAlert(false), 4000);
  };

  const handleSimulateUpload = (metricId, fileName) => {
    setMetrics(prev => prev.map(m => {
      if (m.id === metricId) {
        return {
          ...m,
          evidenceFile: fileName,
          fileSize: '1.9 MB',
          fileHash: 'sha256:' + Math.random().toString(16).substring(2, 10) + '...9c1',
          status: 'Pending Review',
          statusNote: 'Updated evidence file uploaded. Ready for BU review.'
        };
      }
      return m;
    }));
    setSelectedMetricForUpload(null);
  };

  const totalScope1 = metrics.find(m => m.id === 'diesel-genset')?.calcEmission || 0;
  const totalScope2 = metrics.find(m => m.id === 'elec-grid')?.calcEmission || 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Scope Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200 font-mono">
              SITE ID: MEIL-SOLAR-004
            </span>
            <span className="text-xs text-slate-500 font-medium">Cuttack, Odisha</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
            Site Operator Data Ingestion Console
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Input physical utility consumption and attach statutory source evidence for FY 2025-26.
          </p>
        </div>

        {/* Live GHG Conversion Preview */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Site GHG Footprint
            </div>
            <div className="font-mono text-lg font-bold text-emerald-700">
              {(totalScope1 + totalScope2).toFixed(2)} <span className="text-xs">tCO₂e</span>
            </div>
            <div className="text-[10px] text-slate-500">
              S1: {totalScope1} | S2: {totalScope2}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <FiZap className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {submittedAlert && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Successfully Submitted!</strong> All 5 operational metrics have been forwarded to Sunita Sharma (BU / Project Manager) for verification.
            </span>
          </div>
        </div>
      )}

      {savedAlert && (
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-800 flex items-center gap-2 animate-fade-in">
          <FiCheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
          <span>Draft changes saved locally to workstation cache.</span>
        </div>
      )}

      {/* Reviewer Revision Alert if any metric has 'Requires Edit' */}
      {metrics.some(m => m.status === 'Requires Edit') && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-800 flex items-start gap-3">
          <FiAlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Reviewer Feedback: Action Required on Water Withdrawal</strong>
            <p className="mt-0.5 text-rose-700">
              Auditor flagged expired flow meter calibration for August. Please upload the updated calibration test certificate below to clear the flag.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1: Quick Metric Ingestion Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Operational Metric Intake Form
            </h2>
            <p className="text-xs text-slate-500">
              Auto-calculates Scope 1 &amp; Scope 2 GHG using Central Electricity Authority (CEA v19) factors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <FiSave className="h-3.5 w-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              type="button"
              onClick={handleSubmitToBu}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
            >
              <FiSend className="h-3.5 w-3.5" />
              <span>Submit for BU Review</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => {
            const isRequiresEdit = metric.status === 'Requires Edit';
            const isVerified = metric.status === 'Verified';

            return (
              <div
                key={metric.id}
                className={`rounded-2xl border p-5 transition-all bg-white shadow-xs ${
                  isRequiresEdit
                    ? 'border-rose-300 bg-rose-50/10 ring-1 ring-rose-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Metric Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {metric.subCategory}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {metric.category}
                    </h3>
                  </div>

                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                    isVerified
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : isRequiresEdit
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {metric.status}
                  </span>
                </div>

                {/* Input Field with Unit Label */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reported Quantity ({metric.unit})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={metric.value}
                      onChange={(e) => handleValueChange(metric.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-xs font-medium text-slate-400 pointer-events-none">
                      {metric.unit.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Calculated Result / Intensity */}
                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-2.5 text-xs">
                  <span className="text-slate-500 font-medium">Computed Metric:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {metric.calcEmission} {metric.calcUnit}
                  </span>
                </div>

                {/* Attached Evidence Link */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 truncate max-w-[180px]">
                    <FiFileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate text-[11px] font-mono">{metric.evidenceFile}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMetricForUpload(metric)}
                    className="text-emerald-700 hover:text-emerald-800 text-[11px] font-bold hover:underline cursor-pointer"
                  >
                    Replace
                  </button>
                </div>

                {/* Reviewer Note if any */}
                {metric.statusNote && (
                  <p className="mt-2 text-[11px] text-slate-500 italic bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                    "{metric.statusNote}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Evidence Upload Vault Interface */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Evidence Upload Vault (SHA-256 Stamp)
            </h2>
            <p className="text-xs text-slate-500">
              Every reported kilowatt-hour or diesel slip must have an immutable verifiable invoice for reasonable assurance.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            5 Files Hashed &amp; Stored
          </span>
        </div>

        {/* Drag and Drop Simulation Box */}
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-8 text-center hover:bg-emerald-50/20 hover:border-emerald-400 transition-colors cursor-pointer">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-3">
            <FiUploadCloud className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">
            Drag and drop plant utility invoices or meter calibration records
          </h4>
          <p className="mt-1 text-xs text-slate-500">
            Supports PDF, JPG, PNG, and signed digital weighbridge manifests up to 25MB
          </p>
          <div className="mt-4">
            <label className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <span>Browse Local Workstation</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleSimulateUpload('water-withdrawal', e.target.files[0].name);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Uploaded Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Filename</th>
                <th className="py-2.5 px-3">File Size</th>
                <th className="py-2.5 px-3">Cryptographic Hash</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metrics.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    {m.category}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-800 font-medium">
                    {m.evidenceFile}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {m.fileSize}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                    {m.fileHash}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* File Replacement Modal */}
      {selectedMetricForUpload && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Upload New Proof for {selectedMetricForUpload.category}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedMetricForUpload(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-600">
                Select a replacement document from your files or pick a simulated calibration slip:
              </p>
              
              <button
                type="button"
                onClick={() => handleSimulateUpload(selectedMetricForUpload.id, 'FlowMeter_Calibrated_Valid_Oct2025.pdf')}
                className="w-full text-left p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
              >
                📄 Attach: FlowMeter_Calibrated_Valid_Oct2025.pdf
                <span className="block text-[10px] text-emerald-700 font-normal mt-0.5">
                  Valid NABL accredited lab certificate.
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateUpload(selectedMetricForUpload.id, 'TPCODL_RevisedTariffBill_Sept2025.pdf')}
                className="w-full text-left p-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                📄 Attach: TPCODL_RevisedTariffBill_Sept2025.pdf
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
