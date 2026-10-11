import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Zap, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/mockData';
import ServiceIcon from './ServiceIcon';
import confetti from 'canvas-confetti';

export default function PostJobModal({ isOpen, onClose, onSubmitJob, currentEmployer }) {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState('security-guards');
  const [connectionType, setConnectionType] = useState('Instant Help'); // 'Instant Help' | 'Contract-based' | 'Part-time'
  const [jobTitle, setJobTitle] = useState('Need 2 Guards for Night Shift - Urgent');
  const [headcount, setHeadcount] = useState(2);
  const [location, setLocation] = useState(currentEmployer?.location || 'Sector 29, Cyber City Hub');
  const [timing, setTiming] = useState('Today, 8:00 PM - 8:00 AM (12h Shift)');
  const [payRate, setPayRate] = useState('850');
  const [payUnit, setPayUnit] = useState('per shift');
  const [notes, setNotes] = useState('PSARA or Ex-serviceman badge mandatory. Uniforms provided at reception.');
  const [urgency, setUrgency] = useState('high');

  if (!isOpen) return null;

  const handleServiceSelect = (service) => {
    setSelectedService(service.id);
    // dynamically suggest title
    if (connectionType === 'Instant Help') {
      setJobTitle(`Need ${headcount} ${service.name} - Urgent Dispatch`);
    } else {
      setJobTitle(`Qualified ${service.name} (${connectionType})`);
    }
  };

  const handleConnectionTypeChange = (type) => {
    setConnectionType(type);
    const serviceObj = SERVICE_CATEGORIES.find(s => s.id === selectedService);
    const serviceName = serviceObj ? serviceObj.name : 'Workers';

    if (type === 'Instant Help') {
      setUrgency('high');
      setJobTitle(`Urgent Need: ${headcount} ${serviceName} (Immediate Dispatch)`);
      setPayUnit('per shift');
    } else if (type === 'Contract-based') {
      setUrgency('medium');
      setJobTitle(`Monthly Contract: ${serviceName} Crew`);
      setPayUnit('per month');
      setPayRate('16500');
    } else {
      setUrgency('low');
      setJobTitle(`Part-time / Weekend: ${serviceName}`);
      setPayUnit('per visit/day');
      setPayRate('750');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceObj = SERVICE_CATEGORIES.find(s => s.id === selectedService);

    const newJob = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: jobTitle,
      category: serviceObj ? serviceObj.name : 'General Service',
      serviceId: selectedService,
      type: connectionType,
      headcount: Number(headcount),
      employer: currentEmployer?.name || 'Sunrise Grand Hotel',
      timing: timing,
      pay: `₹${payRate} ${payUnit}`,
      location: location,
      status: 'Pending',
      createdAt: 'Just now',
      applicants: 2,
      urgency: urgency,
      notes: notes,
    };

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }

    onSubmitJob(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border-brutal-2 rounded-xl shadow-brutal-lg my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#0A2342] text-white p-5 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-[#0A2342] rounded-lg border border-black flex items-center justify-center font-black">
              ⚡
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                <span>Post a Job Requirement</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#00D26A] text-slate-950 font-bold rounded">
                  0% COMMISSION
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Direct dispatch for {currentEmployer?.name || 'Enterprise'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-slate-100 border-b-2 border-black px-6 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div 
                className={`w-7 h-7 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs ${
                  step >= 1 ? 'bg-[#0A2342] text-white shadow-brutal-sm' : 'bg-white text-slate-400'
                }`}
              >
                1
              </div>
              <span className={`text-xs font-bold ${step === 1 ? 'text-[#0A2342]' : 'text-slate-500'}`}>
                Select Service
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 border-t-2 border-dashed ${step >= 2 ? 'border-black' : 'border-slate-300'}`} />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div 
                className={`w-7 h-7 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs ${
                  step >= 2 ? 'bg-[#0A2342] text-white shadow-brutal-sm' : 'bg-white text-slate-400'
                }`}
              >
                2
              </div>
              <span className={`text-xs font-bold ${step === 2 ? 'text-[#0A2342]' : 'text-slate-500'}`}>
                Connection Type
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 border-t-2 border-dashed ${step >= 3 ? 'border-black' : 'border-slate-300'}`} />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div 
                className={`w-7 h-7 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs ${
                  step === 3 ? 'bg-[#0A2342] text-white shadow-brutal-sm' : 'bg-white text-slate-400'
                }`}
              >
                3
              </div>
              <span className={`text-xs font-bold ${step === 3 ? 'text-[#0A2342]' : 'text-slate-500'}`}>
                Location & Pay
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[68vh] overflow-y-auto">
          
          {/* ================= STEP 1: SELECT SERVICE ================= */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Step 1: Choose Blue-Collar or Service Category
                </h3>
                <p className="text-xs text-slate-600">
                  Select the trade or skill required for your facility or household.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SERVICE_CATEGORIES.map((service) => {
                  const isSelected = selectedService === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service)}
                      className={`p-3 rounded-lg text-left transition-all border-brutal flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-[#0A2342] text-white shadow-brutal translate-x-0.5 translate-y-0.5' 
                          : 'bg-white hover:bg-slate-50 text-slate-900 shadow-brutal-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-1.5 rounded border border-black ${isSelected ? 'bg-white text-[#0A2342]' : 'bg-slate-100'}`}>
                          <ServiceIcon name={service.icon} className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#00D26A] text-slate-950 flex items-center justify-center text-xs font-black">
                            ✓
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="font-bold text-xs leading-tight mb-1">{service.name}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {service.workersAvailableNearby} nearby
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-emerald-50 border-brutal rounded-lg flex items-center gap-3 text-xs text-emerald-900 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  All listed workers have verified Aadhaar, police records check, and past B2B reliability scores.
                </span>
              </div>
            </div>
          )}

          {/* ================= STEP 2: CONNECTION TYPE ================= */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Step 2: Connection Type & Engagement Model
                </h3>
                <p className="text-xs text-slate-600">
                  Choose how rapidly you need personnel deployed to your site.
                </p>
              </div>

              {/* Three Connection Type Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                
                {/* Instant Help */}
                <div
                  onClick={() => handleConnectionTypeChange('Instant Help')}
                  className={`cursor-pointer p-4 rounded-xl border-brutal transition-all relative ${
                    connectionType === 'Instant Help'
                      ? 'bg-[#0A2342] text-white shadow-brutal'
                      : 'bg-white hover:bg-slate-50 text-slate-900 shadow-brutal-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded bg-amber-400 text-slate-950 border border-black font-bold">
                      <Zap className="w-5 h-5" />
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-rose-500 text-white rounded uppercase">
                      15-30 Min
                    </span>
                  </div>
                  <h4 className="font-black text-base mb-1">Instant Help</h4>
                  <p className={`text-xs ${connectionType === 'Instant Help' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Immediate dispatch for sudden walkouts, night coverage, or banquet rushes.
                  </p>
                  <div className="mt-3 text-[11px] font-semibold text-emerald-400">
                    ⚡ Priority Radar Matching
                  </div>
                </div>

                {/* Contract-Based */}
                <div
                  onClick={() => handleConnectionTypeChange('Contract-based')}
                  className={`cursor-pointer p-4 rounded-xl border-brutal transition-all relative ${
                    connectionType === 'Contract-based'
                      ? 'bg-[#0A2342] text-white shadow-brutal'
                      : 'bg-white hover:bg-slate-50 text-slate-900 shadow-brutal-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded bg-blue-100 text-[#0A2342] border border-black font-bold">
                      <Calendar className="w-5 h-5" />
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-600 text-white rounded uppercase">
                      Long-Term
                    </span>
                  </div>
                  <h4 className="font-black text-base mb-1">Contract-based</h4>
                  <p className={`text-xs ${connectionType === 'Contract-based' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Permanent or monthly staff (1, 3, 6, 12 months) with escrow biometric logs.
                  </p>
                  <div className="mt-3 text-[11px] font-semibold text-emerald-400">
                    📋 Zero Commission Escrow
                  </div>
                </div>

                {/* Part-Time */}
                <div
                  onClick={() => handleConnectionTypeChange('Part-time')}
                  className={`cursor-pointer p-4 rounded-xl border-brutal transition-all relative ${
                    connectionType === 'Part-time'
                      ? 'bg-[#0A2342] text-white shadow-brutal'
                      : 'bg-white hover:bg-slate-50 text-slate-900 shadow-brutal-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded bg-purple-100 text-purple-900 border border-black font-bold">
                      <Clock className="w-5 h-5" />
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-600 text-white rounded uppercase">
                      Flexible
                    </span>
                  </div>
                  <h4 className="font-black text-base mb-1">Part-time</h4>
                  <p className={`text-xs ${connectionType === 'Part-time' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Weekend shifts, half-days, or specific recurring roster schedules.
                  </p>
                  <div className="mt-3 text-[11px] font-semibold text-emerald-400">
                    ⏱️ Flexible Hour Slates
                  </div>
                </div>

              </div>

              {/* Requirement Title Field */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Posting Title / Requirement Summary
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border-brutal rounded focus:ring-2 focus:ring-[#0A2342] font-semibold text-slate-900 shadow-brutal-sm"
                  placeholder="e.g., Need 2 Guards for Night Shift - Urgent"
                />
              </div>

              {/* Headcount */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Headcount Needed (Number of Workers)
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHeadcount(num)}
                      className={`px-4 py-1.5 rounded font-bold text-xs border-brutal transition-all ${
                        headcount === num
                          ? 'bg-[#0A2342] text-white shadow-brutal-sm'
                          : 'bg-white hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      {num} {num === 1 ? 'Worker' : 'Workers'}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 3: LOCATION & PAY ================= */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Step 3: Location, Timing & Compensation
                </h3>
                <p className="text-xs text-slate-600">
                  Set clear compensation and reporting details for instant matching.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-600" />
                    Reporting Location / Site Address
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border-brutal rounded font-medium shadow-brutal-sm focus:ring-2 focus:ring-[#0A2342]"
                    placeholder="e.g. Sector 29, Cyber City Hub, Gate 2"
                  />
                </div>

                {/* Shift / Timing */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    Shift Timings & Duration
                  </label>
                  <input
                    type="text"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border-brutal rounded font-medium shadow-brutal-sm focus:ring-2 focus:ring-[#0A2342]"
                    placeholder="e.g. 8:00 PM - 8:00 AM (Night Shift)"
                  />
                </div>

                {/* Pay Rate */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-600" />
                    Offered Pay (INR ₹)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 bg-slate-100 border-brutal rounded font-bold text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={payRate}
                      onChange={(e) => setPayRate(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border-brutal rounded font-bold shadow-brutal-sm focus:ring-2 focus:ring-[#0A2342]"
                    />
                    <select
                      value={payUnit}
                      onChange={(e) => setPayUnit(e.target.value)}
                      className="px-2.5 py-2 text-xs bg-white border-brutal rounded font-bold shadow-brutal-sm"
                    >
                      <option value="per shift">per shift</option>
                      <option value="per month">per month</option>
                      <option value="per day">per day</option>
                      <option value="per hour">per hour</option>
                    </select>
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-600" />
                    Dispatch Urgency Level
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'high', label: 'Urgent (15-30m)', color: 'bg-rose-100 text-rose-900 border-rose-500' },
                      { id: 'medium', label: 'Standard (Today)', color: 'bg-amber-100 text-amber-900 border-amber-500' },
                      { id: 'low', label: 'Scheduled (Future)', color: 'bg-blue-100 text-blue-900 border-blue-500' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setUrgency(lvl.id)}
                        className={`flex-1 py-2 text-xs font-bold rounded border-brutal transition-all ${
                          urgency === lvl.id
                            ? 'bg-[#0A2342] text-white shadow-brutal-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Specific Requirements / Uniform Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Must carry PSARA ID card, black shoes. Lunch provided on campus."
                  className="w-full px-3 py-2 text-xs bg-white border-brutal rounded font-medium shadow-brutal-sm focus:ring-2 focus:ring-[#0A2342]"
                />
              </div>

              {/* Summary card */}
              <div className="p-3.5 bg-slate-50 border-brutal rounded-lg space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Selected Service:</span>
                  <span className="text-[#0B3C5D] uppercase">{selectedService.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Connection Model:</span>
                  <span className="font-semibold">{connectionType} ({headcount} Personnel)</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Offered Payout:</span>
                  <span className="font-bold text-emerald-700">₹{payRate} {payUnit} (100% Direct Payout)</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200">
                  <span>Platform Fee (First 30 Days):</span>
                  <span className="font-mono text-emerald-600 font-bold">₹0.00 FREE</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t-2 border-black p-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-800 font-bold text-xs uppercase tracking-wider rounded border-brutal shadow-brutal-sm hover:bg-slate-100 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0A2342] hover:bg-[#07192f] text-white font-bold text-xs uppercase tracking-wider rounded border-brutal shadow-brutal-sm hover:shadow-brutal transition-all"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            /* SUBMIT BUTTON IN BRIGHT DEEP BLUE WITH BLACK BORDER AS REQUESTED */
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B3C5D] hover:bg-[#092d47] text-white font-black text-sm uppercase tracking-wider rounded border-brutal-2 shadow-brutal hover:shadow-brutal-lg transition-all"
            >
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Broadcast & Find Workers Now</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
