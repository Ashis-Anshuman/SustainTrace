import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import {
  FiBell,
  FiLogOut,
  FiMenu,
  FiCalendar
} from 'react-icons/fi';

export const TopNav = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const {
    currentUser,
    reportingYear,
    setReportingYear,
    logout,
    notifications,
    markAllNotificationsRead
  } = useAuth();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      
      {/* Left: Mobile Toggle & Hierarchy Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Navigation Sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">Hierarchy:</span>
            <span className="truncate max-w-[220px] sm:max-w-md text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-200 font-mono text-[11px]">
              {currentUser.hierarchyPath}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Scope: {currentUser.assignedEntity}
          </span>
        </div>
      </div>

      {/* Right: Year Selector, Role Badge, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Reporting Year Selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
          <FiCalendar className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-[11px] text-slate-500 font-semibold hidden md:inline">Reporting Period:</span>
          <select
            value={reportingYear}
            onChange={(e) => setReportingYear(e.target.value)}
            className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
          >
            <option value="FY 2025-26">FY 2025-26 (Mandatory)</option>
            <option value="FY 2024-25">FY 2024-25 (Audited)</option>
            <option value="FY 2023-24">FY 2023-24 (Base Year)</option>
          </select>
        </div>

        {/* Role Pill Badge */}
        <div className="hidden md:flex items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${currentUser.badgeColor}`}>
            {currentUser.badge}
          </span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (!notificationsOpen) markAllNotificationsRead();
            }}
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <FiBell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-3 shadow-xl border border-slate-200 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-2">
                <span className="text-xs font-bold text-slate-900">Assurance &amp; Workflow Alerts</span>
                <span className="text-[10px] text-emerald-700 font-medium">SEBI Disclosures</span>
              </div>
              <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="rounded-xl p-2.5 bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 font-semibold">{n.title}</strong>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">{n.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs shadow-xs">
            {currentUser.avatar}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-slate-500">
              {currentUser.roleTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Log out of portal"
            className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <FiLogOut className="h-4 w-4" />
          </button>
        </div>

      </div>

    </header>
  );
};
