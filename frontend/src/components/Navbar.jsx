import React, { useState } from 'react';
import {
  FiShield,
  FiMenu,
  FiX,
  FiArrowRight,
  FiFileText,
  FiLock
} from 'react-icons/fi';

export const Navbar = ({ onOpenLogin, onOpenDemo, onOpenReport }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handlePortalAccess = onOpenLogin || onOpenDemo;

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Framework', href: '#principles' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'BRSR Core', href: '#brsr-core' },
    { name: 'Capabilities', href: '#features' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo - anchored cleanly on the left side */}
        <a href="#overview" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white shadow-sm shadow-emerald-900/20 group-hover:scale-105 group-hover:shadow-emerald-900/30 transition-all duration-300 border border-emerald-700/60">
            <FiShield className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors duration-300 leading-tight">
              Sustain<span className="text-emerald-700 font-serif italic">Trace</span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase leading-none">
              SEBI BRSR Assurance Portal
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links - properly arranged with single-line labels */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-xs xl:text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTAs with smooth hover micro-effects */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenReport}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-3.5 py-2 text-xs xl:text-sm font-semibold text-slate-700 shadow-2xs hover:border-emerald-600 hover:bg-emerald-50/70 hover:text-emerald-900 hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out cursor-pointer"
          >
            <FiFileText className="h-4 w-4 text-emerald-700 group-hover:scale-110 transition-transform duration-300 ease-out" />
            <span>Sample Report</span>
          </button>

          <button
            type="button"
            onClick={handlePortalAccess}
            className="group inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs xl:text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 hover:shadow-md hover:shadow-emerald-900/25 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all duration-300 ease-out cursor-pointer border border-emerald-800"
          >
            <FiLock className="h-3.5 w-3.5 text-emerald-100 group-hover:scale-110 transition-transform duration-300" />
            <span>Portal Access</span>
            <FiArrowRight className="h-4 w-4 text-emerald-200 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-700 shadow-xs"
            >
              <FiFileText className="h-4 w-4" />
              <span>View Sample BRSR Report</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handlePortalAccess();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              <FiLock className="h-4 w-4" />
              <span>Portal Access (Sign In)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
