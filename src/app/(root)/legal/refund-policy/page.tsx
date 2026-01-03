import { Metadata } from 'next';
import React from 'react'
import RefundPolicyClient from './_components/RefundPolicyClient';

export const metadata: Metadata = {
  title: 'Refund & Withdrawal Policy'
}
const RefundPolicy = () => {
  return (
    <RefundPolicyClient />
  )
}

export default RefundPolicy