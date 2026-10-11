import React, { useState } from 'react';
import { 
  Zap, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  Star, 
  MapPin, 
  Plus, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import ServiceIcon from './ServiceIcon';
import confetti from 'canvas-confetti';

export default function DashboardView({ 
  currentEmployer, 
  requests, 
  setRequests,
  workerSuggestions, 
  onOpenPostJobModal, 
  onQuickHireService,
  onSelectWorker,
  onOpenZeroCommissionModal
}) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);

  // Quick action cards specified in the prompt:
  // "Hire a Sweeper", "Hire a Driver", "Hire a Chef", "Hire Security"
  const quickActions = [
    {
      id: 'sweepers',
      title: 'Hire a Sweeper',
      subtitle: 'Campus & Ground Cleanup',
      icon: 'Brush',
      color: 'bg-amber-50',
      eta: 'Ready in 15m',
      rate: '₹400 / shift'
    },
    {
      id: 'drivers',
      title: 'Hire a Driver',
      subtitle: 'Commercial & Chauffeur',
      icon: 'Car',
      color: 'bg-blue-50',
      eta: 'Ready in 25m',
      rate: '₹800 / shift'
    },
    {
      id: 'cooks',
      title: 'Hire a Chef',
      subtitle: 'Banquet & Bulk Cuisine',
      icon: 'Utensils',
      color: 'bg-orange-50',
      eta: 'Ready in 30m',
      rate: '₹900 / shift'
    },
    {
      id: 'security-guards',
      title: 'Hire Security',
      subtitle: 'PSARA & Gate Patrolling',
      icon: 'ShieldCheck',
      color: 'bg-emerald-50',
      eta: 'Ready in 20m',
      rate: '₹750 / shift'
    }
  ];

  // Filter requests based on status tab
  const filteredRequests = requests.filter(req => {
    if (statusFilter === 'ALL') return true;
    return req.status.toUpperCase() === statusFilter;
  });

  const handleUpdateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (newStatus === 'Completed') {
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* ================= HERO KPI METRICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border-brutal shadow-brutal-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Active On-Duty Staff</span>
            <div className="p-1.5 rounded bg-blue-50 border border-black text-[#0A2342]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{currentEmployer.activeContracts} Workers</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            100% Biometric Verified Shifts
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border-brutal shadow-brutal-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Urgent Requests</span>
            <div className="p-1.5 rounded bg-amber-50 border border-black text-amber-900">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {requests.filter(r => r.status === 'Pending').length} Pending
          </div>
          <div className="text-[11px] text-slate-600 font-medium mt-1">
            Avg match speed: <strong className="text-black">18.4 mins</strong>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border-brutal shadow-brutal-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Talent Nearby</span>
            <div className="p-1.5 rounded bg-emerald-50 border border-black text-emerald-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">148 Available</div>
          <div className="text-[11px] text-slate-600 font-medium mt-1">
            Within 5km radius of {currentEmployer.name.split(' ')[0]}
          </div>
        </div>

        {/* Metric 4: ZERO COMMISSION SAVINGS */}
        <div 
          onClick={onOpenZeroCommissionModal}
          className="bg-[#0A2342] text-white p-4 rounded-xl border-brutal shadow-brutal cursor-pointer hover:bg-[#07192f] transition-all"
        >
          <div className="flex items-center justify-between text-emerald-300 mb-1">
            <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
              <span>0% Commission Saved</span>
            </span>
            <span className="text-[10px] bg-[#00D26A] text-slate-950 font-black px-1.5 py-0.5 rounded border border-black">
              B2B OFFER
            </span>
          </div>
          <div className="text-2xl font-black text-[#00D26A]">
            {currentEmployer.savedWithZeroCommission}
          </div>
          <div className="text-[11px] text-slate-300 mt-1 flex items-center justify-between">
            <span>Direct worker escrow</span>
            <span className="text-white underline font-bold">Details →</span>
          </div>
        </div>

      </div>

      {/* ================= QUICK ACTION CARDS ================= */}
      {/* "Quick Action Cards (White cards with Black borders and subtle hover effects): 'Hire a Sweeper', 'Hire a Driver', 'Hire a Chef', 'Hire Security'" */}
      <section>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Instant Workforce Dispatch</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 border border-black rounded text-slate-800">
                1-CLICK SHORTCUTS
              </span>
            </h2>
            <p className="text-xs text-slate-600">
              Need immediate personnel right now? Pre-configured 15-minute dispatch requests.
            </p>
          </div>

          <button
            onClick={() => onOpenPostJobModal()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A2342] hover:text-black px-3 py-1.5 rounded border-brutal bg-white shadow-brutal-sm hover:shadow-brutal transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Custom Post</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              onClick={() => onQuickHireService(action.id)}
              className="bg-white p-4 rounded-xl border-brutal shadow-brutal-hover cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-lg border-brutal ${action.color} group-hover:scale-110 transition-transform`}>
                    <ServiceIcon name={action.icon} className="w-5 h-5 text-slate-950" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-black bg-rose-50 text-rose-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                    {action.eta}
                  </span>
                </div>

                <h3 className="font-black text-base text-slate-900 group-hover:text-[#0B3C5D] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{action.subtitle}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-800">{action.rate}</span>
                <span className="font-black text-[#0A2342] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Hire <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ACTIVE REQUESTS TABLE ================= */}
      <section className="bg-white rounded-xl border-brutal shadow-brutal overflow-hidden">
        
        {/* Table Header Bar */}
        <div className="p-4 sm:p-5 border-b-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Active Job Requests</span>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#0A2342] text-white rounded font-bold">
                {requests.length} Postings
              </span>
            </h2>
            <p className="text-xs text-slate-600">
              Live broadcasted requirements for {currentEmployer.name}
            </p>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', 'PENDING', 'MATCHED', 'IN REVIEW', 'COMPLETED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-2.5 py-1 text-xs font-bold rounded border-brutal transition-all ${
                  statusFilter === tab
                    ? 'bg-[#0A2342] text-white shadow-brutal-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-black text-[11px] font-mono uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Requirement / ID</th>
                <th className="py-3 px-4">Category & Model</th>
                <th className="py-3 px-4">Headcount & Pay</th>
                <th className="py-3 px-4">Timing & Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredRequests.map((req) => {
                // Status badge styling
                const getStatusBadge = (status) => {
                  switch (status.toUpperCase()) {
                    case 'PENDING':
                      return (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded font-bold text-[11px] bg-amber-100 text-amber-900 border border-amber-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                          Pending ({req.applicants} applied)
                        </span>
                      );
                    case 'MATCHED':
                      return (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded font-bold text-[11px] bg-emerald-100 text-emerald-950 border border-emerald-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Matched
                        </span>
                      );
                    case 'COMPLETED':
                      return (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded font-bold text-[11px] bg-slate-200 text-slate-800 border border-slate-400">
                          Completed
                        </span>
                      );
                    default:
                      return (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded font-bold text-[11px] bg-blue-100 text-blue-900 border border-blue-400">
                          {status}
                        </span>
                      );
                  }
                };

                return (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-black text-slate-900 text-xs sm:text-sm">{req.title}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span>{req.id}</span>
                        <span>•</span>
                        <span>{req.createdAt}</span>
                        {req.urgency === 'high' && (
                          <span className="px-1.5 py-0.2 bg-rose-500 text-white font-bold rounded text-[9px] uppercase">
                            URGENT
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{req.category}</div>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[10px] font-mono bg-slate-100 border border-black rounded text-slate-700">
                        {req.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-black text-slate-900">{req.headcount} Staff</div>
                      <div className="text-[11px] font-mono text-emerald-700 font-bold">{req.pay}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-slate-800 font-medium truncate">{req.timing}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{req.location}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(req.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {req.status === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'Matched')}
                            title="Accept Candidate Matches"
                            className="px-2.5 py-1 text-xs font-bold bg-[#0A2342] text-white rounded border-brutal hover:bg-[#07192f] shadow-brutal-sm"
                          >
                            Match ({req.applicants})
                          </button>
                        )}

                        {req.status === 'Matched' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'Completed')}
                            title="Mark Fulfilled"
                            className="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded border-brutal hover:bg-emerald-700 shadow-brutal-sm"
                          >
                            Complete
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedRequestDetails(req)}
                          className="p-1.5 rounded border border-black hover:bg-slate-200 text-slate-700"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            <p className="text-sm font-bold">No job postings found for filter: {statusFilter}</p>
          </div>
        )}

      </section>

      {/* ================= AI SUGGESTIONS SECTION ================= */}
      {/* "AI Suggestions Section: 'Workers recommended for your Hotel based on past hires'" */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#0A2342] text-white">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                AI Suggestions: Workers recommended for {currentEmployer.name}
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Ranked by past punctuality, verified credentials, and previous 5-star ratings with your team.
            </p>
          </div>

          <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border-brutal px-2.5 py-1 rounded font-bold">
            Zero Platform Fee on Direct Hires
          </span>
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workerSuggestions.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-xl border-brutal shadow-brutal flex flex-col justify-between hover:shadow-brutal-lg transition-all"
            >
              <div className="p-4 sm:p-5">
                {/* Header with Avatar & Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={worker.avatar}
                        alt={worker.name}
                        className="w-12 h-12 rounded-full border-2 border-black object-cover bg-slate-200"
                      />
                      {worker.availableNow && (
                        <span 
                          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" 
                          title="Ready for dispatch"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-sm text-slate-900">{worker.name}</h4>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" title="Police & Identity Cleared" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{worker.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded text-xs font-bold text-amber-900">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{worker.rating}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {worker.badges.slice(0, 2).map((b, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 border border-black rounded text-slate-800"
                    >
                      {b}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-300 rounded">
                    {worker.distance}
                  </span>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {worker.bio}
                </p>

                {/* Past record indicator */}
                <div className="mt-3 py-1.5 px-2.5 bg-blue-50/60 rounded border border-blue-200 text-[11px] font-semibold text-[#0A2342] flex items-center justify-between">
                  <span>Past Hires: {worker.pastHiresWithEmployer} shifts</span>
                  <span className="font-mono font-bold text-emerald-700">100% Punctual</span>
                </div>
              </div>

              {/* Card Footer with Rate & Action */}
              <div className="p-3.5 bg-slate-50 border-t-2 border-black flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Rate</div>
                  <div className="text-xs font-black text-slate-900">{worker.hourlyRate} / {worker.monthlyRate}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectWorker(worker)}
                    className="px-3 py-1.5 text-xs font-bold bg-white text-slate-900 rounded border-brutal hover:bg-slate-100 shadow-brutal-sm"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onSelectWorker(worker)}
                    className="px-3 py-1.5 text-xs font-black bg-[#0A2342] text-white rounded border-brutal hover:bg-[#07192f] shadow-brutal-sm flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>Hire</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request Details Modal */}
      {selectedRequestDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-brutal-2 rounded-xl p-6 max-w-lg w-full shadow-brutal-lg">
            <div className="flex items-start justify-between border-b pb-3 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500">{selectedRequestDetails.id}</span>
                <h3 className="text-base font-black text-slate-900">{selectedRequestDetails.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedRequestDetails(null)}
                className="p-1 rounded hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2.5 text-xs text-slate-700">
              <div><strong>Category:</strong> {selectedRequestDetails.category}</div>
              <div><strong>Engagement:</strong> {selectedRequestDetails.type}</div>
              <div><strong>Headcount:</strong> {selectedRequestDetails.headcount} Workers</div>
              <div><strong>Pay Rate:</strong> {selectedRequestDetails.pay}</div>
              <div><strong>Location:</strong> {selectedRequestDetails.location}</div>
              <div><strong>Timings:</strong> {selectedRequestDetails.timing}</div>
              <div><strong>Employer:</strong> {selectedRequestDetails.employer}</div>
              <div><strong>Notes:</strong> {selectedRequestDetails.notes}</div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedRequestDetails(null)}
                className="px-4 py-2 bg-[#0A2342] text-white font-bold text-xs uppercase rounded border-brutal shadow-brutal-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
