export const STATS_SUMMARY = [
  { label: 'Assurance Ready Project Sites', value: '250+', change: 'Multi-geography coverage' },
  { label: 'GHG Intensity Reduction', value: '-18.4%', change: 'Across Scope 1 & 2' },
  { label: 'Audit Trail Verification Speed', value: '3.8x', change: 'Faster reasonable assurance' },
  { label: 'SEBI BRSR Compliance Rate', value: '100%', change: 'Annexure I & II aligned' },
];

export const HERO_METRICS = {
  scopeEmissions: {
    total: '148,920',
    unit: 'tCO₂e',
    scope1: '82,410',
    scope2: '66,510',
    reduction: '-14.2%',
    intensity: '12.8 tCO₂e / ₹ Cr turnover',
  },
  waterRecycled: {
    percentage: '68.4%',
    recycledVol: '1,420,500 kL',
    zeroLiquidDischargeSites: '42 / 48',
    target: '75.0% by FY26',
  },
  genderDiversity: {
    percentage: '34.2%',
    boardDiversity: '28.5%',
    medianPayRatio: '1:1.02',
    poshTrained: '99.4%',
  },
  sebiCompliance: {
    score: '98.6%',
    status: 'Audit Assured',
    verifiedIndicators: '138 / 140',
    auditor: 'Big 4 Assurance Engine',
  },
};

export const CAPABILITIES = [
  {
    id: 'ghg-engine',
    title: 'Automated GHG & Intensity Engine',
    shortDesc: 'Converts raw energy, fuel slips, and water metrics into SEBI-ready figures automatically.',
    fullDesc: 'Built-in conversion factors aligned with Central Electricity Authority (CEA v19) grid emission factors, IPCC Guidelines, and GHG Protocol Corporate Standard. Calculates Scope 1 direct fuel, Scope 2 purchased electricity, and turnover-based intensity ratios.',
    badge: 'IPCC & CEA v19 Built-in',
    features: [
      'Scope 1 direct stationary & mobile combustion calculators',
      'Location-based & market-based Scope 2 electricity accounting',
      'Automatic turnover & physical production intensity normalizer',
      'Custom fuel calorific values & chemical process emissions'
    ],
    metricValue: '12.8 tCO₂e/₹Cr',
    metricLabel: 'Net GHG Intensity'
  },
  {
    id: 'hierarchical-rollup',
    title: 'Hierarchical Multi-Level Rollup',
    shortDesc: 'Aggregates data from individual plant sites to subsidiary heads and corporate leadership.',
    fullDesc: 'Eliminate spreadsheet chaos across 250+ operating units. Real-time data rollup with multi-tier approval chains, automated anomaly detection, and cross-site variance benchmarks to flag outliers before sign-off.',
    badge: 'Multi-Tier Consolidation',
    features: [
      'Multi-entity consolidation with joint ventures & leased assets',
      'Automated outlier detection (+/- 15% historical variance alert)',
      'Four-eye review principle with digital signature verification',
      'Custom regional groupings and business unit divisioning'
    ],
    metricValue: '254 Sites',
    metricLabel: 'Instant Consolidation'
  },
  {
    id: 'assurance-vault',
    title: 'Auditor Assurance & Evidence Vault',
    shortDesc: 'Direct linking of bills, certificates, and an immutable audit trail for external certifiers.',
    fullDesc: 'Designed specifically for statutory Reasonable Assurance required by SEBI. Every reported gigajoule and metric ton of carbon is backed by utility bills, meter calibration certificates, and weighbridge slips.',
    badge: 'ISAE 3000 / SSAE 3000',
    features: [
      'Cryptographic SHA-256 document hashing for tamper-proof evidence',
      'Direct read-only external auditor access portal with sample testing',
      'Comprehensive change logs tracking every edit, timestamp, & user ID',
      'Integrated laboratory water quality test reports & CPCB manifests'
    ],
    metricValue: '100% Traceable',
    metricLabel: 'Audit Assurance'
  },
  {
    id: 'sebi-exporter',
    title: '1-Click SEBI Filing Exporter',
    shortDesc: 'Standard Annexure I/II compliant reports ready for immediate PDF and XBRL output.',
    fullDesc: 'Generates production-grade Section A (General Disclosures), Section B (Management and Process Disclosures), and Section C (Principle-wise Performance) reports matching SEBI circular templates precisely.',
    badge: 'SEBI Circular 2023 Aligned',
    features: [
      'Complete BRSR Core 9-attribute verification table',
      'Pre-formatted Annexure I & II ready for Annual Report integration',
      'Machine-readable XBRL taxonomy export for NSE/BSE filing',
      'Multi-year comparative reporting with automated baseline adjustments'
    ],
    metricValue: '1-Click',
    metricLabel: 'NSE/BSE Compliant'
  }
];

export const NGRBC_PRINCIPLES = [
  {
    id: 'p1',
    code: 'Principle 1',
    title: 'Ethics, Transparency & Accountability',
    tagline: 'Businesses should conduct and govern themselves with integrity in a manner that is ethical, transparent and accountable.',
    category: 'Governance (G)',
    essentialCount: 8,
    leadershipCount: 4,
    color: 'emerald',
    coreKpi: 'Zero-tolerance anti-bribery & conflict of interest disclosures',
    essentialIndicators: [
      'Fines / penalties paid in proceedings with regulators / statutory authorities',
      'Anti-corruption and anti-bribery policies coverage across value chain',
      'Number of complaints received on conflict of interest of directors & KMPs',
      'Details of review of NGRBC guidelines by the Board and Committees'
    ],
    leadershipIndicators: [
      'Awareness programs conducted for value chain partners on ethics',
      'Processes in place to address conflict of interest in supply chain'
    ],
    dataInputs: ['Board minutes', 'Disciplinary actions register', 'Legal proceedings log', 'Vigil mechanism records'],
    assuranceFocus: 'Reasonable assurance on penalty disclosures and anti-corruption coverage percentages.'
  },
  {
    id: 'p2',
    code: 'Principle 2',
    title: 'Sustainable & Safe Products / Lifecycle',
    tagline: 'Businesses should provide goods and services in a manner that is sustainable and safe.',
    category: 'Environmental & Social (E&S)',
    essentialCount: 6,
    leadershipCount: 5,
    color: 'teal',
    coreKpi: 'Sustainable Sourcing & Extended Producer Responsibility (EPR)',
    essentialIndicators: [
      'Percentage of R&D and capex invested in environmental and social improvements',
      'Proportion of total inputs (raw materials) sourced sustainably',
      'Extended Producer Responsibility (EPR) compliance and plastic waste collection targets',
      'Procedures in place for safe reclamation and recycling of products at end-of-life'
    ],
    leadershipIndicators: [
      'Life Cycle Assessments (LCA) conducted for top revenue-generating products',
      'Recycled or reused input materials as percentage of total raw materials'
    ],
    dataInputs: ['Procurement bills', 'EPR portal certificates', 'LCA audit reports', 'R&D project allocations'],
    assuranceFocus: 'Verification of sustainable sourcing certifications (FSC, RSPO, ISO 14021) and EPR return manifests.'
  },
  {
    id: 'p3',
    code: 'Principle 3',
    title: 'Employee Well-being & Safety',
    tagline: 'Businesses should respect and promote the well-being of all employees, including those in their value chains.',
    category: 'Social (S)',
    essentialCount: 12,
    leadershipCount: 6,
    color: 'cyan',
    coreKpi: 'Lost Time Injury Frequency Rate (LTIFR) & Parity Audits',
    essentialIndicators: [
      'Health insurance & accident insurance coverage for permanent & contractual workers',
      'Lost Time Injury Frequency Rate (LTIFR) and fatalities in operating plants',
      'Maternity and paternity benefits return-to-work and retention rates',
      'Equal remuneration paid to women vs men for equal work across skill categories'
    ],
    leadershipIndicators: [
      'Percentage of value chain workers covered by safety and wellness audits',
      'Workplace transition and upskilling programs for older or reskilled employees'
    ],
    dataInputs: ['ESI/PF records', 'Safety incident logs (OSHA aligned)', 'HR payroll summaries', 'Contractor muster rolls'],
    assuranceFocus: 'Mandatory BRSR Core attribute requiring statutory assurance on LTIFR and safety incident zero-tolerance.'
  },
  {
    id: 'p4',
    code: 'Principle 4',
    title: 'Stakeholder Engagement & Grievances',
    tagline: 'Businesses should respect the interests of and be responsive to all its stakeholders.',
    category: 'Governance & Social (G&S)',
    essentialCount: 4,
    leadershipCount: 3,
    color: 'blue',
    coreKpi: 'Grievance Redressal Velocity & Vulnerable Group Consultations',
    essentialIndicators: [
      'Identification of key stakeholder groups and frequency of formal engagements',
      'Number of stakeholder consultation sessions with vulnerable & marginalized groups',
      'Channels and mechanisms for receiving feedback and grievance redressal rate',
      'Consultation process on environmental and social impact of new expansion projects'
    ],
    leadershipIndicators: [
      'Direct inclusion of stakeholder inputs into strategic business decisions',
      'Public reporting of minutes and grievance resolution times'
    ],
    dataInputs: ['Community town hall records', 'Investor call transcripts', 'Customer ombudsman logs'],
    assuranceFocus: 'Verification that grievance redressal mechanisms cover 100% of defined vulnerable stakeholder groups.'
  },
  {
    id: 'p5',
    code: 'Principle 5',
    title: 'Human Rights & Fair Labor',
    tagline: 'Businesses should respect and promote human rights across operations and supply chain.',
    category: 'Social & Governance (S&G)',
    essentialCount: 7,
    leadershipCount: 4,
    color: 'indigo',
    coreKpi: 'Zero Tolerance for Child/Forced Labor & POSH Governance',
    essentialIndicators: [
      'Training provided to employees and contractual workers on human rights policies',
      'Minimum wages paid as per statutory notifications across all site states',
      'Zero complaints regarding child labor, forced/involuntary labor, or sexual harassment (POSH)',
      'Internal Complaints Committee (ICC) constitution and disposal timelines'
    ],
    leadershipIndicators: [
      'Human rights due diligence conducted for tier-1 supply chain vendors',
      'Percentage of suppliers assessed for fair wage practices and living wage premiums'
    ],
    dataInputs: ['POSH committee reports', 'Contractor wage audit slips', 'Biometric timecard audits', 'Human rights training LMS'],
    assuranceFocus: 'BRSR Core assurance on sexual harassment complaints, disposal rate, and statutory wage compliance.'
  },
  {
    id: 'p6',
    code: 'Principle 6',
    title: 'Environment, GHG & Water Stewardship',
    tagline: 'Businesses should respect and make efforts to protect and restore the environment.',
    category: 'Environmental (E)',
    essentialCount: 14,
    leadershipCount: 8,
    color: 'emerald',
    coreKpi: 'Scope 1 & 2 Emissions, Water Withdrawal & Hazardous Waste Intensity',
    essentialIndicators: [
      'Total energy consumption from renewable and non-renewable sources in Joules',
      'Scope 1 direct greenhouse gas emissions (metric tonnes of CO₂ equivalent)',
      'Scope 2 indirect emissions from purchased grid electricity',
      'Total water withdrawal by source, consumption, and water recycled percentage',
      'Hazardous and non-hazardous waste generation, recycling, and disposal methods'
    ],
    leadershipIndicators: [
      'Scope 3 upstream and downstream value chain emissions accounting',
      'Biodiversity impact assessments and habitat restoration programs'
    ],
    dataInputs: ['DISCOM power bills', 'Fuel purchase vouchers', 'Flow meter logs', 'Hazardous waste Form 10 manifests'],
    assuranceFocus: 'High-rigor BRSR Core mandatory reasonable assurance: CEA grid factor cross-verification and mass balance.'
  },
  {
    id: 'p7',
    code: 'Principle 7',
    title: 'Responsible Public Policy & Advocacy',
    tagline: 'Businesses, when engaging in influencing public and regulatory policy, should do so in a responsible manner.',
    category: 'Governance (G)',
    essentialCount: 3,
    leadershipCount: 2,
    color: 'amber',
    coreKpi: 'Trade Association Affiliations & Policy Submission Logs',
    essentialIndicators: [
      'Number of affiliations with trade and industry chambers (CII, FICCI, ASSOCHAM)',
      'Details of public policy advocacy positions taken with government ministries',
      'Corrective action taken in response to anti-competitive conduct queries'
    ],
    leadershipIndicators: [
      'Public disclosure of board-approved principles guiding public policy interventions',
      'Transparency on political contributions and campaign spending (if any)'
    ],
    dataInputs: ['Industry association membership receipts', 'Public consultation papers', 'Legal regulatory filings'],
    assuranceFocus: 'Accuracy and completeness of public advocacy and regulatory review records.'
  },
  {
    id: 'p8',
    code: 'Principle 8',
    title: 'Inclusive Growth & CSR Impact',
    tagline: 'Businesses should promote inclusive growth and equitable development.',
    category: 'Social (S)',
    essentialCount: 5,
    leadershipCount: 4,
    color: 'sky',
    coreKpi: 'Aspirational District CSR Spend & Beneficiary Audit',
    essentialIndicators: [
      'Social Impact Assessments (SIA) carried out for major development projects',
      'Information on project rehabilitation and resettlement (R&R) of affected communities',
      'Details of CSR expenditures in Aspirational Districts identified by NITI Aayog',
      'Percentage of local procurement and direct local employment generated near plant sites'
    ],
    leadershipIndicators: [
      'Independent third-party impact assessment of major CSR projects',
      'Direct livelihood enhancement metrics tracked over 3-year periods'
    ],
    dataInputs: ['CSR project sanction letters', 'NITI Aayog district mapping logs', 'SIA consultant reports', 'Vendor geo-logs'],
    assuranceFocus: 'Mandatory BRSR Core validation of CSR spending in aspirational districts and beneficiary rosters.'
  },
  {
    id: 'p9',
    code: 'Principle 9',
    title: 'Consumer Value & Responsible Service',
    tagline: 'Businesses should engage with and provide value to their consumers in a responsible manner.',
    category: 'Social & Governance (S&G)',
    essentialCount: 6,
    leadershipCount: 3,
    color: 'violet',
    coreKpi: 'Data Privacy Breaches, Cyber Security & Product Safety',
    essentialIndicators: [
      'Number of consumer complaints received on data privacy, cyber security, & unfair trade',
      'Turnaround time and percentage of consumer complaints pending resolution',
      'Details of product recall due to safety or environmental hazards',
      'Display of product information, safe usage guidelines, and eco-labels on packaging'
    ],
    leadershipIndicators: [
      'Direct customer satisfaction index (CSAT/NPS) tracking ESG sentiment',
      'External cybersecurity certifications (ISO 27001, CERT-In compliance)'
    ],
    dataInputs: ['Customer service CRM tickets', 'Data protection officer incident logs', 'Product label compliance audit'],
    assuranceFocus: 'BRSR Core verification of data privacy incidents and resolution percentages.'
  }
];

export const WORKFLOW_ROLES = [
  {
    id: 'site-operator',
    role: 'Site Operator / Facility Engineer',
    tier: 'Tier 1 — Ground Zero Data Capture',
    avatarColor: 'bg-emerald-500',
    location: '250+ Plant Locations & Warehouses',
    responsibilities: [
      'Logs daily fuel consumption (diesel gensets, furnace oil, PNG)',
      'Uploads monthly DISCOM electricity bills and solar inverter yield logs',
      'Enters effluent treatment plant (ETP) flow readings and water recycling metrics',
      'Scans hazardous waste Form 10 manifests and laboratory test reports'
    ],
    tools: 'Mobile barcode scanner, utility slip OCR reader, shift log input',
    approvalPower: 'Submit for review with evidence attachment'
  },
  {
    id: 'bu-manager',
    role: 'BU / Plant Manager',
    tier: 'Tier 2 — Variance & Anomaly Verification',
    avatarColor: 'bg-teal-600',
    location: 'Manufacturing Division Heads',
    responsibilities: [
      'Automated baseline comparison against last month and prior fiscal year',
      'Investigates variance spikes (> 10% deviations automatically flagged)',
      'Validates production volumes vs energy consumption for intensity sanity',
      'Signs off on facility-level data integrity before regional consolidation'
    ],
    tools: 'Variance radar, anomaly detector, batch invoice reconciler',
    approvalPower: 'Approve or Reject with mandatory revision notes'
  },
  {
    id: 'subsidiary-esg',
    role: 'Subsidiary ESG Officer',
    tier: 'Tier 3 — Regional Consolidation & Normalization',
    avatarColor: 'bg-blue-600',
    location: 'Regional HQ / Subsidiary Entities',
    responsibilities: [
      'Aggregates multi-facility data across state jurisdictions',
      'Applies regional emission grid factors (State DISCOM / CEA regional grids)',
      'Normalizes ESG metrics against subsidiary turnover and headcount',
      'Coordinates missing evidence follow-ups with local site champions'
    ],
    tools: 'Regional roll-up dashboard, gap analysis matrix, missing evidence tracker',
    approvalPower: 'Consolidate & forward to Corporate Group ESG'
  },
  {
    id: 'corporate-lead',
    role: 'Corporate Group ESG Lead & CFO',
    tier: 'Tier 4 — Enterprise Sign-off & SEBI Filing',
    avatarColor: 'bg-indigo-600',
    location: 'Executive Headquarters / Board Level',
    responsibilities: [
      'Enterprise-wide roll-up across all 250+ project sites and subsidiaries',
      'Prepares Board Committee BRSR oversight report and CSR disclosures',
      'Authorizes digital token sign-off for SEBI Annexure I & II submission',
      'Locks data period to prevent unauthorized retrospective alterations'
    ],
    tools: 'Executive dashboard, Board report generator, period locking console',
    approvalPower: 'Final Board authorization & filing lock'
  },
  {
    id: 'assurance-auditor',
    role: 'External Assurance Auditor',
    tier: 'Tier 5 — Statutory Reasonable Assurance (Big 4 / Certifiers)',
    avatarColor: 'bg-purple-600',
    location: 'Independent Assurance Firm (EY, KPMG, PwC, Deloitte, DNV)',
    responsibilities: [
      'Read-only access to immutable evidence vault with SHA-256 hashes',
      'Performs statistical sampling across 250+ sites with one-click drill-down',
      'Verifies source invoices against reported GHG, water, and diversity data',
      'Issues digital Reasonable Assurance Certificate as per SEBI Core guidelines'
    ],
    tools: 'Sampling workbench, document inspection lightbox, assurance sign-off module',
    approvalPower: 'Issue Statutory Independent Assurance Statement'
  }
];

export const BRSR_CORE_ATTRIBUTES = [
  { id: 'a1', code: 'Attr 1', title: 'Greenhouse Gas Footprint', scope: 'Scope 1 & Scope 2 Emissions per Rupee turnover', assurance: 'Reasonable Assurance' },
  { id: 'a2', code: 'Attr 2', title: 'Water Footprint & Circularity', scope: 'Water consumption & percentage of recycled water', assurance: 'Reasonable Assurance' },
  { id: 'a3', code: 'Attr 3', title: 'Energy Footprint & Renewables', scope: 'Total energy consumed & share from renewable sources', assurance: 'Reasonable Assurance' },
  { id: 'a4', code: 'Attr 4', title: 'Embracing Circularity', scope: 'Hazardous/plastic waste generated & disposal recovery %', assurance: 'Reasonable Assurance' },
  { id: 'a5', code: 'Attr 5', title: 'Employee Well-being & Safety', scope: 'LTIFR, fatalities, health cover & safety audits', assurance: 'Reasonable Assurance' },
  { id: 'a6', code: 'Attr 6', title: 'Gender Diversity in Workforce', scope: 'Women in workforce, Board diversity & equal remuneration', assurance: 'Reasonable Assurance' },
  { id: 'a7', code: 'Attr 7', title: 'Inclusive Development (CSR)', scope: 'CSR spend in Aspirational Districts & direct beneficiaries', assurance: 'Reasonable Assurance' },
  { id: 'a8', code: 'Attr 8', title: 'Fairness in Value Chain', scope: 'Trading terms, MSME payment turnaround time (<45 days)', assurance: 'Reasonable Assurance' },
  { id: 'a9', code: 'Attr 9', title: 'Open-ness & Data Privacy', scope: 'Consumer grievance disposal rate & zero data breaches', assurance: 'Reasonable Assurance' },
];

export const FAQS = [
  {
    q: 'What is BRSR Core and how does SEBI’s Reasonable Assurance mandate work?',
    a: 'BRSR Core is a targeted subset of the broader Business Responsibility and Sustainability Report consisting of 9 key Performance Indicators (KPIs) introduced by SEBI under Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122. Under this mandate, the top 1000 listed entities by market capitalization are required to obtain reasonable assurance on their BRSR Core metrics from an independent statutory assurance provider. SustainTrace is architected with an immutable evidence vault that satisfies ISAE 3000 / SSAE 3000 standards, enabling certifiers to trace every number down to original bills and calibration certificates.'
  },
  {
    q: 'How does the platform calculate Scope 1, Scope 2, and Intensity ratios dynamically?',
    a: 'SustainTrace utilizes standard emission factors from the Central Electricity Authority (CEA User Guide v19) for regional Indian power grids, IPCC 2006 guidelines for stationary/mobile fossil fuel combustion, and DEFRA emission factors for global operations. Users simply input raw consumption numbers (litres of diesel, cubic meters of natural gas, kWh of electricity, etc.) or upload bills; our calculation engine converts these into CO₂e automatically and computes turnover-based intensity ratios normalized against standalone or consolidated revenues.'
  },
  {
    q: 'How does multi-unit roll-up handle 200+ geographically distributed sites without data loss?',
    a: 'Our hierarchical roll-up engine allows enterprises to mirror their legal organizational tree (Group -> Subsidiaries -> Business Units -> Plant Sites / Mines / Offices). Each site is assigned discrete role-based credentials. Site operators enter monthly operational slips with mandatory attachments. Built-in boundary validators detect missing entries, unit conversion errors, and historical variance anomalies before rolling figures up through regional heads to the corporate reporting dashboard.'
  },
  {
    q: 'Can external assurance providers (Big 4, DNV, SGS, BSI) access our evidence vault safely?',
    a: 'Yes. SustainTrace includes a dedicated External Auditor Portal with fine-grained read-only permissions. External assurance teams can review audit trails, inspect cryptographic document hashes, execute random statistical sample tests across the 250+ sites, request clarification notes on specific data points, and attach their final assurance sign-off statement directly in the platform.'
  },
  {
    q: 'Is SustainTrace compliant with SEBI’s XBRL filing taxonomy and PDF export standards?',
    a: 'Absolutely. SustainTrace produces pre-formatted Annexure I (BRSR Core Assurance Matrix) and Annexure II (Comprehensive NGRBC Principles Disclosures) formatted strictly according to SEBI regulations. The export engine allows one-click generation of board-ready PDF reports and machine-readable XBRL packages aligned with NSE and BSE electronic filing specifications.'
  },
  {
    q: 'How are mid-year organizational restructuring, mergers, and baseline recalculations handled?',
    a: 'The platform adheres to GHG Protocol Corporate Standard guidelines for baseline adjustments. When an entity undergoes acquisitions, divestments, or significant organic growth, the platform provides automated baseline recalculation policies that re-align historical baselines (e.g., base year FY 2021-22) so that performance comparisons remain statistically valid and auditable.'
  }
];

export const SAMPLE_BRSR_TABLE = [
  {
    principle: 'P6: GHG Emissions',
    attribute: 'Scope 1 Direct GHG',
    param: 'Fuel & Gas Combustion',
    unit: 'tCO₂e',
    fy24: '82,410',
    fy23: '96,120',
    assurance: 'Reasonably Assured',
    status: 'Verified'
  },
  {
    principle: 'P6: GHG Emissions',
    attribute: 'Scope 2 Indirect GHG',
    param: 'Purchased Electricity (Grid)',
    unit: 'tCO₂e',
    fy24: '66,510',
    fy23: '77,480',
    assurance: 'Reasonably Assured',
    status: 'Verified'
  },
  {
    principle: 'P6: GHG Intensity',
    attribute: 'GHG Intensity / Revenue',
    param: 'Scope 1+2 per ₹ Crore turnover',
    unit: 'tCO₂e / ₹ Cr',
    fy24: '12.8',
    fy23: '15.6',
    assurance: 'Reasonably Assured',
    status: 'Verified'
  },
  {
    principle: 'P6: Water Management',
    attribute: 'Water Recycled Ratio',
    param: 'Treated water reused internally',
    unit: '%',
    fy24: '68.4%',
    fy23: '59.8%',
    assurance: 'Reasonably Assured',
    status: 'Verified'
  },
  {
    principle: 'P3: Health & Safety',
    attribute: 'LTIFR Rate',
    param: 'Lost Time Injury Frequency Rate',
    unit: 'Per million hrs',
    fy24: '0.14',
    fy23: '0.22',
    assurance: 'Reasonably Assured',
    status: 'Verified'
  },
  {
    principle: 'P5: Diversity & Gender',
    attribute: 'Female Workforce Ratio',
    param: 'Permanent female employees',
    unit: '%',
    fy24: '34.2%',
    fy23: '29.1%',
    assurance: 'Reasonably Assured',
    status: 'Verified'
  },
  {
    principle: 'P8: Inclusive CSR',
    attribute: 'Aspirational Districts',
    param: 'CSR Spend in Aspirational Dist.',
    unit: '₹ Crore',
    fy24: '14.8 Cr',
    fy23: '11.2 Cr',
    assurance: 'Reasonably Assured',
    status: 'Verified'
  }
];
