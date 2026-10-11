import React, { useState } from 'react';
import { X, CheckCircle2, Percent, TrendingUp, ShieldCheck, Zap, Sparkles, Building2 } from 'lucide-react';

export default function ZeroCommissionModal({ isOpen, onClose, currentEmployer }) {
  const [workerCount, setWorkerCount] = useState(15);
  const [avgWage, setAvgWage] = useState(15000);

  if (!isOpen) return null;

  // Monthly traditional agency markup: 22%
  const traditionalAgencyFee = Math.round(workerCount * avgWage * 0.22);
  const demandOFee = 0;
  const employerSavings = traditionalAgencyFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-brutal-2 rounded-xl shadow-brutal-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0A2342] text-white p-5 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00D26A] text-slate-950 font-black flex items-center justify-center text-xl border border-black shadow-brutal-sm">
              %
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">First 30 Days Zero Commission</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-400 text-slate-950 font-bold rounded">
                  GUARANTEE
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Transparent enterprise workforce hiring with 100% direct worker payout
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Hero Banner */}
          <div className="p-4 bg-emerald-50 border-brutal rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-950">
                Direct-to-Worker B2B Infrastructure
              </div>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                Save an estimated <span className="text-emerald-700 font-black">20% to 30%</span> compared to traditional labour contractors.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Active for: <strong className="text-slate-900">{currentEmployer?.name}</strong> • 16 days remaining in trial.
              </p>
            </div>
            <div className="px-3.5 py-2 bg-white border-brutal rounded-lg text-center shrink-0 shadow-brutal-sm">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Current Savings</span>
              <span className="text-lg font-black text-emerald-700">{currentEmployer?.savedWithZeroCommission || '₹42,800'}</span>
            </div>
          </div>

          {/* Interactive Savings Calculator */}
          <div className="border-brutal rounded-xl p-4 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#0B3C5D]" />
                Estimate Your Facility's 30-Day Savings
              </h4>
              <span className="text-[11px] font-mono text-slate-500">Live Simulator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Blue-Collar Headcount: <strong className="text-black font-black">{workerCount} staff</strong>
                </label>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={workerCount}
                  onChange={(e) => setWorkerCount(Number(e.target.value))}
                  className="w-full accent-[#0A2342] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Avg Monthly Wage: <strong className="text-black font-black">₹{avgWage.toLocaleString()}</strong>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="35000"
                  step="1000"
                  value={avgWage}
                  onChange={(e) => setAvgWage(Number(e.target.value))}
                  className="w-full accent-[#0A2342] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-white border border-slate-200 rounded">
                <div className="text-[10px] text-slate-500 font-semibold">Total Payout</div>
                <div className="text-xs font-bold text-slate-800">₹{(workerCount * avgWage).toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-800">
                <div className="text-[10px] font-semibold">Standard Agency Cut</div>
                <div className="text-xs font-bold line-through">₹{traditionalAgencyFee.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded text-emerald-950 shadow-sm">
                <div className="text-[10px] font-bold uppercase">Demand O Cost</div>
                <div className="text-xs font-black text-emerald-800">₹0 (SAVED ₹{employerSavings.toLocaleString()})</div>
              </div>
            </div>
          </div>

          {/* Key Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white border-brutal rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-slate-900">Direct Escrow Disbursement</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Workers receive 100% of their attendance payment via UPI/Bank. Zero middleman cuts.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white border-brutal rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-slate-900">Instant GST Invoicing</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Consolidated monthly business expense invoices with input tax credit readiness.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white border-brutal rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-slate-900">Zero Lock-in Contract</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Replace any candidate within 2 hours if skill standards or discipline are unmet.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white border-brutal rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-slate-900">Dedicated Enterprise Concierge</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Assigned fleet manager for mass screening, background vetting and roster scaling.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t-2 border-black p-4 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Plan: Enterprise Beta • No Credit Card Required
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0A2342] hover:bg-[#07192f] text-white font-bold text-xs uppercase tracking-wider rounded border-brutal shadow-brutal-sm hover:shadow-brutal transition-all"
          >
            Got It, Continue Hiring
          </button>
        </div>

      </div>
    </div>
  );
}
