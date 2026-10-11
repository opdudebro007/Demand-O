import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Percent, 
  CheckCircle2, 
  X,
  PlaySquare,
  Building2,
  Menu
} from 'lucide-react';

export default function TopHeader({ 
  currentEmployer, 
  allEmployers, 
  onSelectEmployer, 
  onOpenZeroCommissionModal,
  onOpenPostJobModal,
  onReplaySplash,
  onToggleMobileSidebar,
  searchQuery,
  setSearchQuery
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: '2 Guards applied for Night Shift',
      desc: 'Sunrise Grand Hotel • PSARA cleared • Ready in 20m',
      time: '6m ago',
      unread: true,
      tag: 'Urgent Dispatch'
    },
    {
      id: 2,
      title: 'Zero Commission Saved: ₹2,400',
      desc: 'No platform take-rate charged on Banquets Chef payout.',
      time: '1h ago',
      unread: true,
      tag: 'Offer Active'
    },
    {
      id: 3,
      title: 'Weekly Attendance Cleared',
      desc: 'All 14 active contract staff marked geofence present.',
      time: '4h ago',
      unread: false,
      tag: 'Compliance'
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b-2 border-black px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
      
      {/* Left side: Mobile menu toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded border-brutal bg-slate-50 hover:bg-slate-100 text-black"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar with Industrial Brutalist styling */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workers by trade, shift, verified skill (e.g. 'Driver', 'Chef', 'Guards')..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border-brutal rounded focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:border-black font-medium placeholder:text-slate-400 shadow-brutal-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right side: Zero Commission Hero Button, Notifications, Replay Splash, Persona Switcher */}
      <div className="flex items-center gap-2.5 sm:gap-4 ml-4">
        
        {/* PROMINENT "FIRST 30 DAYS ZERO COMMISSION" BUTTON */}
        <button
          onClick={onOpenZeroCommissionModal}
          className="group relative hidden sm:inline-flex items-center gap-2 px-3.5 py-2 bg-[#00D26A] hover:bg-[#00ba5e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded border-brutal shadow-brutal-sm hover:shadow-brutal transition-all"
        >
          <div className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
          <span className="flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>First 30 Days: Zero Commission</span>
          </span>
          <span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
            ACTIVE
          </span>
        </button>

        {/* Mobile Zero Commission icon button */}
        <button
          onClick={onOpenZeroCommissionModal}
          className="sm:hidden p-2 bg-[#00D26A] text-slate-950 rounded border-brutal font-bold text-xs shadow-brutal-sm"
          title="Zero Commission"
        >
          <Percent className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Replay Splash / Demo button */}
        <button
          onClick={onReplaySplash}
          title="Replay Splash Screen Animation"
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-slate-600 hover:text-black bg-slate-100 hover:bg-slate-200 border-brutal rounded shadow-brutal-sm transition-all"
        >
          <PlaySquare className="w-3.5 h-3.5" />
          <span>Intro</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowEmployerDropdown(false);
              if (unreadCount > 0) setUnreadCount(0);
            }}
            className="relative p-2 rounded border-brutal bg-white hover:bg-slate-50 shadow-brutal-sm transition-all"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-slate-800" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border border-black animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-brutal-2 rounded-lg shadow-brutal-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 bg-[#0A2342] text-white flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm">Notifications & Alerts</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Real-Time
                </span>
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs text-slate-900">{item.title}</div>
                      <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 border border-black rounded text-slate-800">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-bold text-[#0A2342] hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Employer Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowEmployerDropdown(!showEmployerDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 bg-white hover:bg-slate-50 border-brutal rounded shadow-brutal-sm transition-all"
          >
            <div className="w-8 h-8 rounded bg-[#0A2342] text-white flex items-center justify-center font-bold text-base border border-black shadow-sm">
              <span>{currentEmployer.avatar}</span>
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                {currentEmployer.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {currentEmployer.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-600 ml-1" />
          </button>

          {/* Persona Selection Menu */}
          {showEmployerDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white border-brutal-2 rounded-lg shadow-brutal-lg z-50 overflow-hidden">
              <div className="p-3 bg-[#F4F7FB] border-b-2 border-black">
                <p className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Switch Business Profile
                </p>
                <p className="text-[11px] text-slate-500">
                  Simulate different B2B employers & facilities
                </p>
              </div>

              <div className="p-1 space-y-1">
                {allEmployers.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => {
                      onSelectEmployer(emp);
                      setShowEmployerDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded text-left transition-all ${
                      currentEmployer.id === emp.id 
                        ? 'bg-[#0A2342] text-white border border-black' 
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="text-xl p-1 bg-white/20 rounded border border-black/20">
                      {emp.avatar}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{emp.name}</div>
                      <div className={`text-[10px] ${currentEmployer.id === emp.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {emp.type} • {emp.activeContracts} active workers
                      </div>
                    </div>
                    {currentEmployer.id === emp.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
