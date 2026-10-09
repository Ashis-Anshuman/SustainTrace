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
    { name: 'Framework (NGRBC 9)', href: '#principles' },
    { name: 'Multi-Tier Flow', href: '#workflow' },
    { name: 'BRSR Core', href: '#brsr-core' },
    { name: 'Capabilities', href: '#features' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Brand Logo */}
        <a href="#overview" className="flex items-center gap-3 group focus:outline-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <FiShield className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Sustain<span className="text-emerald-600">Trace</span>
              </span>
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                BRSR Core
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
              Enterprise ESG Assurance
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenReport}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all cursor-pointer"
          >
            <FiFileText className="h-4 w-4 text-slate-500" />
            <span>Sample Report</span>
          </button>

          <button
            type="button"
            onClick={handlePortalAccess}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all cursor-pointer"
          >
            <FiLock className="h-3.5 w-3.5" />
            <span>Portal Access</span>
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 focus:outline-none"
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
