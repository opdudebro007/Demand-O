'use client';

import React from 'react';
import DemandOMarketplace from '@/src/components/DemandOMarketplace';

export default function RootPage() {
  return (
    <DemandOMarketplace 
      initialPortal="partner" 
      initialPartnerScreen={1} 
      initialEmployerScreen="dashboard" 
    />
  );
}
