import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  Home, 
  Briefcase, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  X,
  ShieldCheck,
  Sparkles,
  MapPin,
  IdCard,
  CreditCard,
  Building,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OnboardingScreen({ userInitialData, onCompleteOnboarding }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Category Selection (2A), 2: Dynamic KYC Upload (2B)

  // 2A: Hirer Type State
  const [hirerType, setHirerType] = useState('hotel'); // 'hotel' | 'school' | 'hospital' | 'corporate' | 'household'

  // Profile Details State
  const [entityName, setEntityName] = useState(userInitialData?.companyName || 'Grand Horizon Hospitality');
  const [locationAddress, setLocationAddress] = useState('Sector 29, Cyber Hub, Gurugram');
  const [contactPerson, setContactPerson] = useState('Rajesh Verma');

  // 2B: Dynamic Uploads State
  // Household files:
  const [householdIdFile, setHouseholdIdFile] = useState({
    name: 'Aadhaar_Card_Front_Back.pdf',
    size: '1.2 MB',
    ready: true
  });

  // Hotel / Corporate / Hospital files:
  const [gstFile, setGstFile] = useState({
    name: 'GST_Registration_Certificate_2026.pdf',
    size: '1.4 MB',
    ready: true
  });
  const [panFile, setPanFile] = useState({
    name: 'Company_PAN_Card.pdf',
    size: '850 KB',
    ready: true
  });

  // School / College files:
  const [affiliationFile, setAffiliationFile] = useState({
    name: 'Institution_Affiliation_Certificate_CBSE.pdf',
    size: '2.1 MB',
    ready: true
  });
  const [signatoryFile, setSignatoryFile] = useState({
    name: 'Trust_Deed_Signatory_ID.pdf',
    size: '950 KB',
    ready: true
  });

  const [isDragging, setIsDragging] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hirer Category Configurations
  const hirerCategories = [
    {
      id: 'hotel',
      title: 'Hotel/Restaurant',
      subtitle: 'Housekeeping, Banquet Chefs, Stewards',
      icon: Building2,
      isCorporate: true,
      defaultName: 'Grand Horizon Hotel & Banquets',
      nameLabel: 'Establishment / Hotel Name',
      addressLabel: 'Facility / Property Address',
      contactLabel: 'General Manager / HR Contact'
    },
    {
      id: 'school',
      title: 'School/College',
      subtitle: 'Campus Security, Sweepers, Bus Drivers',
      icon: GraduationCap,
      isSchool: true,
      defaultName: 'City Heights International Academy',
      nameLabel: 'Institution / Trust Name',
      addressLabel: 'Campus Campus Address',
      contactLabel: 'Principal / Admin In-Charge'
    },
    {
      id: 'hospital',
      title: 'Hospital',
      subtitle: 'Ward Staff, House Nurses, Sanitizers',
      icon: HeartPulse,
      isCorporate: true,
      defaultName: 'Apex Multi-Specialty Hospital',
      nameLabel: 'Hospital / Clinic Name',
      addressLabel: 'Hospital Complex Address',
      contactLabel: 'Medical Superintendent / Admin'
    },
    {
      id: 'corporate',
      title: 'Corporate Office',
      subtitle: 'Pantry Staff, Electricians, Maintenance',
      icon: Briefcase,
      isCorporate: true,
      defaultName: 'Apex Technology Park Towers',
      nameLabel: 'Company / Corporate Office Name',
      addressLabel: 'Registered Office Address',
      contactLabel: 'Facility / Procurement Lead'
    },
    {
      id: 'household',
      title: 'Household',
      subtitle: 'Maids, Babysitters, Gardeners, Drivers',
      icon: Home,
      isHousehold: true,
      defaultName: 'Sharma Residence / Villa',
      nameLabel: 'Household Head / Hirer Full Name',
      addressLabel: 'Residential Address / Villa No.',
      contactLabel: 'Primary Contact Mobile / Name'
    }
  ];

  const currentCategory = hirerCategories.find(c => c.id === hirerType) || hirerCategories[0];

  const handleSelectCategory = (cat) => {
    setHirerType(cat.id);
    if (!entityName || entityName === 'Grand Horizon Hospitality' || entityName.includes('Hotel') || entityName.includes('Academy') || entityName.includes('Residence')) {
      setEntityName(cat.defaultName);
    }
  };

  const handleFileUpload = (setter, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setter({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        ready: true
      });
    }
  };

  const handleFinish = () => {
    setIsSubmitting(true);
    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      setIsSubmitting(false);
      onCompleteOnboarding({
        businessName: entityName,
        businessType: currentCategory.title,
        cityLocation: locationAddress,
        contactName: contactPerson,
        hirerType: hirerType
      });
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50/70 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#0B3C5D] selection:text-white">
      
      {/* Top Navbar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center font-black text-sm shadow-glow-sm">
            D
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900">
            Demand O <span className="text-[#0B3C5D]">Hire</span>
          </span>
        </div>

        <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <span>Profile Onboarding</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-mono text-[11px]">
            {currentStep === 1 ? 'Step 2A: Hirer Category' : 'Step 2B: Dynamic KYC'}
          </span>
        </div>
      </div>

      {/* Main Stepped Card Container */}
      <div className="max-w-3xl w-full mx-auto my-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-black/80 shadow-card p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Subtle top indicator glow bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
            <motion.div 
              className="h-full bg-[#0B3C5D]"
              initial={{ width: '50%' }}
              animate={{ width: currentStep === 1 ? '50%' : '100%' }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* Header with Sleek Progress Bar */}
          <div className="mb-8 pt-2">
            <div className="flex items-center justify-between max-w-sm mx-auto text-xs font-semibold">
              <div className="flex items-center gap-2 text-[#0B3C5D]">
                <div className="w-6 h-6 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center text-[11px] font-bold shadow-glow-sm">
                  1
                </div>
                <span>Category (2A)</span>
              </div>

              <div className="h-0.5 w-16 bg-slate-200 relative overflow-hidden">
                <div 
                  className={`h-full bg-[#0B3C5D] transition-all duration-300 ${
                    currentStep === 2 ? 'w-full' : 'w-0'
                  }`} 
                />
              </div>

              <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-[#0B3C5D]' : 'text-slate-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  currentStep === 2 ? 'bg-[#0B3C5D] text-white shadow-glow-sm' : 'bg-slate-100 text-slate-500'
                }`}>
                  2
                </div>
                <span>Dynamic KYC (2B)</span>
              </div>
            </div>
          </div>

          {/* ================= STEP 2A: CATEGORY SELECTION ================= */}
          {currentStep === 1 && (
            <motion.div
              key="step-2a"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Header: "Let's set up your profile." */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Let's set up your profile.
                </h1>
                <p className="text-sm text-slate-500">
                  Select your hirer category. Our AI matching rules and verification requirements adapt to your organization type.
                </p>
              </div>

              {/* Card-based selection for Hirer Type: "Hotel/Restaurant", "School/College", "Hospital", "Corporate Office", "Household" */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2.5">
                  Step 2A: Select Your Hirer Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hirerCategories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = hirerType === cat.id;
                    return (
                      <motion.div
                        key={cat.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectCategory(cat)}
                        className={`cursor-pointer p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-black bg-[#0B3C5D] text-white shadow-glow-sm'
                            : 'border-black/70 bg-white hover:bg-slate-50 text-slate-900'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2.5 rounded-xl border ${
                              isSelected ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-black/10 text-[#0B3C5D]'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#00D26A] text-slate-950 flex items-center justify-center text-xs font-black shadow-sm">
                                ✓
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-sm tracking-tight mb-1">
                            {cat.title}
                          </h3>
                          <p className={`text-xs leading-relaxed ${
                            isSelected ? 'text-blue-100/80' : 'text-slate-500'
                          }`}>
                            {cat.subtitle}
                          </p>
                        </div>

                        <div className={`mt-3 pt-2 text-[10px] font-semibold border-t ${
                          isSelected ? 'border-white/15 text-blue-200' : 'border-slate-100 text-slate-400'
                        }`}>
                          {cat.isHousehold ? 'B2C Personal Hirer' : 'B2B Enterprise Portal'}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Entity Info Fields that adapt to the category */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {currentCategory.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    placeholder={`e.g. ${currentCategory.defaultName}`}
                    className="ai-input w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {currentCategory.addressLabel}
                  </label>
                  <input
                    type="text"
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    placeholder="e.g. Sector 29, Cyber City Hub"
                    className="ai-input w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Footer Proceed Button */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="text-xs text-slate-500 font-medium">
                  Selected: <strong className="text-slate-900">{currentCategory.title}</strong>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0B3C5D] hover:bg-[#082d46] text-white font-bold text-sm border border-black shadow-glow transition-all"
                >
                  <span>Continue to KYC Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2B: DYNAMIC KYC UPLOAD ================= */}
          {currentStep === 2 && (
            <motion.div
              key="step-2b"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0B3C5D] text-xs font-bold border border-blue-200 mb-1">
                  <span>Category: {currentCategory.title}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Step 2B: Upload Required KYC Verification
                </h1>
                <p className="text-sm text-slate-500">
                  {hirerType === 'household'
                    ? 'Individual hirer verification to ensure secure home dispatches.'
                    : hirerType === 'school'
                      ? 'Educational institution accreditation proof for compliant campus staff deployment.'
                      : 'Commercial entity registration proof for escrow wage disbursement & GST invoicing.'}
                </p>
              </div>

              {/* ================= DYNAMIC CASE 1: HOUSEHOLD ================= */}
              {/* If "Household" is selected: Show an upload zone for "Personal ID (Aadhar / Voter ID / Passport)" */}
              {hirerType === 'household' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <IdCard className="w-4 h-4 text-[#0B3C5D]" />
                        <span>Personal ID (Aadhar / Voter ID / Passport)</span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Government ID Required
                      </span>
                    </label>

                    {/* Drag-and-Drop Area with Dashed Black Border */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging('household'); }}
                      onDragLeave={() => setIsDragging(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(null);
                        const file = e.dataTransfer.files?.[0];
                        if (file) setHouseholdIdFile({ name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, ready: true });
                      }}
                      className={`relative rounded-2xl border-2 border-dashed p-8 text-center flex flex-col items-center justify-center transition-all ${
                        isDragging === 'household'
                          ? 'border-[#0B3C5D] bg-blue-50/50'
                          : 'border-black/80 bg-slate-50/60 hover:bg-slate-50 hover:border-black'
                      }`}
                    >
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(setHouseholdIdFile, e)}
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-12 h-12 rounded-2xl bg-white border border-black/80 flex items-center justify-center text-[#0B3C5D] mb-3 shadow-subtle">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        Drop your <span className="text-[#0B3C5D]">Aadhar / Voter ID / Passport</span> here, or browse files
                      </h4>
                      <p className="text-xs text-slate-500">
                        Front & Back scans supported (PDF, JPG, PNG up to 10MB). Encrypted with UIDAI-grade security.
                      </p>
                    </div>
                  </div>

                  {/* Uploaded File Confirmation */}
                  {householdIdFile && (
                    <div className="p-3.5 rounded-xl border border-black/70 bg-white flex items-center justify-between shadow-subtle">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <span>{householdIdFile.name}</span>
                            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded text-[10px] font-mono font-bold">
                              ID READY
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500">{householdIdFile.size} • Verified Personal Identity</div>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </motion.div>
              )}

              {/* ================= DYNAMIC CASE 2: HOTEL / CORPORATE / HOSPITAL ================= */}
              {/* If "Hotel/Corporate/Hospital" is selected: Show upload zones for "GST Certificate" and "Company PAN" */}
              {(hirerType === 'hotel' || hirerType === 'corporate' || hirerType === 'hospital') && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Zone 1: GST Certificate */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#0B3C5D]" />
                          <span>GST Certificate</span>
                        </span>
                        <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          Mandatory
                        </span>
                      </label>

                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging('gst'); }}
                        onDragLeave={() => setIsDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(null);
                          const file = e.dataTransfer.files?.[0];
                          if (file) setGstFile({ name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, ready: true });
                        }}
                        className={`relative rounded-2xl border-2 border-dashed p-6 text-center flex flex-col items-center justify-center transition-all ${
                          isDragging === 'gst'
                            ? 'border-[#0B3C5D] bg-blue-50/50'
                            : 'border-black/80 bg-slate-50/60 hover:bg-slate-50 hover:border-black'
                        }`}
                      >
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(setGstFile, e)}
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-10 h-10 rounded-xl bg-white border border-black/80 flex items-center justify-center text-[#0B3C5D] mb-2 shadow-subtle">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                          Upload <span className="text-[#0B3C5D]">GST Certificate</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">PDF, JPG up to 10MB</p>
                      </div>

                      {gstFile && (
                        <div className="mt-2 p-2.5 rounded-xl border border-black/70 bg-white flex items-center justify-between text-xs">
                          <div className="truncate mr-2">
                            <span className="font-bold text-slate-900 truncate block">{gstFile.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{gstFile.size}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        </div>
                      )}
                    </div>

                    {/* Zone 2: Company PAN */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-[#0B3C5D]" />
                          <span>Company PAN</span>
                        </span>
                        <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          Mandatory
                        </span>
                      </label>

                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging('pan'); }}
                        onDragLeave={() => setIsDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(null);
                          const file = e.dataTransfer.files?.[0];
                          if (file) setPanFile({ name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, ready: true });
                        }}
                        className={`relative rounded-2xl border-2 border-dashed p-6 text-center flex flex-col items-center justify-center transition-all ${
                          isDragging === 'pan'
                            ? 'border-[#0B3C5D] bg-blue-50/50'
                            : 'border-black/80 bg-slate-50/60 hover:bg-slate-50 hover:border-black'
                        }`}
                      >
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(setPanFile, e)}
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-10 h-10 rounded-xl bg-white border border-black/80 flex items-center justify-center text-[#0B3C5D] mb-2 shadow-subtle">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                          Upload <span className="text-[#0B3C5D]">Company PAN</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">PDF, JPG up to 10MB</p>
                      </div>

                      {panFile && (
                        <div className="mt-2 p-2.5 rounded-xl border border-black/70 bg-white flex items-center justify-between text-xs">
                          <div className="truncate mr-2">
                            <span className="font-bold text-slate-900 truncate block">{panFile.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{panFile.size}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* ================= DYNAMIC CASE 3: SCHOOL / COLLEGE ================= */}
              {/* If "School/College" is selected: Show upload zones for "Institution Registration / Affiliation Certificate" */}
              {hirerType === 'school' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Zone 1: Institution Registration / Affiliation Certificate */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#0B3C5D]" />
                          <span>Institution Registration / Affiliation</span>
                        </span>
                        <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                          Education Board
                        </span>
                      </label>

                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging('aff'); }}
                        onDragLeave={() => setIsDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(null);
                          const file = e.dataTransfer.files?.[0];
                          if (file) setAffiliationFile({ name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, ready: true });
                        }}
                        className={`relative rounded-2xl border-2 border-dashed p-6 text-center flex flex-col items-center justify-center transition-all ${
                          isDragging === 'aff'
                            ? 'border-[#0B3C5D] bg-blue-50/50'
                            : 'border-black/80 bg-slate-50/60 hover:bg-slate-50 hover:border-black'
                        }`}
                      >
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(setAffiliationFile, e)}
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-10 h-10 rounded-xl bg-white border border-black/80 flex items-center justify-center text-[#0B3C5D] mb-2 shadow-subtle">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                          Upload <span className="text-[#0B3C5D]">Affiliation Certificate</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">UGC / CBSE / AICTE proof</p>
                      </div>

                      {affiliationFile && (
                        <div className="mt-2 p-2.5 rounded-xl border border-black/70 bg-white flex items-center justify-between text-xs">
                          <div className="truncate mr-2">
                            <span className="font-bold text-slate-900 truncate block">{affiliationFile.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{affiliationFile.size}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        </div>
                      )}
                    </div>

                    {/* Zone 2: Signatory / Trust Deed ID */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#0B3C5D]" />
                          <span>Authorized Signatory ID</span>
                        </span>
                        <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                          Trustee / Principal
                        </span>
                      </label>

                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging('sig'); }}
                        onDragLeave={() => setIsDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(null);
                          const file = e.dataTransfer.files?.[0];
                          if (file) setSignatoryFile({ name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, ready: true });
                        }}
                        className={`relative rounded-2xl border-2 border-dashed p-6 text-center flex flex-col items-center justify-center transition-all ${
                          isDragging === 'sig'
                            ? 'border-[#0B3C5D] bg-blue-50/50'
                            : 'border-black/80 bg-slate-50/60 hover:bg-slate-50 hover:border-black'
                        }`}
                      >
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(setSignatoryFile, e)}
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-10 h-10 rounded-xl bg-white border border-black/80 flex items-center justify-center text-[#0B3C5D] mb-2 shadow-subtle">
                          <IdCard className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                          Upload <span className="text-[#0B3C5D]">Signatory ID</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">Government ID of Trustee</p>
                      </div>

                      {signatoryFile && (
                        <div className="mt-2 p-2.5 rounded-xl border border-black/70 bg-white flex items-center justify-between text-xs">
                          <div className="truncate mr-2">
                            <span className="font-bold text-slate-900 truncate block">{signatoryFile.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{signatoryFile.size}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* Zero Commission Banner */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0B3C5D] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Zero Commission Trial Guaranteed:</strong> Upon completing this verification, your hirer account gets <strong>30 days of 0% platform fee</strong>. All worker wages go directly to worker UPI/escrow.
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-black py-2.5 px-4 rounded-xl border border-black/50 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Category</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinish}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0B3C5D] hover:bg-[#082d46] text-white font-bold text-sm border border-black shadow-glow transition-all"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Complete Setup & Enter Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="max-w-4xl w-full mx-auto text-center pt-6 text-[11px] text-slate-400 font-mono">
        Demand O • Unified Blue-Collar & Service Job Marketplace
      </div>

    </div>
  );
}
