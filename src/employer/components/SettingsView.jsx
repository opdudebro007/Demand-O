import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  ShieldCheck, 
  Percent, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Download,
  Save
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsView({ currentEmployer, onOpenZeroCommissionModal }) {
  const [adminName, setAdminName] = useState(currentEmployer.adminName);
  const [role, setRole] = useState(currentEmployer.role);
  const [location, setLocation] = useState(currentEmployer.location);
  const [gstin, setGstin] = useState('07AAAAA0000A1Z5');
  const [policeVerificationReq, setPoliceVerificationReq] = useState(true);
  const [autoEscrowRelease, setAutoEscrowRelease] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch (e) {}
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border-brutal-2 shadow-brutal flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0A2342] text-white">
              <Settings className="w-5 h-5 text-emerald-400" />
            </span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Enterprise Settings & Workforce Compliance
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Configure {currentEmployer.name} credentials, billing escrow, and verification policies
          </p>
        </div>

        <button
          onClick={onOpenZeroCommissionModal}
          className="px-3 py-1.5 bg-[#00D26A] text-slate-950 font-black text-xs uppercase rounded border-brutal shadow-brutal-sm flex items-center gap-1"
        >
          <Percent className="w-3.5 h-3.5" />
          <span>30-Day Zero Fee Active</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border-brutal rounded-lg text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Employer profile and compliance rules updated successfully.</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border-brutal-2 shadow-brutal overflow-hidden">
        
        <div className="p-4 bg-slate-50 border-b-2 border-black font-black text-xs uppercase tracking-wider text-slate-700">
          Organization & Point of Contact
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Facility / Business Name
              </label>
              <input
                type="text"
                disabled
                value={currentEmployer.name}
                className="w-full px-3 py-2 text-xs bg-slate-100 border-brutal rounded font-bold text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                GSTIN / Tax Registration
              </label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border-brutal rounded font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Authorized HR / Facility Manager
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border-brutal rounded font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Designation / Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border-brutal rounded font-bold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Registered Site Address / Geofence Coordinate
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border-brutal rounded font-bold text-slate-900"
            />
          </div>
        </div>

        {/* Compliance Settings */}
        <div className="p-4 bg-slate-50 border-t-2 border-b-2 border-black font-black text-xs uppercase tracking-wider text-slate-700">
          Workforce Verification & Payout Policies
        </div>

        <div className="p-6 space-y-3">
          <label className="flex items-center justify-between p-3 bg-slate-50 border-brutal rounded-lg cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">
                Strict Police Verification & PSARA Only
              </span>
              <span className="text-[11px] text-slate-500">
                Only show personnel with verified criminal record clearance on portal.
              </span>
            </div>
            <input
              type="checkbox"
              checked={policeVerificationReq}
              onChange={(e) => setPoliceVerificationReq(e.target.checked)}
              className="w-5 h-5 accent-[#0A2342] rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 border-brutal rounded-lg cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">
                Auto-Release Escrow on Geofenced Biometric Check-Out
              </span>
              <span className="text-[11px] text-slate-500">
                Disburse 100% daily or monthly wage without manual supervisor approval.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoEscrowRelease}
              onChange={(e) => setAutoEscrowRelease(e.target.checked)}
              className="w-5 h-5 accent-[#0A2342] rounded"
            />
          </label>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t-2 border-black p-4 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Audit ID: SEC-2026-B2B
          </span>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#07253b] text-white font-black text-xs uppercase tracking-wider rounded border-brutal shadow-brutal hover:shadow-brutal-lg transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
}
