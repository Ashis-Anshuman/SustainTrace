import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { ROLE_ROUTE_MAP } from '../data/portalData';
import {
  FiX,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiKey
} from 'react-icons/fi';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('site_operator');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const quickRoles = [
    { id: 'site_operator', label: 'Site Operator', user: 'operator.site254@meilgroup.com' },
    { id: 'bu_manager', label: 'BU Manager', user: 'bu.manager.solar@meilgroup.com' },
    { id: 'subsidiary_officer', label: 'Subsidiary Officer', user: 'esg.subsidiary@meilgreenpower.com' },
    { id: 'group_admin', label: 'Group ESG Lead', user: 'chief.esg@meilgroup.com' },
    { id: 'auditor', label: 'Auditor', user: 'marcus.vance@kpmg-assurance.com' },
  ];

  const handleQuickFill = (roleItem) => {
    setSelectedRole(roleItem.id);
    setUserId(roleItem.user);
    setPassword('••••••••••••');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setErrorMsg('Please enter your Corporate ID or Email.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    // Simulate enterprise authentication
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        login(selectedRole);
        const targetPath = ROLE_ROUTE_MAP[selectedRole] || '/portal/site-operator';
        navigate(targetPath);
        if (onLoginSuccess) {
          onLoginSuccess({ userId, role: selectedRole, path: targetPath });
        }
        setIsSuccess(false);
        onClose();
      }, 1100);
    }, 700);
  };

  const handleClose = () => {
    setErrorMsg('');
    setIsLoading(false);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900">
                  Portal Access
                </h3>
                <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-800">
                  SSO / MFA
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                SustainTrace Enterprise ESG Portal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Close login dialog"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 animate-bounce">
                <FiCheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Authentication Successful!
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Access token issued for <strong className="text-slate-900">{userId}</strong>
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Redirecting to ESG Reporting Console...
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Quick Fill Demo Roles */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/90 p-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
                  <span>Fast Demo Credentials:</span>
                  <span className="text-emerald-700 font-mono">1-Click Fill</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickRoles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleQuickFill(role)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-medium border text-center transition-all cursor-pointer truncate ${
                        selectedRole === role.id && userId === role.user
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* User ID / Corporate Email Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Corporate ID / Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. employee.id@enterprise.com"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to corporate domain admin.')}
                    className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiLock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter portal password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Security info */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Remember on this device</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400">256-bit SSL</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>Verifying Credentials...</span>
                    </span>
                  ) : (
                    <>
                      <FiKey className="h-4 w-4" />
                      <span>Sign In to Portal</span>
                      <FiArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Notice */}
              <div className="pt-2 text-center text-[10px] text-slate-400 space-y-1">
                <p>Protected by Enterprise Role-Based Access Control (RBAC).</p>
                <p>Complies with SEBI Cybersecurity &amp; Systems Audit Guidelines.</p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
