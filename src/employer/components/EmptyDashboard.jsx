import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Building2, 
  ChevronRight, 
  Zap, 
  HelpCircle, 
  Percent, 
  CheckCircle2, 
  RotateCcw,
  Clock,
  MapPin,
  DollarSign,
  AlertCircle,
  FileCheck2,
  Lock,
  Download,
  Save,
  Radio,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EmptyDashboard({ 
  businessProfile, 
  setBusinessProfile,
  postedJobs = [],
  onOpenPostJobModal,
  onResetJourney,
  onShowToast,
  onSwitchToPartner
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Fully Functional SPA Active Tab State
  // Values: 'Overview' | 'Job Postings' | 'Active Personnel' | 'Contracts & Escrow' | 'Billing & Invoices' | 'Organization Settings'
  const [activeTab, setActiveTab] = useState('Overview');

  // Local state for Settings form
  const [settingsForm, setSettingsForm] = useState({
    businessName: businessProfile?.businessName || 'Grand Horizon Hospitality',
    businessType: businessProfile?.businessType || 'Hotel/Restaurant',
    cityLocation: businessProfile?.cityLocation || 'Sector 29, Cyber Hub, Gurugram',
    contactName: businessProfile?.contactName || 'Rajesh Verma (General Manager)',
    email: businessProfile?.email || 'admin@grandhorizon.com',
    policeClearanceOnly: true,
    autoEscrowRelease: true,
    instantDispatchAlerts: true,
  });

  // Local state for escrow balance simulation
  const [escrowBalance, setEscrowBalance] = useState(0);

  const navigationLinks = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Job Postings', label: 'Job Postings', icon: Briefcase, count: postedJobs.length },
    { id: 'Active Personnel', label: 'Active Personnel', icon: Users, count: 0 },
    { id: 'Contracts & Escrow', label: 'Contracts & Escrow', icon: FileText, count: 0 },
    { id: 'Billing & Invoices', label: 'Billing & Invoices', icon: CreditCard },
    { id: 'Organization Settings', label: 'Organization Settings', icon: Settings },
  ];

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (setBusinessProfile) {
      setBusinessProfile(prev => ({
        ...prev,
        ...settingsForm
      }));
    }
    try {
      confetti({ particleCount: 35, spread: 50 });
    } catch (err) {}
    if (onShowToast) {
      onShowToast('Settings saved successfully! Compliance rules updated.');
    }
  };

  const handleDepositEscrow = () => {
    setEscrowBalance(prev => prev + 5000);
    try {
      confetti({ particleCount: 30, spread: 45 });
    } catch (err) {}
    if (onShowToast) {
      onShowToast('₹5,000 added to Escrow Wallet. Zero fee applied.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex selection:bg-[#0B3C5D] selection:text-white">
      
      {/* ================= MOBILE SIDEBAR BACKDROP ================= */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* ================= FULLY FUNCTIONAL SIDEBAR NAVIGATION ================= */}
      <aside className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-black/80 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-black/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center font-black text-sm shadow-glow-sm">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 flex items-center gap-1.5">
                  <span>Demand O</span>
                  <span className="px-1.5 py-0.2 bg-[#00D26A] text-slate-950 text-[9px] font-black rounded uppercase">
                    Hire
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                  {businessProfile?.businessName || 'Enterprise'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Business Profile Badge in Sidebar */}
          <div className="p-3 mx-3 my-3 bg-slate-50 border border-black/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-white border border-black/80 flex items-center justify-center text-[#0B3C5D] shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {businessProfile?.businessName || 'Grand Horizon Hotel'}
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate">
                  {businessProfile?.businessType || 'Hospitality'}
                </div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Account Active" />
          </div>

          {/* Interactive Navigation Links with Dynamic Highlighting */}
          <nav className="px-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Management Portal
            </div>

            {navigationLinks.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#0B3C5D] text-white shadow-glow-sm font-extrabold translate-x-0.5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-white/20 text-white font-bold' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Status & Dev Switcher */}
        <div className="p-4 border-t border-black/80 space-y-3 bg-white">
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between text-xs font-bold text-[#0B3C5D] mb-1">
              <span className="flex items-center gap-1">
                <Percent className="w-3.5 h-3.5" />
                <span>30-Day Zero Fee</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Trial active. 100% of your disbursements go directly to workers.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <button
              onClick={onResetJourney}
              className="hover:text-black flex items-center gap-1 font-semibold text-slate-500 hover:underline cursor-pointer"
              title="Reset to Screen 1 (Login)"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Flow</span>
            </button>
            <span className="font-mono text-[10px]">v2.4 Live</span>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header: "Welcome to Demand O Hire!" */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-black/80 px-6 lg:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-black text-slate-700 hover:bg-slate-100"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Welcome to Demand O Hire!</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-300">
                  Account Verified
                </span>
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Active View: <strong className="text-[#0B3C5D] font-bold">{activeTab}</strong> • {businessProfile?.businessName || 'Your Business'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onSwitchToPartner && (
              <button
                onClick={onSwitchToPartner}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black border border-black shadow-sm transition-all cursor-pointer"
                title="Switch to Worker / Partner Portal"
              >
                <span>👷 Switch to Partner Portal</span>
              </button>
            )}

            <button
              onClick={onOpenPostJobModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B3C5D] text-white text-xs font-bold border border-black shadow-glow-sm hover:bg-[#082e47] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Post Job</span>
            </button>

            <button 
              className="p-2 rounded-xl border border-black/80 hover:bg-slate-50 text-slate-700 relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0B3C5D]" />
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center font-bold text-xs border border-black shadow-sm">
                {businessProfile?.businessName?.charAt(0) || 'H'}
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-bold text-slate-900 truncate max-w-[130px]">
                  {businessProfile?.contactName?.split(' ')[0] || 'Administrator'}
                </div>
                <div className="text-[10px] text-slate-500 truncate max-w-[130px]">
                  {businessProfile?.businessName || 'Grand Horizon'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ================= DYNAMIC CANVAS BASED ON ACTIVE TAB ================= */}
        <main className="flex-1 flex flex-col p-6 sm:p-10 relative overflow-y-auto">
          
          {/* Subtle background ambient blur */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* ================= 1. OVERVIEW VIEW ================= */}
          {activeTab === 'Overview' && (
            <motion.div
              key="view-overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full mx-auto space-y-6"
            >
              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="bg-white p-3.5 rounded-2xl border border-black/80 shadow-subtle">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Active Jobs</div>
                  <div className="text-xl font-extrabold text-slate-900 mt-0.5">{postedJobs.length} Postings</div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">Live Broadcast</div>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-black/80 shadow-subtle">
                  <div className="text-[10px] uppercase font-bold text-slate-400">On-Duty Staff</div>
                  <div className="text-xl font-extrabold text-slate-900 mt-0.5">0 Clocked In</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1">Biometric Checked</div>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-black/80 shadow-subtle">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Escrow Balance</div>
                  <div className="text-xl font-extrabold text-slate-900 mt-0.5">₹{escrowBalance.toLocaleString()}</div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">Direct Worker Payout</div>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-black/80 shadow-subtle">
                  <div className="text-[10px] uppercase font-bold text-slate-400">30-Day Platform Fee</div>
                  <div className="text-xl font-extrabold text-emerald-700 mt-0.5">₹0 (Free)</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1">Zero Commission Trial</div>
                </div>
              </div>

              {/* If no jobs posted yet: The Iconic Empty State Graphic */}
              {postedJobs.length === 0 ? (
                <div className="py-8 flex flex-col items-center text-center">
                  {/* Modern AI-Era Empty State Graphic */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-3xl bg-blue-50/80 border border-black/80 flex items-center justify-center shadow-card relative">
                      <div className="absolute inset-2 rounded-2xl border border-dashed border-[#0B3C5D]/40" />
                      <div className="w-14 h-14 rounded-2xl bg-[#0B3C5D] text-white flex items-center justify-center shadow-glow border border-black relative z-10">
                        <Briefcase className="w-7 h-7 text-white stroke-[2.2]" />
                      </div>
                      <motion.div 
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-2 -right-3 px-2 py-0.5 rounded-full bg-[#00D26A] text-slate-950 font-black text-[10px] border border-black shadow-sm flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>AI Ready</span>
                      </motion.div>
                      <motion.div 
                        animate={{ y: [3, -3, 3] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        className="absolute -bottom-2 -left-3 px-2 py-0.5 rounded-full bg-white text-[#0B3C5D] font-bold text-[10px] border border-black shadow-sm flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span>0 Active Staff</span>
                      </motion.div>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    You haven't hired anyone yet.
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-md font-medium">
                    Let's find your first worker. Broadcast your requirements and get matched with pre-vetted professionals in minutes.
                  </p>

                  {/* MASSIVE PROMINENT CALL-TO-ACTION BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onOpenPostJobModal}
                    className="mt-8 px-8 py-4 rounded-2xl bg-[#0B3C5D] hover:bg-[#082e47] text-white font-extrabold text-base flex items-center gap-3 border border-black shadow-glow-lg transition-all duration-200 group cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center text-white border border-white/20 group-hover:rotate-90 transition-transform duration-300">
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="tracking-wide">+ Post Your First Job</span>
                  </motion.button>

                  {/* SUBTLE AI SUGGESTION BOX BELOW CTA */}
                  <div 
                    onClick={onOpenPostJobModal}
                    className="mt-6 w-full max-w-md cursor-pointer group"
                  >
                    <div className="p-3.5 rounded-2xl bg-white border border-black/80 shadow-subtle hover:shadow-card hover:border-[#0B3C5D] transition-all duration-200 flex items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0B3C5D] flex items-center justify-center border border-black/10 shrink-0 group-hover:scale-105 transition-transform">
                          <Sparkles className="w-4 h-4 text-[#0B3C5D]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            AI Recommendation
                          </div>
                          <div className="text-xs font-bold text-slate-800 truncate group-hover:text-[#0B3C5D] transition-colors">
                            Popular right now: Hire a Security Guard for the night shift.
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#0B3C5D] shrink-0 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>1-Click</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* If jobs have been posted during session: Live Broadcast Status Card */
                <div className="bg-white rounded-2xl border border-black/80 shadow-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <h3 className="font-extrabold text-base text-slate-900">
                        Live Job Requirement Broadcast
                      </h3>
                    </div>
                    <button
                      onClick={onOpenPostJobModal}
                      className="text-xs font-bold text-[#0B3C5D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Post Another</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {postedJobs.map(job => (
                      <div key={job.id} className="p-4 rounded-xl border border-black/70 bg-slate-50 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{job.title}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                              {job.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                            <span>{job.category}</span>
                            <span>•</span>
                            <span>{job.headcount} Staff</span>
                            <span>•</span>
                            <span>{job.pay}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-600 block">0 Applied</span>
                          <span className="text-[10px] text-slate-400">Scanning in 5km</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ================= 2. JOB POSTINGS VIEW ================= */}
          {activeTab === 'Job Postings' && (
            <motion.div
              key="view-jobs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full mx-auto space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Job Postings & Requirements
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage active hiring broadcasts and candidate applications for {businessProfile?.businessName}.
                  </p>
                </div>

                <button
                  onClick={onOpenPostJobModal}
                  className="px-4 py-2 rounded-xl bg-[#0B3C5D] hover:bg-[#082e47] text-white text-xs font-bold border border-black shadow-glow flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create New Job Requirement</span>
                </button>
              </div>

              {postedJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-black/80 shadow-subtle p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-black/80 flex items-center justify-center text-slate-400 mb-4">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    No active job postings yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Post an urgent requirement or schedule recurring shifts to start receiving pre-screened candidate matches in your area.
                  </p>
                  <button
                    onClick={onOpenPostJobModal}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-[#0B3C5D] text-white text-xs font-bold border border-black shadow-glow hover:bg-[#082e47] transition-all cursor-pointer"
                  >
                    + Post Your First Job
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-black/80 shadow-subtle divide-y divide-slate-100 overflow-hidden">
                  {postedJobs.map(job => (
                    <div key={job.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0B3C5D]">
                            {job.type}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                          <span>{job.category}</span>
                          <span>•</span>
                          <span>{job.headcount} Workers</span>
                          <span>•</span>
                          <span>{job.timing}</span>
                          <span>•</span>
                          <span className="font-bold text-emerald-700">{job.pay}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                          Broadcast Active (0 applicants)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ================= 3. ACTIVE PERSONNEL VIEW ================= */}
          {activeTab === 'Active Personnel' && (
            <motion.div
              key="view-personnel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full mx-auto space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Active Personnel & Shift Monitoring
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time status of on-duty staff, GPS geofencing, and shift replacements.
                </p>
              </div>

              {/* Verified Workers in Area Highlight Banner */}
              <div className="bg-[#0B3C5D] text-white p-5 rounded-2xl border border-black shadow-glow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#00D26A]">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">148 Verified Workers Active in Your Perimeter</h4>
                    <p className="text-xs text-blue-200">
                      Average arrival time: 18 minutes around {businessProfile?.cityLocation || 'your location'}.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenPostJobModal}
                  className="px-4 py-2 bg-white text-[#0B3C5D] rounded-xl text-xs font-bold border border-black hover:bg-slate-100 shadow-sm shrink-0 cursor-pointer"
                >
                  Broadcast Urgent Shift
                </button>
              </div>

              {/* Clean Empty State */}
              <div className="bg-white rounded-2xl border border-black/80 shadow-subtle p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-black/80 flex items-center justify-center text-slate-400 mb-4">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  No personnel currently on duty
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Once candidates are accepted from your job postings, their live GPS shift geofencing, daily biometric clock-ins, and direct supervisor contact will appear here.
                </p>
                <button
                  onClick={onOpenPostJobModal}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#0B3C5D] text-white text-xs font-bold border border-black shadow-glow hover:bg-[#082e47] transition-all cursor-pointer"
                >
                  + Post a Job to Hire Staff
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= 4. CONTRACTS & ESCROW VIEW ================= */}
          {activeTab === 'Contracts & Escrow' && (
            <motion.div
              key="view-contracts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full mx-auto space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Contracts & Escrow Wage Protection
                </h2>
                <p className="text-xs text-slate-500">
                  Transparent agreements and automated biometric release. Zero contractor lock-in.
                </p>
              </div>

              {/* Escrow Balance Card */}
              <div className="bg-white rounded-2xl border border-black/80 shadow-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    Escrow Wallet Balance
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">
                    ₹{escrowBalance.toLocaleString()}.00
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    Funds are safely held until employee shift QR/biometric signoff.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDepositEscrow}
                    className="px-4 py-2 bg-[#0B3C5D] text-white rounded-xl text-xs font-bold border border-black shadow-glow hover:bg-[#082e47] cursor-pointer"
                  >
                    + Add ₹5,000 to Escrow
                  </button>
                </div>
              </div>

              {/* Clean Empty State */}
              <div className="bg-white rounded-2xl border border-black/80 shadow-subtle p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-black/80 flex items-center justify-center text-slate-400 mb-4">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  No active workforce contracts
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Demand O protects hirers with direct escrow disbursement. Worker wages are held securely and only disbursed upon verified attendance. Zero platform fees during your 30-day trial.
                </p>
                <button
                  onClick={onOpenPostJobModal}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#0B3C5D] text-white text-xs font-bold border border-black shadow-glow hover:bg-[#082e47] transition-all cursor-pointer"
                >
                  Create Contract Job
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= 5. BILLING & INVOICES VIEW ================= */}
          {activeTab === 'Billing & Invoices' && (
            <motion.div
              key="view-billing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full mx-auto space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Billing & GST Tax Invoicing
                </h2>
                <p className="text-xs text-slate-500">
                  Consolidated monthly expense reports with 100% input tax credit compliance.
                </p>
              </div>

              {/* Plan Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-emerald-950">
                      First 30 Days: Zero Commission Trial ACTIVE
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] font-mono font-bold">
                      0% TAKE-RATE
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 mt-1">
                    No platform overhead charged on worker wages. Payouts go 100% directly to verified workers.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-300 shrink-0">
                  16 Days Remaining
                </span>
              </div>

              {/* Invoice Ledger Table Empty State */}
              <div className="bg-white rounded-2xl border border-black/80 shadow-subtle overflow-hidden">
                <div className="p-4 border-b border-black/80 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Tax Invoice Ledger</span>
                  <span className="text-slate-400 font-mono text-[11px]">GSTIN Registered</span>
                </div>

                <div className="p-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-black/80 flex items-center justify-center text-slate-400 mb-3">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">No invoices generated yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Your consolidated GST-compliant tax invoices will be generated automatically at the end of each monthly billing cycle.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= 6. ORGANIZATION SETTINGS VIEW ================= */}
          {activeTab === 'Organization Settings' && (
            <motion.div
              key="view-settings"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full mx-auto space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Organization & Hirer Settings
                </h2>
                <p className="text-xs text-slate-500">
                  Configure your business entity, site location, and workforce verification rules.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-black/80 shadow-card overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-black/80 font-bold text-xs uppercase tracking-wider text-slate-700">
                  Hirer Profile Details
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Business / Household Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.businessName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                        className="ai-input w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Hirer Category
                      </label>
                      <select
                        value={settingsForm.businessType}
                        onChange={(e) => setSettingsForm({ ...settingsForm, businessType: e.target.value })}
                        className="ai-input w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-white"
                      >
                        <option value="Hotel/Restaurant">Hotel/Restaurant</option>
                        <option value="School/College">School/College</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Corporate Office">Corporate Office</option>
                        <option value="Household">Household</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Primary Contact Person
                      </label>
                      <input
                        type="text"
                        value={settingsForm.contactName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, contactName: e.target.value })}
                        className="ai-input w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        className="ai-input w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Registered Site / Facility Address
                    </label>
                    <input
                      type="text"
                      value={settingsForm.cityLocation}
                      onChange={(e) => setSettingsForm({ ...settingsForm, cityLocation: e.target.value })}
                      className="ai-input w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-b border-black/80 font-bold text-xs uppercase tracking-wider text-slate-700">
                  Workforce Compliance Preferences
                </div>

                <div className="p-6 space-y-3">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-black/70 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Mandatory Police & PSARA Verification</div>
                      <div className="text-[11px] text-slate-500">Only match personnel with verified criminal record clearance.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.policeClearanceOnly}
                      onChange={(e) => setSettingsForm({ ...settingsForm, policeClearanceOnly: e.target.checked })}
                      className="w-4 h-4 accent-[#0B3C5D] rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-black/70 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Auto-Disburse Escrow on Biometric Check-Out</div>
                      <div className="text-[11px] text-slate-500">Disburse wage directly to worker UPI upon verified shift completion.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.autoEscrowRelease}
                      onChange={(e) => setSettingsForm({ ...settingsForm, autoEscrowRelease: e.target.checked })}
                      className="w-4 h-4 accent-[#0B3C5D] rounded"
                    />
                  </label>
                </div>

                <div className="p-4 bg-slate-50 border-t border-black/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">KYC Audit: Cleared</span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#0B3C5D] hover:bg-[#082e47] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border border-black shadow-glow transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </main>
      </div>

    </div>
  );
}
