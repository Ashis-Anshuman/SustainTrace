import React, { useState } from 'react';
import {
  FiHelpCircle,
  FiChevronDown
} from 'react-icons/fi'; 
import { FAQS } from '../data/landingData';

export const FaqSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <FiHelpCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>Regulatory &amp; Technical Clarifications</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything corporate sustainability heads, compliance officers, and external certifiers need to know about SEBI BRSR Core alignment.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-emerald-300 bg-emerald-50/15 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold pr-4 ${
                    isOpen ? 'text-emerald-950' : 'text-slate-900'
                  }`}>
                    {faq.q}
                  </span>
                  
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 ${
                    isOpen ? 'bg-emerald-100 text-emerald-800 rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <FiChevronDown className="h-5 w-5" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 mt-1">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-3">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 max-w-3xl mx-auto text-center rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
          <h4 className="text-base sm:text-lg font-bold text-slate-900">
            Have custom requirements for your industry sector or value chain?
          </h4>
          <p className="mt-2 text-sm text-slate-600">
            Our ESG solutions team assists with custom emission factors, ERP integrations (SAP S/4HANA, Oracle), and multi-tier supplier portals.
          </p>
          <div className="mt-4">
            <a
              href="#overview"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
            >
              <span>Connect with a BRSR Compliance Specialist</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
