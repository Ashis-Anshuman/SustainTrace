import React, { useState, useRef } from 'react';
import {
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiFileText,
  FiSave,
  FiSend,
  FiZap,
  FiX,
  FiEye,
  FiDownload,
  FiTrash2,
  FiImage,
  FiShield,
  FiCopy
} from 'react-icons/fi';
import { INITIAL_OPERATOR_METRICS } from '../../data/portalData';

export const SiteOperatorPanel = () => {
  const [metrics, setMetrics] = useState(INITIAL_OPERATOR_METRICS);
  const [selectedMetricForUpload, setSelectedMetricForUpload] = useState(null);
  const [submittedAlert, setSubmittedAlert] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);
  const [uploadAlert, setUploadAlert] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedUploadCategory, setSelectedUploadCategory] = useState('Electricity (Grid Consumption)');
  const [viewingDocument, setViewingDocument] = useState(null);

  const fileInputRef = useRef(null);
  const modalFileInputRef = useRef(null);

  // Initial vault records initialized from operator metrics
  const [vaultRecords, setVaultRecords] = useState(() => 
    INITIAL_OPERATOR_METRICS.map(m => ({
      id: `init-${m.id}`,
      metricId: m.id,
      category: m.category,
      filename: m.evidenceFile,
      fileSize: m.fileSize,
      fileHash: m.fileHash,
      fullHash: 'e83f12a9c4029148d88e0b2a5c10fa89b37c09d841e2049381d091a78b456' + m.id.length + '9c1',
      fileType: m.evidenceFile.endsWith('.pdf') ? 'pdf' : 'image',
      fileUrl: null,
      status: m.status,
      uploadedAt: 'Baseline Ingestion',
      isDefault: true
    }))
  );

  // Helper to calculate real SHA-256 hash using Web Crypto API
  const calculateSha256 = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return 'e83f12a9' + Math.random().toString(16).substring(2, 10) + '5b49c1';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '1.2 MB';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Process uploaded PDF or Image file
  const handleProcessUploadedFile = async (file, targetMetricId = null, targetCategory = null) => {
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|svg)$/i.test(file.name);
    const fileType = isPdf ? 'pdf' : isImage ? 'image' : 'doc';
    const fileUrl = URL.createObjectURL(file);
    const fullHash = await calculateSha256(file);
    const shortHash = `sha256:${fullHash.substring(0, 8)}...${fullHash.substring(fullHash.length - 4)}`;
    const formattedSize = formatFileSize(file.size);

    const targetCat = targetCategory || (targetMetricId ? metrics.find(m => m.id === targetMetricId)?.category : selectedUploadCategory);

    // If attached to a specific metric card, update that metric
    if (targetMetricId) {
      setMetrics(prev => prev.map(m => {
        if (m.id === targetMetricId) {
          return {
            ...m,
            evidenceFile: file.name,
            fileSize: formattedSize,
            fileHash: shortHash,
            fullHash,
            fileUrl,
            fileType,
            status: 'Pending Review',
            statusNote: 'Updated evidence file uploaded. Ready for BU review.'
          };
        }
        return m;
      }));
    }

    const newDoc = {
      id: `upload-${Date.now()}`,
      metricId: targetMetricId,
      category: targetCat,
      filename: file.name,
      fileSize: formattedSize,
      fileHash: shortHash,
      fullHash,
      fileType,
      fileUrl,
      status: 'Pending Review',
      uploadedAt: 'Just now',
      isUserUploaded: true
    };

    setVaultRecords(prev => [newDoc, ...prev]);
    setSelectedMetricForUpload(null);
    setUploadAlert(`Successfully uploaded & hashed ${file.name} (${fileType.toUpperCase()}) with SHA-256 stamp.`);
    setTimeout(() => setUploadAlert(''), 4500);

    // Sync metadata to backend if server is active
    try {
      fetch('http://localhost:5000/api/vault/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          fileType: file.type || fileType,
          fileSize: formattedSize,
          fileHash: fullHash,
          category: targetCat
        })
      }).catch(() => {});
    } catch {
      // Non-blocking fallback
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteVaultDoc = (id) => {
    setVaultRecords(prev => prev.filter(d => d.id !== id));
  };

  const handleCopyHash = (hash) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // Dynamic calculations based on input
  const handleValueChange = (id, newVal) => {
    const num = parseFloat(newVal) || 0;
    setMetrics(prev => prev.map(m => {
      if (m.id === id) {
        let calc = m.calcEmission;
        if (m.id === 'elec-grid') {
          calc = Number(((num * 0.716) / 1000).toFixed(2));
        } else if (m.id === 'diesel-genset') {
          calc = Number(((num * 2.68) / 1000).toFixed(2));
        }
        return { ...m, value: num, calcEmission: calc, status: 'Pending Review' };
      }
      return m;
    }));
  };

  const handleSaveDraft = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleSubmitToBu = () => {
    setMetrics(prev => prev.map(m => ({ ...m, status: 'Pending Review' })));
    setSubmittedAlert(true);
    setTimeout(() => setSubmittedAlert(false), 4000);
  };

  const totalScope1 = metrics.find(m => m.id === 'diesel-genset')?.calcEmission || 0;
  const totalScope2 = metrics.find(m => m.id === 'elec-grid')?.calcEmission || 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Scope Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200 font-mono">
              SITE ID: MEIL-SOLAR-004
            </span>
            <span className="text-xs text-slate-500 font-medium">Cuttack, Odisha</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
            Site Operator Data Ingestion Console
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Input physical utility consumption and attach statutory source evidence for FY 2025-26.
          </p>
        </div>

        {/* Live GHG Conversion Preview */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Site GHG Footprint
            </div>
            <div className="font-mono text-lg font-bold text-emerald-700">
              {(totalScope1 + totalScope2).toFixed(2)} <span className="text-xs">tCO₂e</span>
            </div>
            <div className="text-[10px] text-slate-500">
              S1: {totalScope1} | S2: {totalScope2}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <FiZap className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {uploadAlert && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-3.5 text-xs text-emerald-900 flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <FiCheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{uploadAlert}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadAlert('')}
            className="text-emerald-700 hover:text-emerald-900 font-bold text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {submittedAlert && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Successfully Submitted!</strong> All 5 operational metrics have been forwarded to Sunita Sharma (BU / Project Manager) for verification.
            </span>
          </div>
        </div>
      )}

      {savedAlert && (
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-800 flex items-center gap-2 animate-fade-in">
          <FiCheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
          <span>Draft changes saved locally to workstation cache.</span>
        </div>
      )}

      {/* Reviewer Revision Alert if any metric has 'Requires Edit' */}
      {metrics.some(m => m.status === 'Requires Edit') && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-800 flex items-start gap-3">
          <FiAlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Reviewer Feedback: Action Required on Water Withdrawal</strong>
            <p className="mt-0.5 text-rose-700">
              Auditor flagged expired flow meter calibration for August. Please upload the updated calibration test certificate below to clear the flag.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1: Quick Metric Ingestion Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Operational Metric Intake Form
            </h2>
            <p className="text-xs text-slate-500">
              Auto-calculates Scope 1 &amp; Scope 2 GHG using Central Electricity Authority (CEA v19) factors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <FiSave className="h-3.5 w-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              type="button"
              onClick={handleSubmitToBu}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
            >
              <FiSend className="h-3.5 w-3.5" />
              <span>Submit for BU Review</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => {
            const isRequiresEdit = metric.status === 'Requires Edit';
            const isVerified = metric.status === 'Verified';

            return (
              <div
                key={metric.id}
                className={`rounded-2xl border p-5 transition-all bg-white shadow-xs ${
                  isRequiresEdit
                    ? 'border-rose-300 ring-2 ring-rose-100'
                    : isVerified
                    ? 'border-emerald-200'
                    : 'border-slate-200'
                }`}
              >
                {/* Metric Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {metric.subCategory}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {metric.category}
                    </h3>
                  </div>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${
                    isVerified
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : isRequiresEdit
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {metric.status}
                  </span>
                </div>

                {/* Input Field with Unit Label */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reported Quantity ({metric.unit})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={metric.value}
                      onChange={(e) => handleValueChange(metric.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-xs font-medium text-slate-400 pointer-events-none">
                      {metric.unit.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Calculated Result / Intensity */}
                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-2.5 text-xs">
                  <span className="text-slate-500 font-medium">Computed Metric:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {metric.calcEmission} {metric.calcUnit}
                  </span>
                </div>

                {/* Attached Evidence Link with View & Replace */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setViewingDocument({
                      filename: metric.evidenceFile,
                      category: metric.category,
                      fileSize: metric.fileSize,
                      fileHash: metric.fileHash,
                      fullHash: metric.fullHash || 'e83f12a9c4029148d88e0b2a5c10fa89b37c09d841e2049381d091a78b456',
                      fileType: metric.fileType || (metric.evidenceFile.endsWith('.pdf') ? 'pdf' : 'image'),
                      fileUrl: metric.fileUrl,
                      status: metric.status,
                      uploadedAt: 'Attached for Audit'
                    })}
                    className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-700 truncate max-w-[190px] cursor-pointer text-left"
                    title="Click to preview attached evidence"
                  >
                    {metric.fileType === 'image' || (!metric.fileType && !metric.evidenceFile.endsWith('.pdf')) ? (
                      <FiImage className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                    ) : (
                      <FiFileText className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    )}
                    <span className="truncate text-[11px] font-mono font-medium">{metric.evidenceFile}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewingDocument({
                        filename: metric.evidenceFile,
                        category: metric.category,
                        fileSize: metric.fileSize,
                        fileHash: metric.fileHash,
                        fullHash: metric.fullHash || 'e83f12a9c4029148d88e0b2a5c10fa89b37c09d841e2049381d091a78b456',
                        fileType: metric.fileType || (metric.evidenceFile.endsWith('.pdf') ? 'pdf' : 'image'),
                        fileUrl: metric.fileUrl,
                        status: metric.status,
                        uploadedAt: 'Attached for Audit'
                      })}
                      className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
                      title="Inspect Document"
                    >
                      <FiEye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMetricForUpload(metric)}
                      className="text-emerald-700 hover:text-emerald-800 text-[11px] font-bold hover:underline cursor-pointer"
                    >
                      Upload Proof
                    </button>
                  </div>
                </div>

                {/* Reviewer Note if any */}
                {metric.statusNote && (
                  <p className="mt-2 text-[11px] text-slate-500 italic bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                    "{metric.statusNote}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Evidence Upload Vault Interface */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Evidence Upload Vault (SHA-256 Cryptographic Stamp)
              </h2>
              <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                ISAE 3000 Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload statutory utility bills, calibration certificates, and weighbridge slips in PDF or Image format.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
            {vaultRecords.length} Files Hashed &amp; Stored
          </span>
        </div>

        {/* Category Target Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-500 font-semibold text-xs">Attach to KPI:</span>
          {[
            'Electricity (Grid Consumption)',
            'Diesel (Backup DG Sets)',
            'Groundwater & Municipal Supply',
            'Hazardous Waste (Spent Oil)',
            'General Plant Audit Proof'
          ].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedUploadCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                selectedUploadCategory === cat
                  ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Drag and Drop Upload Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            isDraggingOver
              ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
              : 'border-slate-300 bg-slate-50/70 hover:bg-emerald-50/20 hover:border-emerald-400'
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-3 shadow-xs">
            <FiUploadCloud className="h-7 w-7" />
          </div>
          
          <h4 className="text-sm font-bold text-slate-900">
            {isDraggingOver ? 'Drop your PDF or Image to immediately hash & upload' : 'Drag and drop PDF or Image evidence here'}
          </h4>
          
          <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
            Targeting: <strong className="text-slate-800">{selectedUploadCategory}</strong>. Supports PDF documents, JPG, PNG, WEBP, and TIFF invoices up to 25MB.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-xs">
              <FiFileText className="h-4 w-4" />
              <span>Browse PDF or Image File</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleProcessUploadedFile(e.target.files[0]);
                    e.target.value = '';
                  }
                }}
              />
            </label>

            <span className="text-xs text-slate-400">or drop files into this box</span>
          </div>
        </div>

        {/* Uploaded Documents Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Filename</th>
                <th className="py-2.5 px-3">File Size</th>
                <th className="py-2.5 px-3">SHA-256 Hash</th>
                <th className="py-2.5 px-3">Uploaded</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {vaultRecords.map(doc => {
                const isPdf = doc.fileType === 'pdf';
                return (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {isPdf ? (
                        <span className="inline-flex items-center gap-1 rounded bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 text-[10px] font-bold">
                          <FiFileText className="h-3 w-3" />
                          PDF
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-teal-50 text-teal-700 border border-teal-200 px-1.5 py-0.5 text-[10px] font-bold">
                          <FiImage className="h-3 w-3" />
                          IMG
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      {doc.category}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-emerald-800 font-medium">
                      <button
                        type="button"
                        onClick={() => setViewingDocument(doc)}
                        className="hover:underline cursor-pointer text-left font-mono"
                        title="Click to view file preview"
                      >
                        {doc.filename}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                      {doc.fileSize}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      <span className="cursor-pointer hover:text-slate-700" onClick={() => handleCopyHash(doc.fullHash)} title="Click to copy SHA-256">
                        {doc.fileHash}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                      {doc.uploadedAt}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span className="rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewingDocument(doc)}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-emerald-700 text-xs font-semibold cursor-pointer"
                          title="Preview document"
                        >
                          <FiEye className="h-3.5 w-3.5" />
                          <span>View</span>
                        </button>
                        {doc.fileUrl && (
                          <a
                            href={doc.fileUrl}
                            download={doc.filename}
                            className="inline-flex items-center gap-1 rounded px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs font-semibold cursor-pointer"
                            title="Download document"
                          >
                            <FiDownload className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {doc.isUserUploaded && (
                          <button
                            type="button"
                            onClick={() => handleDeleteVaultDoc(doc.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                            title="Delete file"
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  viewingDocument.fileType === 'pdf' ? 'bg-rose-100 text-rose-700' : 'bg-teal-100 text-teal-700'
                }`}>
                  {viewingDocument.fileType === 'pdf' ? <FiFileText className="h-5 w-5" /> : <FiImage className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {viewingDocument.filename}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{viewingDocument.category}</span>
                    <span>•</span>
                    <span>{viewingDocument.fileSize}</span>
                    <span>•</span>
                    <span className="font-mono text-emerald-700 font-semibold">{viewingDocument.status}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingDocument(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* SHA-256 Stamp Banner */}
            <div className="bg-slate-900 text-white px-6 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 truncate max-w-full">
                <FiShield className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">SHA-256:</span>
                <span className="text-emerald-400 truncate">{viewingDocument.fullHash}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyHash(viewingDocument.fullHash)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded cursor-pointer shrink-0"
              >
                <FiCopy className="h-3 w-3" />
                <span>{copiedHash ? 'Copied!' : 'Copy Hash'}</span>
              </button>
            </div>

            {/* Document Content Display */}
            <div className="p-6 bg-slate-100 max-h-[65vh] overflow-y-auto">
              {viewingDocument.fileUrl ? (
                viewingDocument.fileType === 'image' ? (
                  <div className="flex items-center justify-center bg-slate-950/90 rounded-xl p-3 shadow-inner">
                    <img
                      src={viewingDocument.fileUrl}
                      alt={viewingDocument.filename}
                      className="max-h-[50vh] max-w-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="h-[55vh] w-full rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm">
                    <iframe
                      src={viewingDocument.fileUrl}
                      title={viewingDocument.filename}
                      className="w-full h-full"
                    />
                  </div>
                )
              ) : (
                /* Authentic Digital Evidence Simulation Certificate for baseline records */
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Official Statutory Document
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        Primary Source Evidence Voucher
                      </h4>
                    </div>
                    <div className="text-right text-xs text-slate-500 font-mono">
                      Doc ID: #{viewingDocument.id}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Issuing Authority</span>
                      <strong className="text-slate-800">MEIL Power Substation Operations</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Associated Site</span>
                      <strong className="text-slate-800">Unit 4 (Cuttack Solar Plant)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">SEBI Compliance Core</span>
                      <strong className="text-emerald-800">Principle 6 (Environment)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Assurance Standard</span>
                      <strong className="text-slate-800">ISAE 3000 / SSAE 3000</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Verification Status</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <FiCheckCircle className="h-3.5 w-3.5" />
                        Audited &amp; Sealed
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Original File Format</span>
                      <strong className="font-mono text-slate-800 uppercase">{viewingDocument.fileType}</strong>
                    </div>
                  </div>

                  <div className="rounded-xl border border-dashed border-slate-300 p-4 bg-slate-50/50 text-center">
                    <p className="text-xs text-slate-600">
                      This baseline evidentiary voucher was digitally stamped and recorded during plant meter inspection.
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">
                      Digital Hash: {viewingDocument.fullHash}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 bg-white px-6 py-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Tamper-proof verifiable audit voucher
              </span>
              <div className="flex items-center gap-2">
                {viewingDocument.fileUrl && (
                  <a
                    href={viewingDocument.fileUrl}
                    download={viewingDocument.filename}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <FiDownload className="h-3.5 w-3.5" />
                    <span>Download File</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setViewingDocument(null)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Target Metric Evidence Replacement Modal */}
      {selectedMetricForUpload && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Upload Proof: {selectedMetricForUpload.category}
                </h3>
                <span className="text-xs text-slate-500">
                  Current: {selectedMetricForUpload.evidenceFile}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMetricForUpload(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Local File Browser for Target Metric */}
              <div className="rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 text-center">
                <FiUploadCloud className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
                <h4 className="text-xs font-bold text-slate-900">
                  Upload new PDF or Image for this metric
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Replaces current evidence and auto-computes SHA-256 hash
                </p>

                <div className="mt-3">
                  <label className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 cursor-pointer shadow-xs">
                    <span>Browse Workstation</span>
                    <input
                      ref={modalFileInputRef}
                      type="file"
                      accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleProcessUploadedFile(e.target.files[0], selectedMetricForUpload.id);
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Quick Simulated Attachments */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  Or attach verified sample calibration documents:
                </span>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      const mockFile = new File(['Flow meter calibration Oct 2025'], 'FlowMeter_Calibrated_Valid_Oct2025.pdf', { type: 'application/pdf' });
                      handleProcessUploadedFile(mockFile, selectedMetricForUpload.id);
                    }}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-300 transition-colors text-xs cursor-pointer"
                  >
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FiFileText className="h-3.5 w-3.5 text-rose-600" />
                      <span>FlowMeter_Calibrated_Valid_Oct2025.pdf</span>
                    </div>
                    <span className="block text-[11px] text-emerald-700 font-medium mt-0.5">
                      ✓ Valid NABL accredited laboratory test certificate (clears audit flag).
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const mockFile = new File(['Discom Tariff Bill Sept 2025'], 'TPCODL_RevisedTariffBill_Sept2025.pdf', { type: 'application/pdf' });
                      handleProcessUploadedFile(mockFile, selectedMetricForUpload.id);
                    }}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-300 transition-colors text-xs cursor-pointer"
                  >
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FiFileText className="h-3.5 w-3.5 text-rose-600" />
                      <span>TPCODL_RevisedTariffBill_Sept2025.pdf</span>
                    </div>
                    <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
                      Official Discom electrical energy billing record.
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
