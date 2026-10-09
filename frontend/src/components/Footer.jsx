import React from 'react';
import {
  FiShield,
  FiArrowUp,
  FiCheckCircle
} from 'react-icons/fi';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      
      {/* Top Banner / Framework Standards Bar */}
      <div className="border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-white">Adherence Standards:</span>
          <span className="text-slate-400">SEBI CIR/2023/122 • MCA NGRBC 2019 • CEA v19 • GHG Protocol • ISAE 3000</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1">
            <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
            Top 1,000 Listed Entities Ready
          </span>
          <span className="inline-flex items-center gap-1">
            <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
            ISO 27001 Certified
          </span>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <FiShield className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white">
                Sustain<span className="text-emerald-400">Trace</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-400">
                Enterprise ESG &amp; BRSR Core Reporting Platform
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Empowering India’s top conglomerates and listed enterprises to automate bottom-up ESG disclosures across 250+ operating units with statutory reasonable assurance.
          </p>

          <div className="pt-2 text-xs text-slate-400">
            Compliant with Securities and Exchange Board of India (SEBI) Master Circular on ESG Disclosures.
          </div>
        </div>

        {/* Column 2: Platform Modules */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Core Modules
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#overview" className="hover:text-emerald-400 transition-colors">Scope 1 &amp; 2 GHG Engine</a></li>
            <li><a href="#workflow" className="hover:text-emerald-400 transition-colors">Multi-Tier Site Rollup</a></li>
            <li><a href="#features" className="hover:text-emerald-400 transition-colors">Audit Evidence Vault</a></li>
            <li><a href="#brsr-core" className="hover:text-emerald-400 transition-colors">BRSR Core 9-KPI Pack</a></li>
            <li><a href="#features" className="hover:text-emerald-400 transition-colors">XBRL / NSE-BSE Exporter</a></li>
          </ul>
        </div>

        {/* Column 3: Framework References */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Frameworks &amp; Norms
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#principles" className="hover:text-emerald-400 transition-colors">MCA NGRBC 9 Principles</a></li>
            <li><a href="#brsr-core" className="hover:text-emerald-400 transition-colors">SEBI Circular July 2023</a></li>
            <li><a href="#overview" className="hover:text-emerald-400 transition-colors">CEA User Guide v19</a></li>
            <li><a href="#overview" className="hover:text-emerald-400 transition-colors">IPCC Emission Factors</a></li>
            <li><a href="#workflow" className="hover:text-emerald-400 transition-colors">ISAE 3000 Assurance Protocols</a></li>
          </ul>
        </div>

        {/* Column 4: Regulatory Resources & Compliance */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Governance &amp; Trust
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">Reasonable Assurance FAQ</a></li>
            <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">Auditor Portal Access</a></li>
            <li><a href="#overview" className="hover:text-emerald-400 transition-colors">India Data Localization</a></li>
            <li><a href="#overview" className="hover:text-emerald-400 transition-colors">Privacy &amp; Security Certifications</a></li>
            <li><a href="#overview" className="hover:text-emerald-400 transition-colors">Terms of Enterprise Service</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="border-t border-slate-800 bg-slate-950/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 SustainTrace Systems. All rights reserved. Built for corporate sustainability compliance and SEBI BRSR alignment.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <FiArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
};
