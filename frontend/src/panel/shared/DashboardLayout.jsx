import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { SiteOperatorPanel } from '../site_operator/SiteOperatorPanel';
import { BuManagerPanel } from '../bu_manager/BuManagerPanel';
import { SubsidiaryOfficerPanel } from '../subsidiary_officer/SubsidiaryOfficerPanel';
import { GroupAdminPanel } from '../group_admin/GroupAdminPanel';
import { AuditorPanel } from '../auditor/AuditorPanel';

export const DashboardLayout = ({ requiredRole, onOpenReportModal }) => {
  const { currentRoleId, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('ingestion');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (requiredRole && requiredRole !== currentRoleId) {
      switchRole(requiredRole);
    }
  }, [requiredRole, currentRoleId, switchRole]);

  const activeRoleToRender = requiredRole || currentRoleId;

  // Render role panel according to active role
  const renderRolePanel = () => {
    switch (activeRoleToRender) {
      case 'site_operator':
        return <SiteOperatorPanel activeTab={activeTab} />;
      case 'bu_manager':
        return <BuManagerPanel />;
      case 'subsidiary_officer':
        return <SubsidiaryOfficerPanel />;
      case 'group_admin':
        return <GroupAdminPanel onOpenReportModal={onOpenReportModal} />;
      case 'auditor':
        return <AuditorPanel />;
      default:
        return <SiteOperatorPanel activeTab={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-800 flex flex-col">
      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Dashboard Shell Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          {/* Top Header with Breadcrumb & User */}
          <TopNav onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderRolePanel()}
          </main>
        </div>
      </div>
    </div>
  );
};
