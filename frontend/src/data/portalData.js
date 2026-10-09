export const ROLES_CONFIG = {
  site_operator: {
    id: 'site_operator',
    path: '/portal/site-operator',
    name: 'Rajesh Kumar',
    email: 'operator.site254@meilgroup.com',
    roleTitle: 'Site Operator',
    badge: 'Tier 1 • Site Level',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    assignedEntity: 'Unit 4 — Cuttack Solar & Substation Plant',
    hierarchyPath: 'MEIL Group > MEIL Green Power > Unit 4 (Cuttack)',
    avatar: 'RK'
  },
  bu_manager: {
    id: 'bu_manager',
    path: '/portal/bu-manager',
    name: 'Sunita Sharma',
    email: 'bu.manager.solar@meilgroup.com',
    roleTitle: 'BU / Project Manager',
    badge: 'Tier 2 • BU Approval',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    assignedEntity: 'Eastern Renewable Energy Division (6 Sites)',
    hierarchyPath: 'MEIL Group > MEIL Green Power > Eastern Solar BU',
    avatar: 'SS'
  },
  subsidiary_officer: {
    id: 'subsidiary_officer',
    path: '/portal/subsidiary-officer',
    name: 'Vikram Malhotra',
    email: 'esg.subsidiary@meilgreenpower.com',
    roleTitle: 'Subsidiary ESG Officer',
    badge: 'Tier 3 • Subsidiary Lead',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    assignedEntity: 'MEIL Green Power Ltd (38 Operating Sites)',
    hierarchyPath: 'MEIL Group > Subsidiary: MEIL Green Power Ltd',
    avatar: 'VM'
  },
  group_admin: {
    id: 'group_admin',
    path: '/portal/group-admin',
    name: 'Dr. Ananya Sen',
    email: 'chief.esg@meilgroup.com',
    roleTitle: 'Group ESG Lead (Corporate)',
    badge: 'Tier 4 • Top Admin',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    assignedEntity: 'MEIL Conglomerate Corporate HQ (254 Sites)',
    hierarchyPath: 'MEIL Group Holding Board • All Subsidiaries',
    avatar: 'AS'
  },
  auditor: {
    id: 'auditor',
    path: '/portal/auditor',
    name: 'Marcus Vance, Partner',
    email: 'marcus.vance@kpmg-assurance.com',
    roleTitle: 'Assurance Auditor (Independent)',
    badge: 'Tier 5 • Statutory Auditor',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    assignedEntity: 'Statutory Independent Assurance (ISAE 3000)',
    hierarchyPath: 'External Assurance Panel • SEBI BRSR Core Mandate',
    avatar: 'MV'
  }
};

export const ROLE_ROUTE_MAP = {
  site_operator: '/portal/site-operator',
  bu_manager: '/portal/bu-manager',
  subsidiary_officer: '/portal/subsidiary-officer',
  group_admin: '/portal/group-admin',
  auditor: '/portal/auditor',
};


export const INITIAL_OPERATOR_METRICS = [
  {
    id: 'elec-grid',
    category: 'Electricity (Grid Consumption)',
    subCategory: 'Scope 2 Indirect',
    value: 124500,
    unit: 'kWh',
    emissionFactor: 0.716, // CEA v19 kgCO2e/kWh
    calcEmission: 89.14,
    calcUnit: 'tCO₂e',
    evidenceFile: 'TPCODL_PowerBill_Sept2025.pdf',
    fileSize: '2.4 MB',
    fileHash: 'sha256:e83f12a9...d091',
    status: 'Verified',
    statusNote: 'Bill matches meter logs. No discrepancy.'
  },
  {
    id: 'diesel-genset',
    category: 'Diesel (Backup DG Sets)',
    subCategory: 'Scope 1 Stationary Combustion',
    value: 4820,
    unit: 'Liters',
    emissionFactor: 2.68, // IPCC kgCO2e/liter
    calcEmission: 12.92,
    calcUnit: 'tCO₂e',
    evidenceFile: 'IOCL_FuelDeliverySlip_Sept2025.pdf',
    fileSize: '1.1 MB',
    fileHash: 'sha256:b149cd22...55f2',
    status: 'Pending Review',
    statusNote: 'Awaiting BU sign-off on DG run-hours.'
  },
  {
    id: 'water-withdrawal',
    category: 'Groundwater & Municipal Supply',
    subCategory: 'Water Stewardship (Principle 6)',
    value: 1840,
    unit: 'kL (Kiloliters)',
    emissionFactor: null,
    calcEmission: 64.2,
    calcUnit: '% Recycled',
    evidenceFile: 'Cuttack_Municipal_WaterSlip_Q2.pdf',
    fileSize: '890 KB',
    fileHash: 'sha256:4a001fb7...821c',
    status: 'Requires Edit',
    statusNote: 'Discrepancy: Flow meter calibration expired in August. Re-upload certificate.'
  },
  {
    id: 'haz-waste',
    category: 'Hazardous Waste (Spent Transformer Oil)',
    subCategory: 'Circularity & Waste (Principle 6)',
    value: 1.45,
    unit: 'MT (Metric Tonnes)',
    emissionFactor: null,
    calcEmission: 100,
    calcUnit: '% Authorized Recycler',
    evidenceFile: 'CPCB_Form10_Manifest_Sept2025.pdf',
    fileSize: '3.6 MB',
    fileHash: 'sha256:88fa2981...19a2',
    status: 'Verified',
    statusNote: 'Authorized CPCB recycler manifest verified.'
  },
  {
    id: 'safety-incidents',
    category: 'Safety & Incident Logs (LTIFR)',
    subCategory: 'Employee Well-being (Principle 3)',
    value: 0,
    unit: 'Fatalities / Lost Time Incidents',
    emissionFactor: null,
    calcEmission: 0.0,
    calcUnit: 'LTIFR Score',
    evidenceFile: 'EHS_MonthlySafetyRegister_Sept2025.pdf',
    fileSize: '1.8 MB',
    fileHash: 'sha256:cd517721...7a33',
    status: 'Verified',
    statusNote: 'Zero safety incidents logged. 420 safe work-days.'
  }
];

export const BU_APPROVAL_QUEUE = [
  {
    id: 'SUB-2025-081',
    siteName: 'Unit 4 — Cuttack Solar',
    operatorName: 'Rajesh Kumar',
    category: 'Diesel (DG Backup)',
    reportedValue: '4,820 Liters',
    calcGhg: '12.92 tCO₂e',
    proofDocument: 'IOCL_FuelDeliverySlip_Sept2025.pdf',
    varianceVsLastFy: '+14.2%',
    varianceAlert: true,
    varianceReason: 'Extended grid power outage during monsoon cyclone.',
    submittedAt: 'Today, 10:45 AM',
    status: 'Pending Review'
  },
  {
    id: 'SUB-2025-082',
    siteName: 'Unit 2 — Balasore Substation',
    operatorName: 'Prakash Jena',
    category: 'Grid Electricity',
    reportedValue: '98,400 kWh',
    calcGhg: '70.45 tCO₂e',
    proofDocument: 'TPNODL_GridInvoice_Sept2025.pdf',
    varianceVsLastFy: '-3.8%',
    varianceAlert: false,
    varianceReason: 'Energy efficiency LED retrofits complete.',
    submittedAt: 'Yesterday, 04:20 PM',
    status: 'Approved'
  },
  {
    id: 'SUB-2025-083',
    siteName: 'Unit 6 — Paradip Port Yard',
    operatorName: 'Amit Mohanty',
    category: 'Water Withdrawal',
    reportedValue: '3,210 kL',
    calcGhg: '52% Recycled',
    proofDocument: 'Paradip_IndustrialWater_Voucher.pdf',
    varianceVsLastFy: '+22.5%',
    varianceAlert: true,
    varianceReason: 'Dust suppression operations increased due to dry spells.',
    submittedAt: '2 days ago',
    status: 'Requires Edit'
  },
  {
    id: 'SUB-2025-084',
    siteName: 'Unit 1 — Sambalpur Solar Park',
    operatorName: 'Deepak Nayak',
    category: 'Safety & EHS Log',
    reportedValue: '0 Incidents',
    calcGhg: 'LTIFR 0.00',
    proofDocument: 'Sambalpur_EHS_MonthlySafetyRegister.pdf',
    varianceVsLastFy: '0.0%',
    varianceAlert: false,
    varianceReason: 'Zero loss-time accidents maintained.',
    submittedAt: '3 days ago',
    status: 'Approved'
  }
];

export const SUBSIDIARY_SITES_PROGRESS = [
  {
    id: 'site-1',
    siteName: 'Cuttack Solar Plant #4',
    location: 'Odisha',
    category: 'Solar Generation',
    completionPct: 85,
    pendingMetrics: 1,
    verifiedMetrics: 4,
    lastUpdate: '2 hours ago',
    status: 'In Review',
    statusColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'site-2',
    siteName: 'Balasore 400kV Substation',
    location: 'Odisha',
    category: 'Transmission',
    completionPct: 100,
    pendingMetrics: 0,
    verifiedMetrics: 5,
    lastUpdate: 'Yesterday',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'site-3',
    siteName: 'Paradip Coastal Terminal',
    location: 'Odisha',
    category: 'Logistics',
    completionPct: 60,
    pendingMetrics: 2,
    verifiedMetrics: 3,
    lastUpdate: '3 days ago',
    status: 'Requires Edit',
    statusColor: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'site-4',
    siteName: 'Sambalpur Mega Solar Park',
    location: 'Odisha',
    category: 'Solar Generation',
    completionPct: 100,
    pendingMetrics: 0,
    verifiedMetrics: 5,
    lastUpdate: '4 days ago',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'site-5',
    siteName: 'Jajpur Green Hydrogen Pilot',
    location: 'Odisha',
    category: 'Clean Fuels',
    completionPct: 90,
    pendingMetrics: 1,
    verifiedMetrics: 4,
    lastUpdate: '1 day ago',
    status: 'In Review',
    statusColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'site-6',
    siteName: 'Angul Transmission Substation',
    location: 'Odisha',
    category: 'Transmission',
    completionPct: 100,
    pendingMetrics: 0,
    verifiedMetrics: 5,
    lastUpdate: '5 days ago',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-emerald-800'
  }
];

export const SUBSIDIARY_PRINCIPLES_SUMMARY = [
  { id: 'p1', code: 'P1', title: 'Ethics & Anti-Corruption', score: '100%', status: 'Ready', indicators: '8/8 Complete' },
  { id: 'p2', code: 'P2', title: 'Sustainable Products & EPR', score: '94%', status: 'Ready', indicators: '6/6 Complete' },
  { id: 'p3', code: 'P3', title: 'Employee Well-being & Safety', score: '98%', status: 'Ready', indicators: '12/12 Complete' },
  { id: 'p4', code: 'P4', title: 'Stakeholder Engagement', score: '100%', status: 'Ready', indicators: '4/4 Complete' },
  { id: 'p5', code: 'P5', title: 'Human Rights & Fair Pay', score: '100%', status: 'Ready', indicators: '7/7 Complete' },
  { id: 'p6', code: 'P6', title: 'Environment, GHG & Water', score: '92%', status: 'Active Validation', indicators: '13/14 Complete' },
  { id: 'p7', code: 'P7', title: 'Public Advocacy & Policy', score: '100%', status: 'Ready', indicators: '3/3 Complete' },
  { id: 'p8', code: 'P8', title: 'Inclusive CSR (Aspirational)', score: '95%', status: 'Ready', indicators: '5/5 Complete' },
  { id: 'p9', code: 'P9', title: 'Consumer Privacy & Security', score: '100%', status: 'Ready', indicators: '6/6 Complete' },
];

export const GROUP_CORPORATE_KPI = {
  conglomerateScope1: '82,410',
  conglomerateScope2: '66,510',
  totalGhgEmissions: '148,920',
  ghgIntensity: '12.80 tCO₂e / ₹ Cr turnover',
  ghgYoYChange: '-14.2%',
  energyRenewablePct: '48.6%',
  waterRecycledPct: '68.4%',
  genderDiversityPct: '34.2%',
  totalSites: 254,
  sitesSubmitted: 248,
  sitesApproved: 241,
  sebiCompleteness: '98.4%',
  sebiFilingsStatus: 'Pre-Audit Ready',
  subsidiaries: [
    { name: 'MEIL Green Power Ltd', sites: 38, emissions: '42,100 tCO₂e', progress: 96, lead: 'Vikram Malhotra' },
    { name: 'MEIL Infrastructure Ltd', sites: 92, emissions: '56,800 tCO₂e', progress: 92, lead: 'Arunav Roy' },
    { name: 'MEIL Hydro & Irrigation', sites: 64, emissions: '28,420 tCO₂e', progress: 98, lead: 'Pooja Reddy' },
    { name: 'MEIL Hydrocarbons & Gas', sites: 42, emissions: '18,600 tCO₂e', progress: 94, lead: 'M. S. Swaminathan' },
    { name: 'MEIL Urban EV Mobility', sites: 18, emissions: '3,000 tCO₂e', progress: 100, lead: 'Kavita Pillai' },
  ]
};

export const AUDITOR_CHECKLIST = [
  {
    id: 'KPI-CORE-01',
    attribute: 'Scope 1 GHG Footprint',
    reportedValue: '82,410.00 tCO₂e',
    standard: 'IPCC 2006 Stationary Combustion',
    sampleSize: '48 / 254 Sites Tested',
    auditStatus: 'Verified',
    auditorNotes: 'Diesel, natural gas and furnace oil consumption reconciled against tax invoices.',
    evidenceHash: 'sha256:7f83b165...4b1f',
    evidenceDocs: ['IOCL_BulkFuelReceipts_FY25.pdf', 'CEA_GasPipeline_Log.xlsx']
  },
  {
    id: 'KPI-CORE-02',
    attribute: 'Scope 2 Purchased Grid Power',
    reportedValue: '66,510.00 tCO₂e',
    standard: 'CEA Grid User Guide v19 (0.716 kg/kWh)',
    sampleSize: '62 / 254 Sites Tested',
    auditStatus: 'Verified',
    auditorNotes: 'DISCOM electricity bills mathematically matched with monthly ledger entries.',
    evidenceHash: 'sha256:a1409c91...8842',
    evidenceDocs: ['Consolidated_DISCOM_Invoices_FY25.zip', 'CEA_v19_GridFactor_Validation.pdf']
  },
  {
    id: 'KPI-CORE-03',
    attribute: 'Turnover GHG Intensity',
    reportedValue: '12.80 tCO₂e / ₹ Cr',
    standard: 'SEBI Circular Annexure I Metric 1c',
    sampleSize: 'Group Consolidated Accounts',
    auditStatus: 'Verified',
    auditorNotes: 'Turnover ₹11,634.37 Cr cross-referenced with audited statutory balance sheet.',
    evidenceHash: 'sha256:4919ddaa...e991',
    evidenceDocs: ['Audited_Financial_Statements_FY25.pdf', 'Statutory_Auditor_Turnover_Cert.pdf']
  },
  {
    id: 'KPI-CORE-04',
    attribute: 'Water Recycled % & Consumption',
    reportedValue: '68.4% Recycled (1,420,500 kL)',
    standard: 'NGRBC Principle 6 Metric 3',
    sampleSize: '24 ETP & ZLD Plants',
    auditStatus: 'Flagged for Discrepancy',
    auditorNotes: 'Flow meter at Unit 4 Cuttack calibration report expired in August. Fresh certificate required.',
    evidenceHash: 'sha256:5899ea22...cc12',
    evidenceDocs: ['ZLD_ETP_LogSheets.pdf', 'Odisha_PCB_Renewal_NOC.pdf']
  },
  {
    id: 'KPI-CORE-05',
    attribute: 'LTIFR & Workplace Safety',
    reportedValue: '0.14 per Million Hours',
    standard: 'IS 3786 / OSHA Safety Standards',
    sampleSize: 'All 254 Operating Units',
    auditStatus: 'Verified',
    auditorNotes: 'Zero fatalities confirmed with Factory Inspectorate filings across 14 states.',
    evidenceHash: 'sha256:9901bf28...224a',
    evidenceDocs: ['Factory_Inspector_Annual_Returns.pdf', 'Workplace_Accident_Registers.zip']
  },
  {
    id: 'KPI-CORE-06',
    attribute: 'Gender Remuneration Parity',
    reportedValue: '1:1.02 (Female to Male Median Pay)',
    standard: 'Equal Remuneration Act 1976',
    sampleSize: 'Complete Payroll Muster (48,200 staff)',
    auditStatus: 'Verified',
    auditorNotes: 'Median pay verified across senior, mid and plant worker brackets.',
    evidenceHash: 'sha256:1198cbaa...8371',
    evidenceDocs: ['HR_Payroll_Parity_Audit_Report.pdf', 'PF_ESI_Challan_Summaries.pdf']
  }
];
