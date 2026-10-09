import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { ROLE_ROUTE_MAP } from '../data/portalData';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeatureGrid } from '../components/FeatureGrid';
import { PrincipleExplorer } from '../components/PrincipleExplorer';
import { RoleWorkflow } from '../components/RoleWorkflow';
import { BrsrCoreDeepDive } from '../components/BrsrCoreDeepDive';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { SampleReportModal } from '../components/SampleReportModal';
import { DemoModal } from '../components/DemoModal';
import { LoginModal } from '../components/LoginModal';
import { FiArrowRight } from 'react-icons/fi';

export const LandingPage = ({ onOpenReportModal }) => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenReport = onOpenReportModal || (() => setReportModalOpen(true));

  const handleGoToRolePanel = () => {
    const targetPath = ROLE_ROUTE_MAP[currentUser?.id] || '/portal/site-operator';
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Active Session Sticky Banner if user is logged into a role */}
      {isAuthenticated && (
        <div className="bg-emerald-800 text-white text-xs py-2 px-4 text-center font-medium flex flex-wrap items-center justify-center gap-3 border-b border-emerald-700">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-ping"></span>
            <span>
              Active Portal Session: <strong>{currentUser.name}</strong> ({currentUser.roleTitle})
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoToRolePanel}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 font-bold transition-colors cursor-pointer shadow-xs"
          >
            <span>Open {currentUser.roleTitle} Panel</span>
            <FiArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={logout}
            className="text-emerald-200 hover:text-white underline text-[11px] cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenLogin={() => {
          if (isAuthenticated) handleGoToRolePanel();
          else setLoginModalOpen(true);
        }}
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenReport={handleOpenReport}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenLogin={() => {
            if (isAuthenticated) handleGoToRolePanel();
            else setLoginModalOpen(true);
          }}
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenReport={handleOpenReport}
        />

        {/* 4 Key Problem Solvers / Capabilities */}
        <FeatureGrid
          onOpenDemo={() => setDemoModalOpen(true)}
        />

        {/* Interactive 9 NGRBC Principles Explorer */}
        <PrincipleExplorer />

        {/* Multi-Tier Role-Based Workflow */}
        <RoleWorkflow />

        {/* BRSR Core 9 Mandated Attributes Deep-Dive */}
        <BrsrCoreDeepDive
          onOpenReport={handleOpenReport}
        />

        {/* Interactive Regulatory FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Authentication Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={() => goToPortal()}
      />

      {/* Sample BRSR Report Viewer Modal */}
      <SampleReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      {/* Sandbox Demo Request Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
