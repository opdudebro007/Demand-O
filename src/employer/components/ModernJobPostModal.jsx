import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/mockData';
import ServiceIcon from './ServiceIcon';
import confetti from 'canvas-confetti';

export default function ModernJobPostModal({ 
  isOpen, 
  onClose, 
  businessProfile, 
  onJobCreated 
}) {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState('security-guards');
  const [connectionType, setConnectionType] = useState('Instant Help'); // 'Instant Help' | 'Contract-based' | 'Part-time'
  const [jobTitle, setJobTitle] = useState('Night Shift Security Guard - Urgent Gate Patrol');
  const [headcount, setHeadcount] = useState(2);
  const [location, setLocation] = useState(businessProfile?.cityLocation || 'Sector 29, Cyber City Hub');
  const [timing, setTiming] = useState('Tonight, 8:00 PM - 8:00 AM (12h Shift)');
  const [payRate, setPayRate] = useState('850');
  const [payUnit, setPayUnit] = useState('per shift');
  const [notes, setNotes] = useState('PSARA or Ex-military badge preferred. Must be punctual.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleServiceSelect = (service) => {
    setSelectedService(service.id);
    if (connectionType === 'Instant Help') {
      setJobTitle(`Need ${headcount} ${service.name} - Rapid Dispatch`);
    } else {
      setJobTitle(`${service.name} Requirement (${connectionType})`);
    }
  };

  const handleConnectionTypeChange = (type) => {
    setConnectionType(type);
    const serviceObj = SERVICE_CATEGORIES.find(s => s.id === selectedService);
    const serviceName = serviceObj ? serviceObj.name : 'Personnel';

    if (type === 'Instant Help') {
      setJobTitle(`Need ${headcount} ${serviceName} - Rapid Dispatch`);
      setPayUnit('per shift');
      setPayRate('850');
    } else if (type === 'Contract-based') {
      setJobTitle(`Monthly Contract: ${serviceName} Staff`);
      setPayUnit('per month');
      setPayRate('16500');
    } else {
      setJobTitle(`Part-time: ${serviceName}`);
      setPayUnit('per day');
      setPayRate('750');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      setIsSubmitting(false);
      const serviceObj = SERVICE_CATEGORIES.find(s => s.id === selectedService);
      onJobCreated({
        title: jobTitle,
        category: serviceObj?.name || 'Security Guards',
        type: connectionType,
        headcount,
        pay: `₹${payRate} ${payUnit}`,
        location,
        timing
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-black/80 shadow-glow-lg overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-[#0B3C5D] text-white p-5 border-b border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-[#0B3C5D] flex items-center justify-center font-black text-sm shadow-sm">
              +
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2">
                <span>Post Your First Job</span>
                <span className="px-2 py-0.5 rounded bg-[#00D26A] text-slate-950 font-black text-[10px] tracking-wider uppercase">
                  0% COMMISSION
                </span>
              </h2>
              <p className="text-xs text-blue-200">
                Direct broadcasting for {businessProfile?.businessName || 'Your Business'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-slate-50 border-b border-black/80 px-6 py-2.5">
          <div className="flex items-center justify-between max-w-sm mx-auto text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#0B3C5D] font-bold' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Service</span>
            </div>
            <div className="h-0.5 w-10 bg-slate-200" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#0B3C5D] font-bold' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 2 ? 'bg-[#0B3C5D] text-white' : 'bg-slate-200 text-slate-600'
              }`}>2</span>
              <span>Type</span>
            </div>
            <div className="h-0.5 w-10 bg-slate-200" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#0B3C5D] font-bold' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 3 ? 'bg-[#0B3C5D] text-white' : 'bg-slate-200 text-slate-600'
              }`}>3</span>
              <span>Details & Pay</span>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          
          {/* STEP 1: SERVICE CATEGORY */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Select the Trade or Role Needed
                </h3>
                <p className="text-xs text-slate-500">
                  Choose from our verified blue-collar network categories.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isSelected = selectedService === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleServiceSelect(cat)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0B3C5D] text-white border-black shadow-glow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-900 border-black/70'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-1.5 rounded-lg border ${
                          isSelected ? 'bg-white/15 border-white/20 text-white' : 'bg-slate-100 border-black/10 text-[#0B3C5D]'
                        }`}>
                          <ServiceIcon name={cat.icon} className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#00D26A] text-slate-950 flex items-center justify-center text-[10px] font-black">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs">{cat.name}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                          {cat.workersAvailableNearby} nearby
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CONNECTION TYPE */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Select Engagement Model
                </h3>
                <p className="text-xs text-slate-500">
                  How quickly do you need personnel at your facility?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'Instant Help',
                    title: 'Instant Help',
                    desc: 'Emergency 15-30m dispatch for sudden shortages',
                    badge: '15-30m ETA',
                    icon: Zap
                  },
                  {
                    id: 'Contract-based',
                    title: 'Contract-based',
                    desc: 'Monthly or seasonal staff with escrow biometric logs',
                    badge: 'Monthly',
                    icon: Calendar
                  },
                  {
                    id: 'Part-time',
                    title: 'Part-time',
                    desc: 'Flexible shifts, weekend coverage or hourly roster',
                    badge: 'Flexible',
                    icon: Clock
                  }
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = connectionType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => handleConnectionTypeChange(type.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#0B3C5D] text-white border-black shadow-glow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-900 border-black/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#0B3C5D]'}`} />
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {type.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs">{type.title}</h4>
                      <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        {type.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Headcount */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Headcount Needed
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHeadcount(num)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        headcount === num
                          ? 'bg-[#0B3C5D] text-white border-black shadow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-black/60'
                      }`}
                    >
                      {num} {num === 1 ? 'Worker' : 'Workers'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION & PAY */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Location & Compensation
                </h3>
                <p className="text-xs text-slate-500">
                  Set clear reporting site and compensation for instant candidate dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    Site Reporting Address
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="ai-input w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Shift Timings
                  </label>
                  <input
                    type="text"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    className="ai-input w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Offered Compensation (INR ₹)
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-slate-100 border border-black/80 rounded-xl font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={payRate}
                    onChange={(e) => setPayRate(e.target.value)}
                    className="ai-input w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white"
                  />
                  <select
                    value={payUnit}
                    onChange={(e) => setPayUnit(e.target.value)}
                    className="px-3 py-2 text-xs font-bold bg-white border border-black/80 rounded-xl"
                  >
                    <option value="per shift">per shift</option>
                    <option value="per month">per month</option>
                    <option value="per day">per day</option>
                    <option value="per hour">per hour</option>
                  </select>
                </div>
              </div>

              {/* Requirement Summary Box */}
              <div className="p-3 bg-slate-50 border border-black/80 rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Selected Category:</span>
                  <span className="text-[#0B3C5D]">{selectedService.replace('-', ' ').toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Model & Headcount:</span>
                  <span>{connectionType} • {headcount} Staff</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Fee (30-Day Zero Fee):</span>
                  <span className="font-bold text-emerald-700">₹0 (Free)</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t border-black/80 p-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border border-black/60 hover:bg-slate-100 transition-all"
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
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#082e47] text-white font-bold text-xs rounded-xl border border-black shadow-glow transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B3C5D] hover:bg-[#082e47] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border border-black shadow-glow-lg transition-all"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4 text-[#00D26A]" />
                  <span>Broadcast Job Now</span>
                </>
              )}
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}
