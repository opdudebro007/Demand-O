import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Zap, 
  FileCheck, 
  Users, 
  Settings, 
  Percent,
  X,
  Shield,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  onOpenPostJobModal,
  onOpenZeroCommissionModal,
  isOpenMobile, 
  onCloseMobile,
  activeRequestsCount = 5,
  contractsCount = 4
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'post-job',
      label: 'Post a Job',
      icon: PlusCircle,
      badge: 'Fast',
      action: () => onOpenPostJobModal()
    },
    {
      id: 'instant-help',
      label: 'Instant Help',
      icon: Zap,
      badge: '15m Radar',
      pulseBadge: true
    },
    {
      id: 'my-contracts',
      label: 'My Contracts',
      icon: FileCheck,
      badge: `${contractsCount}`
    },
    {
      id: 'worker-suggestions',
      label: 'Worker Suggestions',
      icon: Users,
      badge: 'AI Match'
    },
    {
      id: 'settings',
      label: 'Settings & Billing',
      icon: Settings,
      badge: null
    }
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setCurrentTab(item.id);
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-[#0A2342] text-white flex flex-col justify-between border-r-2 border-black transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b-2 border-black flex items-center justify-between bg-[#07192f]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white text-[#0A2342] rounded-lg border-2 border-black flex items-center justify-center font-black text-xl shadow-brutal-sm">
                <span>D</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg tracking-tight text-white">Demand O</span>
                  <span className="px-1.5 py-0.2 bg-[#00D26A] text-slate-950 font-black text-[10px] tracking-wider rounded border border-black uppercase">
                    Hire
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                  Employer Portal
                </span>
              </div>
            </div>

            {/* Close Button on Mobile */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded border border-slate-700 bg-[#0A2342]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3.5 space-y-1.5">
            <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Operations & Hiring
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-sm font-semibold transition-all border ${
                    isActive
                      ? 'bg-white text-[#0A2342] border-black shadow-brutal font-bold translate-x-1'
                      : 'border-transparent text-slate-200 hover:text-white hover:bg-[#0f2d52] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0A2342] stroke-[2.5]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span 
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        item.pulseBadge
                          ? 'bg-amber-400 text-slate-950 font-bold border-black shadow-sm'
                          : isActive
                            ? 'bg-[#0A2342] text-white border-black'
                            : 'bg-[#07192f] text-slate-300 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Widget: Zero Commission Guarantee & Quick Support */}
        <div className="p-4 space-y-3 border-t-2 border-black bg-[#07192f]">
          <div 
            onClick={onOpenZeroCommissionModal}
            className="p-3 bg-[#0B3C5D] border-2 border-black rounded-lg cursor-pointer hover:bg-[#0f476d] transition-all shadow-brutal-sm"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300 uppercase tracking-wider">
                <Percent className="w-3.5 h-3.5" />
                Zero Commission
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-200 leading-snug">
              Employers pay ₹0 platform fees for the first 30 days. Payouts go 100% to workers.
            </p>
            <div className="mt-2 text-[10px] font-mono text-emerald-300 underline font-bold">
              Check Savings Breakdown →
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
            <span>v2.4 Enterprise</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              API Live
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
