import React, { useState } from 'react';
import {
  FiX,
  FiDownload,
  FiCheckCircle,
  FiFileText,
  FiShield,
  FiSearch,
  FiPrinter
} from 'react-icons/fi';
import { SAMPLE_BRSR_TABLE } from '../data/landingData';

export const SampleReportModal = ({ isOpen, onClose }) => {
  const [filterText, setFilterText] = useState('');

  if (!isOpen) return null;

  const filteredData = SAMPLE_BRSR_TABLE.filter(item => 
    item.attribute.toLowerCase().includes(filterText.toLowerCase()) ||
    item.principle.toLowerCase().includes(filterText.toLowerCase()) ||
    item.param.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <FiFileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Sample SEBI BRSR Core Report (Annexure I)
                </h3>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                  SEBI Mandate
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Generated per Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122 • Multi-Site Consolidation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Controls / Search */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter attributes (GHG, water, diversity)..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <FiPrinter className="h-3.5 w-3.5" />
              <span>Print Preview</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Sample BRSR Core PDF report downloaded successfully with digital audit trail.')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
            >
              <FiDownload className="h-3.5 w-3.5" />
              <span>Download PDF / XBRL</span>
            </button>
          </div>
        </div>

        {/* Modal Table Content */}
        <div className="overflow-x-auto max-h-[55vh] p-6 pt-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-3">Principle</th>
                <th className="py-3 px-3">BRSR Core Attribute</th>
                <th className="py-3 px-3">Parameter Description</th>
                <th className="py-3 px-3">Unit</th>
                <th className="py-3 px-3 text-right">FY 2024-25 (Current)</th>
                <th className="py-3 px-3 text-right">FY 2023-24 (Previous)</th>
                <th className="py-3 px-3 text-center">Assurance Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
                    {row.principle}
                  </td>
                  <td className="py-3 px-3 text-emerald-800 font-semibold whitespace-nowrap">
                    {row.attribute}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {row.param}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {row.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    {row.fy24}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500 whitespace-nowrap">
                    {row.fy23}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      <FiCheckCircle className="h-3 w-3" />
                      {row.assurance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <FiShield className="h-4 w-4 text-emerald-600" />
            <span>Digital Hash: SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f...</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
