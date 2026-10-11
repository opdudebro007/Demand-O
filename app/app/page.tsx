'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EmptyDashboard from '@/src/employer/components/EmptyDashboard';
import ModernJobPostModal from '@/src/employer/components/ModernJobPostModal';
import { AnimatePresence, motion } from 'framer-motion';

export default function AppDashboardPage() {
  const router = useRouter();

  // Business profile state
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
  const [postedJobs, setPostedJobs] = useState<any[]>([]);

  // Toast / notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Job created from Empty Dashboard
  const handleJobCreated = (job: any) => {
    const newJob = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      ...job,
      createdAt: 'Just now',
      status: 'Broadcast Active'
    };
    setPostedJobs(prev => [newJob, ...prev]);
    showToast(`Job Broadcasted: "${job.title}" (${job.category || job.selectedService}) • 0% Fee applied`);
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

      {/* Top Breadcrumb Navigation Bar */}
      <div className="bg-[#07263b] text-white px-4 py-2 text-xs border-b border-black flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-amber-400 hover:underline">
            Demand O Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-200 font-medium">B2B Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-slate-300 hover:text-white text-xs font-bold underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>

      {/* B2B Empty State Dashboard with Sidebar & "+ Post Your First Job" */}
      <EmptyDashboard
        businessProfile={businessProfile}
        setBusinessProfile={setBusinessProfile}
        postedJobs={postedJobs}
        onOpenPostJobModal={() => setIsPostJobModalOpen(true)}
        onResetJourney={() => router.push('/login')}
        onShowToast={showToast}
        onSwitchToPartner={() => router.push('/')}
      />

      {/* Stepped Post Job Modal */}
      <ModernJobPostModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        businessProfile={businessProfile}
        onJobCreated={handleJobCreated}
      />
    </div>
  );
}
