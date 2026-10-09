import React, { useState } from 'react';
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

export const LandingPage = () => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenReport={() => setReportModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenReport={() => setReportModalOpen(true)}
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
          onOpenReport={() => setReportModalOpen(true)}
        />

        {/* Interactive Regulatory FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <SampleReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
