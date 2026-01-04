import React from 'react';
import { Metadata } from 'next';
import HowItWorksClient from '@/app/(root)/_components/HowItWorksClient';

export const metadata: Metadata = {
  title: "How It Works | WG",
};

const HowItWorksPage = () => {
  return <HowItWorksClient />;
};

export default HowItWorksPage;