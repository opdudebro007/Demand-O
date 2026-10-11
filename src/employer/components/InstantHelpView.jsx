import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  Users
} from 'lucide-react';
import { WORKER_SUGGESTIONS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function InstantHelpView({ currentEmployer, onSelectWorker, onOpenPostJobModal }) {
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [selectedRole, setSelectedRole] = useState('ALL');

  const emergencyRoles = [
    { id: 'ALL', name: 'All Ready Personnel' },
    { id: 'Security Guards', name: '⚡ Urgent Guards' },
    { id: 'Cleaners', name: '⚡ Emergency Housekeeping' },
    { id: 'Cooks', name: '⚡ Rush Banquet Chefs' },
    { id: 'Sweepers', name: '⚡ Grounds Cleanup' },
  ];

  const availableWorkers = WORKER_SUGGESTIONS.filter(w => {
    if (selectedRole === 'ALL') return w.availableNow;
    return w.category === selectedRole && w.availableNow;
  });

  const handleInstantBroadcast = (trade) => {
    setDispatchStatus({
      active: true,
      trade: trade,
      timer: 18,
      matches: 4
    });

    try {
      confetti({ particleCount: 35, spread: 60 });
    } catch (e) {}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Hero Radar Header */}
      <div className="bg-[#0A2342] text-white p-6 rounded-xl border-brutal-2 shadow-brutal relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, #00D26A 0%, transparent 60%)`
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 rounded font-black text-xs uppercase tracking-wider mb-2 border border-black shadow-brutal-sm">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>15 - 30 MIN RAPID RESPONSE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Instant Help Radar Dispatch
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Sudden absenteeism or urgent banquet rush? Broadcast an instantaneous dispatch alert to geofenced, background-verified workers within 3 km of {currentEmployer.name}.
            </p>
          </div>

          {/* Interactive Radar Visualizer Widget */}
          <div className="bg-[#07192f] border-2 border-black p-4 rounded-xl flex items-center gap-4 shrink-0 shadow-brutal-sm">
            <div className="relative w-16 h-16 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-[#051121] overflow-hidden">
              <div className="absolute inset-0 rounded-full border border-emerald-500/80 animate-radar" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00D26A]" />
              <Radio className="w-6 h-6 text-emerald-400/80 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <div>
              <div className="text-xs font-mono uppercase text-slate-400">Live Radius Radar</div>
              <div className="text-base font-black text-emerald-400">28 Active Nearby</div>
              <div className="text-[11px] text-slate-300">Avg arrival: 18 mins</div>
            </div>
          </div>
        </div>

        {/* Live SOS Broadcast Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-700/80 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono text-slate-300 mr-2">Instant SOS Broadcast:</span>
          {['2 Night Guards', '3 Cleaners', '1 Chef', '1 Electrician'].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleInstantBroadcast(item)}
              className="px-3 py-1.5 bg-white text-slate-950 font-bold text-xs rounded border border-black shadow-brutal-sm hover:bg-slate-100 hover:shadow-brutal transition-all"
            >
              ⚡ Dispatch {item}
            </button>
          ))}
        </div>
      </div>

      {/* Broadcast Active Notice */}
      {dispatchStatus && (
        <div className="p-4 bg-emerald-50 border-brutal-2 rounded-xl flex items-center justify-between shadow-brutal animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <div>
              <div className="font-black text-sm text-emerald-950">
                Broadcasting for: {dispatchStatus.trade}
              </div>
              <p className="text-xs text-emerald-800">
                Alert sent to verified personnel in 3km perimeter. 3 candidates responded within 90 seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-white border border-black px-2 py-1 rounded font-black">
              ETA: ~{dispatchStatus.timer} mins
            </span>
            <button
              onClick={() => setDispatchStatus(null)}
              className="text-xs font-bold underline text-slate-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Trade Category Filter */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {emergencyRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded border-brutal transition-all ${
                selectedRole === role.id
                  ? 'bg-[#0A2342] text-white shadow-brutal'
                  : 'bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenPostJobModal}
          className="text-xs font-bold text-[#0A2342] underline hover:text-black"
        >
          Can't find role? Custom Emergency Post →
        </button>
      </div>

      {/* Ready Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableWorkers.map((worker) => (
          <div 
            key={worker.id}
            className="bg-white rounded-xl border-brutal shadow-brutal p-4 flex flex-col justify-between hover:shadow-brutal-lg transition-all"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-12 h-12 rounded-full border-2 border-black object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900">{worker.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{worker.category}</p>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>Ready in {worker.readyInMinutes}m</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-slate-900">{worker.hourlyRate}</div>
                  <div className="text-[10px] font-mono text-slate-500">{worker.distance}</div>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <div className="text-[11px] text-slate-700 line-clamp-2">
                  {worker.bio}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {worker.badges.map((b, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 border border-black rounded text-slate-800">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-700 font-bold">
                0% Platform Fee
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectWorker(worker)}
                  className="px-3 py-1.5 text-xs font-bold bg-white text-slate-900 rounded border-brutal hover:bg-slate-50 shadow-brutal-sm"
                >
                  Profile
                </button>
                <button
                  onClick={() => onSelectWorker(worker)}
                  className="px-3.5 py-1.5 text-xs font-black bg-[#0B3C5D] text-white rounded border-brutal hover:bg-[#072439] shadow-brutal-sm flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Dispatch</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
