import React, { useState } from 'react';
import {
  FiUsers,
  FiArrowRight,
  FiLock,
  FiShield,
  FiCheck
} from 'react-icons/fi';
import { WORKFLOW_ROLES } from '../data/landingData';

export const RoleWorkflow = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const selectedRole = WORKFLOW_ROLES[selectedRoleIndex];

  return (
    <section id="workflow" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <FiUsers className="h-3.5 w-3.5 text-emerald-600" />
            <span>Multi-Tier Enterprise Governance</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Role-Based Multi-Tier Rollup Workflow
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From remote plant floor measurements to board room approval and Big 4 statutory assurance — every tier maintains segregated duties, cryptographic audit trails, and four-eye verification.
          </p>
        </div>

        {/* Step-by-Step Flow Horizontal Stepper */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {WORKFLOW_ROLES.map((role, idx) => {
              const isSelected = selectedRoleIndex === idx;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRoleIndex(idx)}
                  className={`group relative rounded-xl p-3.5 text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/30 shadow-md ring-1 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold font-mono ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Tier {idx + 1}
                    </span>
                  </div>

                  <h3 className={`mt-3 text-xs sm:text-sm font-bold line-clamp-2 ${
                    isSelected ? 'text-emerald-900' : 'text-slate-800'
                  }`}>
                    {role.role.split('/')[0]}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-500 truncate">
                    {role.tier.split('—')[1]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Role Detail Card */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-lg ${selectedRole.avatarColor}`}>
                  {selectedRoleIndex + 1}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    {selectedRole.tier}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedRole.role}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Scope of Action: <span className="font-medium text-slate-700">{selectedRole.location}</span>
                  </p>
                </div>
              </div>

              <div className="inline-flex rounded-lg bg-white border border-slate-200 px-3.5 py-1.5 text-xs text-slate-700 shadow-2xs items-center gap-1.5">
                <FiLock className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-medium text-slate-500">Permission:</span>
                <span className="font-semibold text-slate-900">{selectedRole.approvalPower}</span>
              </div>
            </div>

            {/* Responsibilities & Data Tools */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Column 1 & 2: Daily Operations & Verification */}
              <div className="lg:col-span-2 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Key Responsibilities &amp; Verification Duties:
                </h5>
                <div className="space-y-2.5">
                  {selectedRole.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                        <FiCheck className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Platform Tools & Action Flow */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Assigned Console Tools:
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedRole.tools}
                </p>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Next Downstream Recipient:
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <FiArrowRight className="h-3.5 w-3.5" />
                    <span>
                      {selectedRoleIndex < WORKFLOW_ROLES.length - 1
                        ? WORKFLOW_ROLES[selectedRoleIndex + 1].role
                        : 'Final SEBI Filing (NSE/BSE Electronic Portal)'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Architecture Proof Banner */}
          <div className="mt-8 rounded-xl border border-slate-200/80 bg-white p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <FiShield className="h-4 w-4 text-emerald-600" />
              <span>
                <strong>Segregation of Duties (SoD):</strong> Plant operators cannot alter corporate baselines; auditors possess read-only cryptographically stamped privileges.
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              ISO 27001 &amp; SOC 2 Type II Certified
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
