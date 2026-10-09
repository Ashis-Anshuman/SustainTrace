import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import {
  FiShield,
  FiActivity,
  FiUploadCloud,
  FiCheckCircle,
  FiCpu,
  FiFileText,
  FiLayers,
  FiAlertCircle,
  FiDatabase,
  FiPieChart,
  FiCheckSquare,
  FiAward,
  FiArrowLeft,
  FiLock
} from 'react-icons/fi';

export const Sidebar = ({ activeTab, onSelectTab, isMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const { currentRoleId, currentUser, goToLanding } = useAuth();

  const handleReturnToPublic = () => {
    goToLanding();
    navigate('/');
  };

  const getNavItems = () => {
    switch (currentRoleId) {
      case 'site_operator':
        return [
          { id: 'ingestion', label: 'Metric Ingestion', icon: FiCpu, desc: 'Input kWh, fuel & water' },
          { id: 'evidence', label: 'Evidence Upload Vault', icon: FiUploadCloud, desc: 'Utility slips & Form 10' },
          { id: 'tracker', label: 'Submission Status', icon: FiCheckCircle, desc: 'Reviewer approvals' },
        ];
      case 'bu_manager':
        return [
          { id: 'approval_queue', label: 'Site Approval Queue', icon: FiCheckSquare, desc: 'Verify plant submissions' },
          { id: 'kpi_overview', label: 'BU KPI Overview', icon: FiActivity, desc: 'Energy & LTIFR trends' },
          { id: 'variance_radar', label: 'Variance Alerts', icon: FiAlertCircle, desc: 'Spike investigations' },
        ];
      case 'subsidiary_officer':
        return [
          { id: 'site_progress', label: 'Multi-Site Progress', icon: FiLayers, desc: '38 Operating sites' },
          { id: 'principles_preview', label: 'NGRBC 9 Principles', icon: FiPieChart, desc: 'Consolidated preview' },
          { id: 'forwarding', label: 'Corporate Sign-off', icon: FiLock, desc: 'Lock & forward upstream' },
        ];
      case 'group_admin':
        return [
          { id: 'master_dashboard', label: 'Master Dashboard', icon: FiActivity, desc: 'Conglomerate totals' },
          { id: 'hierarchy_drill', label: 'Hierarchy Drill-Down', icon: FiDatabase, desc: '254 Sites navigation' },
          { id: 'sebi_validation', label: 'SEBI Compliance Engine', icon: FiCheckCircle, desc: 'Pre-filing audits' },
          { id: 'report_hub', label: 'Filing Exporter', icon: FiFileText, desc: 'PDF / XBRL output' },
        ];
      case 'auditor':
        return [
          { id: 'core_checklist', label: 'BRSR Core Checklist', icon: FiCheckSquare, desc: 'Reasonable assurance' },
          { id: 'evidence_inspector', label: 'Evidence Vault', icon: FiShield, desc: 'SHA-256 cryptotrace' },
          { id: 'assurance_statement', label: 'Assurance Statement', icon: FiAward, desc: 'Statutory sign-off' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xs">
              <FiShield className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base tracking-tight">
                EcoLedger <span className="text-emerald-600">BRSR</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Enterprise ESG Portal
              </span>
            </div>
          </div>

          {/* Current Role Identity Card */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
                {currentUser.avatar}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.roleTitle}
                </div>
                <div className="text-[10px] font-medium text-emerald-700 truncate">
                  {currentUser.assignedEntity}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Navigation Links tailored by Role */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Role Workspaces
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <div className="truncate">
                    <div className="text-xs font-bold truncate leading-tight">
                      {item.label}
                    </div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="border-t border-slate-200 p-3 space-y-2 bg-slate-50/50">
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-[11px] text-slate-600">
            <div className="flex items-center justify-between text-slate-500">
              <span>Security Vault:</span>
              <span className="font-mono text-emerald-700 font-bold">SHA-256</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 mt-1">
              <span>SEBI Circular:</span>
              <span className="font-mono text-slate-800">2023 Compliant</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReturnToPublic}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Public Site</span>
          </button>
        </div>

      </aside>
    </>
  );
};
