import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle, 
  Award, 
  Zap, 
  Calendar,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorkerDetailModal({ worker, isOpen, onClose, onHireSuccess, currentEmployer }) {
  const [hired, setHired] = useState(false);
  const [hireType, setHireType] = useState('Instant Shift'); // 'Instant Shift' | 'Monthly Contract'

  if (!isOpen || !worker) return null;

  const handleHire = () => {
    setHired(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      onHireSuccess(worker, hireType);
      setHired(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border-brutal-2 rounded-xl shadow-brutal-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header with Deep Blue banner */}
        <div className="bg-[#0A2342] text-white p-5 border-b-2 border-black flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-brutal-sm bg-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">{worker.name}</h3>
                <span className="p-0.5 bg-emerald-400 text-slate-950 rounded-full" title="Verified Worker">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{worker.role}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-300 font-mono">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-3 h-3 fill-amber-300" />
                  {worker.rating} ({worker.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {worker.distance}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-slate-900">
          
          {/* Quick status pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border-brutal rounded-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-slate-800">
                Ready for Dispatch in ~{worker.readyInMinutes || 20} mins
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 bg-white border border-black rounded font-bold">
                {worker.hourlyRate}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-500 text-emerald-900 rounded font-bold">
                {worker.monthlyRate}
              </span>
            </div>
          </div>

          {/* Verification Badges */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-2">
              Government & Identity Credentials
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {worker.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-white text-slate-900 border-brutal rounded shadow-brutal-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Bio & Experience */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-1">
              Professional Background
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
              {worker.bio}
            </p>
          </div>

          {/* Core Skills Checklist */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-2">
              Verified Skills & Tools Handled
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {worker.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-800 bg-slate-50 p-2 rounded border border-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0B3C5D] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* History with Current Employer */}
          <div className="p-3 bg-blue-50/70 border-brutal rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#0A2342]" />
              <div>
                <div className="text-xs font-black text-[#0A2342]">
                  Past Hires at {currentEmployer?.name || 'Your Facility'}
                </div>
                <div className="text-[11px] text-slate-600">
                  Completed {worker.pastHiresWithEmployer} shifts previously with 100% on-time check-in.
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-black px-2 py-1 bg-white border border-black rounded text-slate-900">
              TRUSTED
            </span>
          </div>

          {/* Direct Contact & Payout Note */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200">
            <span className="flex items-center gap-1 font-mono">
              <Phone className="w-3.5 h-3.5 text-slate-700" />
              Direct Phone: {worker.phone}
            </span>
            <span className="text-emerald-700 font-bold">
              0% Fee Applied
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t-2 border-black p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white text-slate-700 font-bold text-xs uppercase tracking-wider rounded border-brutal hover:bg-slate-100 shadow-brutal-sm"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <select
              value={hireType}
              onChange={(e) => setHireType(e.target.value)}
              className="px-2.5 py-2 text-xs font-bold bg-white border-brutal rounded shadow-brutal-sm"
            >
              <option value="Instant Shift">Instant Shift (12h)</option>
              <option value="Monthly Contract">Monthly Contract (0% Fee)</option>
            </select>

            <button
              type="button"
              disabled={hired}
              onClick={handleHire}
              className={`inline-flex items-center gap-2 px-5 py-2 font-black text-xs uppercase tracking-wider rounded border-brutal-2 shadow-brutal transition-all ${
                hired
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-[#0B3C5D] hover:bg-[#082b43] text-white hover:shadow-brutal-lg'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{hired ? 'Dispatched!' : '1-Click Hire Now'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
