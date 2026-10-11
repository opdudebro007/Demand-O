import React, { useState } from 'react';
import { 
  FileCheck, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle2, 
  QrCode, 
  Download, 
  UserCheck, 
  RefreshCw,
  Plus
} from 'lucide-react';
import { CONTRACTS_DATA } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function MyContractsView({ currentEmployer, onOpenPostJobModal, onOpenZeroCommissionModal }) {
  const [contracts, setContracts] = useState(CONTRACTS_DATA);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleVerifyAttendance = (id) => {
    setContracts(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          attendanceToday: 'Verified Geofence + Biometric (Present)',
        };
      }
      return c;
    }));

    setSuccessMsg(`Attendance verified & locked in Escrow ledger for contract ${id}`);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch (e) {}

    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border-brutal-2 shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0A2342] text-white">
              <FileCheck className="w-5 h-5 text-emerald-400" />
            </span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Active Contracts & Escrow Roster
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Managing {contracts.length} long-term workforce agreements for {currentEmployer.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenZeroCommissionModal}
            className="px-3.5 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs rounded border-brutal shadow-brutal-sm flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>0% Commission Active</span>
          </button>

          <button
            onClick={onOpenPostJobModal}
            className="px-3.5 py-2 bg-[#0A2342] hover:bg-[#07192f] text-white font-bold text-xs uppercase tracking-wider rounded border-brutal shadow-brutal-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Contract</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border-brutal rounded-lg text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Contracts Table */}
      <div className="bg-white rounded-xl border-brutal-2 shadow-brutal overflow-hidden">
        <div className="p-4 border-b-2 border-black bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
            Active Deployments & Daily Check-In Logs
          </span>
          <span className="text-xs font-mono text-slate-500">
            Automated GST Invoice Generated 1st of every month
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-black text-[11px] font-mono uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Contract ID & Worker</th>
                <th className="py-3 px-4">Trade / Service</th>
                <th className="py-3 px-4">Shift & Schedule</th>
                <th className="py-3 px-4">Monthly Escrow</th>
                <th className="py-3 px-4">Today's Attendance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-black text-slate-900 text-sm">{c.workerName}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      {c.id} • Started {c.startDate}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{c.service}</div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded inline-block mt-0.5">
                      {c.duration}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-800 font-medium">{c.shift}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{c.lastVerification}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-black text-slate-900 text-sm">{c.monthlyAmount}</div>
                    <div className="text-[10px] font-mono text-emerald-700 font-bold">
                      {c.payoutType}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-bold text-[11px] bg-slate-100 border border-black text-slate-900">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {c.attendanceToday}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleVerifyAttendance(c.id)}
                      className="px-2.5 py-1 text-xs font-bold bg-white hover:bg-slate-100 text-slate-900 rounded border-brutal shadow-brutal-sm"
                      title="Verify Biometric Check-in"
                    >
                      Verify Check-in
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
