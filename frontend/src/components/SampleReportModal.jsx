import React, { useState, useRef, useEffect } from 'react';
import {
  FiX,
  FiDownload,
  FiCheckCircle,
  FiFileText,
  FiShield,
  FiSearch,
  FiPrinter,
  FiChevronDown
} from 'react-icons/fi';
import { SAMPLE_BRSR_TABLE } from '../data/landingData';
import { exportBrsrToCsv, exportBrsrToExcelXml, exportBrsrToXbrl } from '../utils/exportUtils';

export const SampleReportModal = ({ isOpen, onClose }) => {
  const [filterText, setFilterText] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('csv');
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFormatDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const filteredData = SAMPLE_BRSR_TABLE.filter(item => 
    item.attribute.toLowerCase().includes(filterText.toLowerCase()) ||
    item.principle.toLowerCase().includes(filterText.toLowerCase()) ||
    item.param.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleDownload = (format = downloadFormat) => {
    const dataToExport = filteredData.length > 0 ? filteredData : SAMPLE_BRSR_TABLE;
    let fileName = '';

    if (format === 'csv') {
      fileName = 'SEBI_BRSR_Core_Annexure_I_Report.csv';
      exportBrsrToCsv(dataToExport, fileName);
      setDownloadSuccessMsg('Downloaded Excel CSV: SEBI_BRSR_Core_Annexure_I_Report.csv');
    } else if (format === 'xls') {
      fileName = 'SEBI_BRSR_Core_Annexure_I_Report.xls';
      exportBrsrToExcelXml(dataToExport, fileName);
      setDownloadSuccessMsg('Downloaded Styled Excel: SEBI_BRSR_Core_Annexure_I_Report.xls');
    } else if (format === 'xbrl') {
      fileName = 'SEBI_BRSR_Core_Report.xml';
      exportBrsrToXbrl(dataToExport, fileName);
      setDownloadSuccessMsg('Downloaded SEBI XBRL: SEBI_BRSR_Core_Report.xml');
    }

    setShowFormatDropdown(false);
    setTimeout(() => {
      setDownloadSuccessMsg('');
    }, 4000);
  };

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

        {/* Success toast notification */}
        {downloadSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center justify-between text-xs font-semibold text-emerald-800 animate-fade-in">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="h-4 w-4 text-emerald-600" />
              <span>{downloadSuccessMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadSuccessMsg('')}
              className="text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

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

            {/* Split Download Button with Format Selector */}
            <div className="relative inline-flex items-center rounded-lg shadow-xs" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => handleDownload(downloadFormat)}
                className="inline-flex items-center gap-1.5 rounded-l-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                title={`Download report in ${downloadFormat.toUpperCase()} format`}
              >
                <FiDownload className="h-3.5 w-3.5" />
                <span>Download Excel ({downloadFormat === 'csv' ? 'CSV' : downloadFormat === 'xls' ? 'XLS' : 'XBRL'})</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                className="inline-flex items-center justify-center rounded-r-lg bg-emerald-700 px-2 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors cursor-pointer border-l border-emerald-500"
                title="Select download format"
              >
                <FiChevronDown className="h-3.5 w-3.5" />
              </button>

              {/* Format Selection Dropdown */}
              {showFormatDropdown && (
                <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-white p-2 shadow-xl border border-slate-200 z-50 animate-fade-in text-xs">
                  <div className="px-2 py-1 font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                    Select Download Format
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setDownloadFormat('csv');
                      handleDownload('csv');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      downloadFormat === 'csv' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">Excel Spreadsheet (.csv)</span>
                        <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2">Default</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal">Native Excel table with UTF-8 BOM</p>
                    </div>
                    {downloadFormat === 'csv' && <FiCheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDownloadFormat('xls');
                      handleDownload('xls');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      downloadFormat === 'xls' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div>
                      <div className="font-bold">Excel Workbook (.xls)</div>
                      <p className="text-[11px] text-slate-500 font-normal">Formatted XML table with styling</p>
                    </div>
                    {downloadFormat === 'xls' && <FiCheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDownloadFormat('xbrl');
                      handleDownload('xbrl');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      downloadFormat === 'xbrl' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div>
                      <div className="font-bold">SEBI XBRL Package (.xml)</div>
                      <p className="text-[11px] text-slate-500 font-normal">Official machine-readable taxonomy</p>
                    </div>
                    {downloadFormat === 'xbrl' && <FiCheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  </button>
                </div>
              )}
            </div>
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
