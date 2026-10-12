import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from './components/LoginScreen';
import OnboardingScreen from './components/OnboardingScreen';
import EmptyDashboard from './components/EmptyDashboard';
import ModernJobPostModal from './components/ModernJobPostModal';

export default function EmployerApp({ onSwitchToPartner, initialScreen = 'dashboard' }) {
  // Screen Stage: 'login' | 'onboarding' | 'dashboard'
  const [currentScreen, setCurrentScreen] = useState(initialScreen);

  // Business profile state populated through the user journey
  const [businessProfile, setBusinessProfile] = useState({
    businessName: 'Grand Horizon Hospitality',
    businessType: 'Hotel/Restaurant',
    cityLocation: 'Cyber Hub, Sector 24, Gurugram',
    gstin: '07AAAAA1234A1Z5',
    contactName: 'Rajesh Verma (General Manager)',
    email: 'admin@grandhorizon.com'
  });

  // Modal State for Post Job
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  // Posted Jobs state created during session
  const [postedJobs, setPostedJobs] = useState([]);

  // Toast / notification banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Screen 1: Login completed -> Go to Screen 2 (Onboarding)
  const handleLoginComplete = (userData) => {
    setBusinessProfile(prev => ({
      ...prev,
      businessName: userData.companyName || prev.businessName,
      email: userData.email || prev.email
    }));
    setCurrentScreen('onboarding');
  };

  // Screen 2: Onboarding completed -> Go to Screen 3 (Empty State Dashboard)
  const handleOnboardingComplete = (onboardingData) => {
    setBusinessProfile(prev => ({
      ...prev,
      ...onboardingData
    }));
    setCurrentScreen('dashboard');
    showToast('Business Profile & KYC Activated! Welcome to Demand O.');
  };

  // Job created from Empty Dashboard
  const handleJobCreated = (job) => {
    const newJob = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      ...job,
      createdAt: 'Just now',
      status: 'Broadcast Active'
    };
    setPostedJobs(prev => [newJob, ...prev]);
    showToast(`Job Broadcasted: "${job.title}" (${job.category}) • 0% Fee applied`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0B3C5D] selection:text-white relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 right-5 z-50 bg-[#0B3C5D] text-white border border-black/80 px-4 py-3 rounded-2xl shadow-glow-lg flex items-center gap-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D26A] animate-ping" />
            <span className="text-xs font-bold">{toastMessage}</span>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-blue-200 hover:text-white text-xs font-mono ml-2"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Developer Screen Navigator (handy for building backend) */}
      <div className="fixed bottom-4 right-4 z-40 bg-white/90 backdrop-blur-md border border-black/80 rounded-2xl p-1.5 shadow-card flex items-center gap-1 text-[11px] font-bold">
        <span className="px-2 text-slate-400 font-mono hidden sm:inline">Stage:</span>
        <button
          onClick={() => setCurrentScreen('login')}
          className={`px-2.5 py-1 rounded-xl transition-all ${
            currentScreen === 'login'
              ? 'bg-[#0B3C5D] text-white shadow-sm'
              : 'text-slate-600 hover:text-black hover:bg-slate-100'
          }`}
        >
          1. Login
        </button>
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className={`px-2.5 py-1 rounded-xl transition-all ${
            currentScreen === 'onboarding'
              ? 'bg-[#0B3C5D] text-white shadow-sm'
              : 'text-slate-600 hover:text-black hover:bg-slate-100'
          }`}
        >
          2. Onboarding
        </button>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className={`px-2.5 py-1 rounded-xl transition-all ${
            currentScreen === 'dashboard'
              ? 'bg-[#0B3C5D] text-white shadow-sm'
              : 'text-slate-600 hover:text-black hover:bg-slate-100'
          }`}
        >
          3. Empty Dashboard
        </button>
        {onSwitchToPartner && (
          <button
            onClick={onSwitchToPartner}
            className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition-all flex items-center gap-1 shadow-sm ml-1"
            title="Switch to Worker / Partner Portal"
          >
            <span>👷 Partner App</span>
          </button>
        )}
      </div>

      {/* Main Screen Router with Framer Motion Seamless Transitions */}
      {currentScreen === 'login' && (
        <motion.div
          key="screen-login"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <LoginScreen 
            onCompleteLogin={handleLoginComplete} 
          />
        </motion.div>
      )}

      {currentScreen === 'onboarding' && (
        <motion.div
          key="screen-onboarding"
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <OnboardingScreen
            userInitialData={businessProfile}
            onCompleteOnboarding={handleOnboardingComplete}
          />
        </motion.div>
      )}

      {currentScreen === 'dashboard' && (
        <motion.div
          key="screen-dashboard"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <EmptyDashboard
            businessProfile={businessProfile}
            setBusinessProfile={setBusinessProfile}
            postedJobs={postedJobs}
            onOpenPostJobModal={() => setIsPostJobModalOpen(true)}
            onResetJourney={() => setCurrentScreen('login')}
            onShowToast={showToast}
            onSwitchToPartner={onSwitchToPartner}
          />
        </motion.div>
      )}

      {/* Modern Stepped "+ Post Your First Job" Modal */}
      <ModernJobPostModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        businessProfile={businessProfile}
        onJobCreated={handleJobCreated}
      />

    </div>
  );
}
