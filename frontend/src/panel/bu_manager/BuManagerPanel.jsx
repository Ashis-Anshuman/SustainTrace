import React, { useState } from 'react';
import {
  FiCheckSquare,
  FiActivity,
  FiCheckCircle,
  FiFileText,
  FiCheck,
  FiX,
  FiZap,
  FiLayers,
  FiEye
} from 'react-icons/fi';
import { BU_APPROVAL_QUEUE } from '../../data/portalData';

export const BuManagerPanel = () => {
  const [queue, setQueue] = useState(BU_APPROVAL_QUEUE);
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectionNote, setRejectionNote] = useState('');
  const [viewingProof, setViewingProof] = useState(null);
  const [successBanner, setSuccessBanner] = useState('');

  const handleApprove = (id) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item));
    setSuccessBanner(`Submission #${id} approved and rolled up to Subsidiary level.`);
    setTimeout(() => setSuccessBanner(''), 3000);
  };

  const handleRejectConfirm = () => {
    if (!rejectingItem) return;
    setQueue(prev => prev.map(item => {
      if (item.id === rejectingItem.id) {
        return {
          ...item,
          status: 'Requires Edit',
          varianceReason: rejectionNote || 'Requires additional clarification on operational variance.'
        };
      }
      return item;
    }));
    setSuccessBanner(`Submission #${rejectingItem.id} returned to Site Operator with revision notes.`);
    setRejectingItem(null);
    setRejectionNote('');
    setTimeout(() => setSuccessBanner(''), 3000);
  };

  const handleApproveAllPending = () => {
    setQueue(prev => prev.map(item => ({ ...item, status: 'Approved' })));
    setSuccessBanner('All pending submissions in queue approved successfully.');
    setTimeout(() => setSuccessBanner(''), 3000);
  };

  const pendingCount = queue.filter(q => q.status === 'Pending Review').length;
  const approvedCount = queue.filter(q => q.status === 'Approved').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-800 border border-teal-200 font-mono">
              DIVISION: EASTERN RENEWABLE BU
            </span>
            <span className="text-xs text-slate-500 font-medium">6 Project Sites Supervised</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
            BU Manager Operational Verification Queue
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Validate physical readings against prior fiscal year benchmarks and sign off on site submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <button
              type="button"
              onClick={handleApproveAllPending}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <FiCheck className="h-4 w-4" />
              <span>Approve All Pending ({pendingCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {successBanner && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
          <FiCheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* SECTION 1: Site Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Energy Consumed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Total BU Energy
            </span>
            <FiZap className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            4,892 <span className="text-xs font-sans text-slate-500 font-normal">MWh</span>
          </div>
          <div className="mt-1 text-xs text-emerald-700 font-medium">
            -4.2% vs FY24 Baseline
          </div>
        </div>

        {/* KPI 2: Workplace Safety (LTIFR) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Safety Record (LTIFR)
            </span>
            <FiActivity className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700 font-mono">
            0.00
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Zero Lost Time Injuries in 480 Days
          </div>
        </div>

        {/* KPI 3: Data Completeness */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Data Completeness
            </span>
            <FiLayers className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            86.4%
          </div>
          {/* Progress Bar */}
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full" style={{ width: '86.4%' }}></div>
          </div>
        </div>

        {/* KPI 4: Pending Approvals */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Approval Queue
            </span>
            <FiCheckSquare className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
            {pendingCount} <span className="text-xs font-sans text-slate-500 font-normal">Pending</span>
          </div>
          <div className="mt-1 text-xs text-emerald-700 font-medium">
            {approvedCount} Verified &amp; Signed
          </div>
        </div>

      </div>

      {/* SECTION 2: Approval Queue Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Operational Submissions Pending Validation
            </h2>
            <p className="text-xs text-slate-500">
              Submissions flagged with high variance (&gt;10% YoY) mandate documented rationale.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500">
            Showing {queue.length} Site Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-3">Submission ID</th>
                <th className="py-3 px-3">Site &amp; Operator</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Reported Value</th>
                <th className="py-3 px-3 text-center">Variance vs FY24</th>
                <th className="py-3 px-3">Proof Document</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {queue.map((item) => {
                const isApproved = item.status === 'Approved';
                const isRequiresEdit = item.status === 'Requires Edit';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] font-bold text-slate-900 whitespace-nowrap">
                      {item.id}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{item.siteName}</div>
                      <div className="text-[11px] text-slate-500">{item.operatorName}</div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{item.category}</span>
                      <div className="text-[10px] text-slate-500 font-mono">{item.calcGhg}</div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.reportedValue}
                    </td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        item.varianceAlert
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.varianceVsLastFy}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setViewingProof(item)}
                        className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-mono text-[11px] underline cursor-pointer"
                      >
                        <FiEye className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">{item.proofDocument}</span>
                      </button>
                    </td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : isRequiresEdit
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      {item.status === 'Pending Review' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleApprove(item.id)}
                            className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => setRejectingItem(item)}
                            className="rounded-lg bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Signed Off</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Inspection Modal */}
      {viewingProof && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FiFileText className="h-5 w-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {viewingProof.proofDocument}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingProof(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-1.5">
                <div><strong>Site:</strong> {viewingProof.siteName}</div>
                <div><strong>Reported Parameter:</strong> {viewingProof.category} ({viewingProof.reportedValue})</div>
                <div><strong>Operator Rationale:</strong> "{viewingProof.varianceReason}"</div>
                <div><strong>Cryptographic Seal:</strong> <span className="font-mono text-emerald-700">sha256:b149cd22...55f2 (Tamper-Proof)</span></div>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-center text-slate-500">
                [Simulated PDF Document Preview: Official IOCL Fuel Delivery Slip with meter readings &amp; stamped invoice]
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingProof(null)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Note Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Request Revisions for #{rejectingItem.id}
              </h3>
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-600">
                Specify why this submission is rejected (e.g., missing calibration cert, unexpected variance):
              </p>
              
              <textarea
                rows={3}
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="e.g. Please provide supporting meter calibration logs explaining the 14% diesel consumption spike."
                className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingItem(null)}
                  className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRejectConfirm}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 cursor-pointer"
                >
                  Send Revision Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
