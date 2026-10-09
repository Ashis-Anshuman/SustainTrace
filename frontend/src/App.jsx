import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './public_page/LandingPage';
import { DashboardLayout } from './panel/shared/DashboardLayout';
import { SampleReportModal } from './components/SampleReportModal';
import './App.css';

function AppContent() {
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <>
      <Routes>
        {/* Public Landing Page */}
        <Route
          path="/"
          element={<LandingPage onOpenReportModal={() => setReportModalOpen(true)} />}
        />
        <Route
          path="/landing"
          element={<LandingPage onOpenReportModal={() => setReportModalOpen(true)} />}
        />

        {/* Portal Routes with respective roles */}
        <Route
          path="/portal"
          element={<Navigate to="/portal/site-operator" replace />}
        />
        <Route
          path="/portal/site-operator"
          element={
            <DashboardLayout
              requiredRole="site_operator"
              onOpenReportModal={() => setReportModalOpen(true)}
            />
          }
        />
        <Route
          path="/portal/bu-manager"
          element={
            <DashboardLayout
              requiredRole="bu_manager"
              onOpenReportModal={() => setReportModalOpen(true)}
            />
          }
        />
        <Route
          path="/portal/subsidiary-officer"
          element={
            <DashboardLayout
              requiredRole="subsidiary_officer"
              onOpenReportModal={() => setReportModalOpen(true)}
            />
          }
        />
        <Route
          path="/portal/group-admin"
          element={
            <DashboardLayout
              requiredRole="group_admin"
              onOpenReportModal={() => setReportModalOpen(true)}
            />
          }
        />
        <Route
          path="/portal/auditor"
          element={
            <DashboardLayout
              requiredRole="auditor"
              onOpenReportModal={() => setReportModalOpen(true)}
            />
          }
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Sample BRSR Report Modal */}
      <SampleReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
