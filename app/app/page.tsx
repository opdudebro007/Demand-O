'use client';

import React from 'react';
import DemandOMarketplace from '@/src/components/DemandOMarketplace';

export default function AppDashboardPage() {
  return (
    <DemandOMarketplace 
      initialPortal="employer" 
      initialPartnerScreen={1} 
      initialEmployerScreen="dashboard" 
    />
  );
}
