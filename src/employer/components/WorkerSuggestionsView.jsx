import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { SERVICE_CATEGORIES, WORKER_SUGGESTIONS } from '../data/mockData';
import ServiceIcon from './ServiceIcon';

export default function WorkerSuggestionsView({ 
  currentEmployer, 
  onSelectWorker, 
  onOpenPostJobModal, 
  onOpenZeroCommissionModal 
}) {
  const [selectedTrade, setSelectedTrade] = useState('ALL');
  const [onlyAvailableNow, setOnlyAvailableNow] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const filtered = WORKER_SUGGESTIONS.filter(w => {
    if (selectedTrade !== 'ALL' && w.category.toLowerCase() !== selectedTrade.toLowerCase() && !w.role.toLowerCase().includes(selectedTrade.toLowerCase())) {
      return false;
    }
    if (onlyAvailableNow && !w.availableNow) {
      return false;
    }
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        w.name.toLowerCase().includes(q) ||
        w.role.toLowerCase().includes(q) ||
        w.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-[#0A2342] text-white p-6 rounded-xl border-brutal-2 shadow-brutal flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#00D26A] text-slate-950 font-black text-xs uppercase tracking-wider rounded mb-2 border border-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI MATCHING ENGINE</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Verified Talent Pool & Recommendations
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Pre-vetted service and blue-collar professionals sorted by proximity to {currentEmployer.name} ({currentEmployer.location}).
          </p>
        </div>

        <button
          onClick={onOpenPostJobModal}
          className="px-4 py-2.5 bg-white text-slate-900 font-black text-xs uppercase tracking-wider rounded border-brutal hover:bg-slate-100 shadow-brutal transition-all"
        >
          + Broadcast Custom Need
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border-brutal-2 shadow-brutal space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by skill, name or equipment handled (e.g. 'PSARA', 'Tandoor', 'Buffing')..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border-brutal rounded focus:ring-2 focus:ring-[#0A2342] font-semibold text-slate-800"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 bg-slate-50 border-brutal px-3.5 py-2 rounded shrink-0">
            <input
              type="checkbox"
              checked={onlyAvailableNow}
              onChange={(e) => setOnlyAvailableNow(e.target.checked)}
              className="w-4 h-4 accent-[#0A2342] rounded"
            />
            <span>⚡ Ready for Instant Dispatch Only</span>
          </label>
        </div>

        {/* Trade Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          <button
            onClick={() => setSelectedTrade('ALL')}
            className={`px-3 py-1 text-xs font-bold rounded border-brutal shrink-0 transition-all ${
              selectedTrade === 'ALL'
                ? 'bg-[#0A2342] text-white shadow-brutal-sm'
                : 'bg-white hover:bg-slate-50 text-slate-800'
            }`}
          >
            All Trades ({WORKER_SUGGESTIONS.length})
          </button>

          {SERVICE_CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedTrade(cat.name)}
              className={`px-3 py-1 text-xs font-bold rounded border-brutal shrink-0 transition-all flex items-center gap-1.5 ${
                selectedTrade === cat.name
                  ? 'bg-[#0A2342] text-white shadow-brutal-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <ServiceIcon name={cat.icon} className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((worker) => (
          <div
            key={worker.id}
            className="bg-white rounded-xl border-brutal shadow-brutal flex flex-col justify-between hover:shadow-brutal-lg transition-all"
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-12 h-12 rounded-full border-2 border-black object-cover"
                    />
                    {worker.availableNow && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-black text-sm text-slate-900">{worker.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{worker.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded text-xs font-bold text-amber-900">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{worker.rating}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {worker.skills.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="text-[10px] font-bold bg-slate-100 border border-black rounded px-2 py-0.5 text-slate-800">
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {worker.bio}
              </p>

              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-700" />
                  {worker.distance}
                </span>
                <span className="text-emerald-700 font-bold">
                  {worker.pastHiresWithEmployer} past shifts with you
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t-2 border-black flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block">Rate</span>
                <span className="text-xs font-black text-slate-900">{worker.hourlyRate} / {worker.monthlyRate}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectWorker(worker)}
                  className="px-3 py-1.5 text-xs font-bold bg-white text-slate-900 rounded border-brutal hover:bg-slate-100 shadow-brutal-sm"
                >
                  Profile
                </button>
                <button
                  onClick={() => onSelectWorker(worker)}
                  className="px-3.5 py-1.5 text-xs font-black bg-[#0A2342] text-white rounded border-brutal hover:bg-[#07192f] shadow-brutal-sm flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>1-Click Hire</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
