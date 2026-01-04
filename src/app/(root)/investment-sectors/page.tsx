import React from 'react';
import { Metadata } from 'next';
import InvestmentSectorsClient from '@/app/(root)/_components/InvestmentSectorsClient';

export const metadata: Metadata = {
  title: "Investment Categories | WG",
};

const InvestmentSectorsPage = () => {
  return <InvestmentSectorsClient />;
};

export default InvestmentSectorsPage;