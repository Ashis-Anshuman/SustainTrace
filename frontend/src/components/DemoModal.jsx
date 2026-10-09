import React, { useState } from 'react';
import {
  FiX,
  FiLock,
  FiCheckCircle,
  FiShield
} from 'react-icons/fi';

export const DemoModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    workEmail: '',
    company: '',
    role: 'ESG Head / Chief Sustainability Officer',
    sitesCount: '50-250 Sites',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                SustainTrace Portal Access
              </h3>
              <p className="text-[11px] text-slate-500">
                Enterprise ESG &amp; SEBI BRSR Sandbox
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

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <FiCheckCircle className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Portal Sandbox Credentials Dispatched!
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                We've sent a 24-hour sandbox sign-in link with pre-loaded 250+ site test datasets to <strong>{formData.workEmail || 'your email'}</strong>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Return to Landing Page
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-slate-600 mb-2">
                Experience instant multi-site rollups, CEA v19 GHG calculation engines, and reasonable assurance evidence vaults.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Corporate Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Group Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata / Adani / JSW"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Operating Sites
                  </label>
                  <select
                    value={formData.sitesCount}
                    onChange={(e) => setFormData({ ...formData, sitesCount: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>10 - 50 Sites</option>
                    <option>50 - 250 Sites</option>
                    <option>250+ Sites (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Designation / Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>ESG Head / Chief Sustainability Officer</option>
                  <option>CFO / Finance Controller</option>
                  <option>Statutory Auditor / Assurance Partner</option>
                  <option>Plant / Operations Director</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <FiLock className="h-4 w-4" />
                  <span>Request Instant Sandbox Access</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                Strict enterprise privacy. Zero SPAM. Data stored in MEITY-empanelled India Data Centers.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
