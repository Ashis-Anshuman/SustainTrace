import React, { useState, useMemo } from 'react';
import { AuthContext } from './authContextInstance';
import { ROLES_CONFIG } from '../data/portalData';

export const AuthProvider = ({ children }) => {
  const [currentRoleId, setCurrentRoleId] = useState('site_operator');
  const [reportingYear, setReportingYear] = useState('FY 2025-26');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' or 'portal'
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Discrepancy Flagged', msg: 'Auditor requested fresh flow meter calibration for Unit 4 Cuttack.', time: '10m ago', unread: true },
    { id: 2, title: 'New Submission Ready', msg: 'Site Operator submitted September electricity bills for Balasore.', time: '1h ago', unread: true },
    { id: 3, title: 'SEBI Circular Alert', msg: 'FY 2025-26 Reasonable Assurance mandate active for Top 1000 entities.', time: '1d ago', unread: false },
  ]);

  const currentUser = useMemo(() => {
    return ROLES_CONFIG[currentRoleId] || ROLES_CONFIG.site_operator;
  }, [currentRoleId]);

  const login = (roleId = 'site_operator') => {
    if (ROLES_CONFIG[roleId]) {
      setCurrentRoleId(roleId);
    }
    setIsAuthenticated(true);
    setViewMode('portal');
  };

  const switchRole = (roleId) => {
    if (ROLES_CONFIG[roleId]) {
      setCurrentRoleId(roleId);
      setIsAuthenticated(true);
      setViewMode('portal');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setViewMode('landing');
  };

  const goToLanding = () => {
    setViewMode('landing');
  };

  const goToPortal = () => {
    setIsAuthenticated(true);
    setViewMode('portal');
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const value = {
    currentRoleId,
    currentUser,
    reportingYear,
    setReportingYear,
    isAuthenticated,
    viewMode,
    login,
    switchRole,
    logout,
    goToLanding,
    goToPortal,
    notifications,
    markAllNotificationsRead,
    availableRoles: Object.values(ROLES_CONFIG),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
