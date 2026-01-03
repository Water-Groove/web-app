import { Metadata } from 'next';
import React from 'react';
import TermsConditionsClient from './_components/TermsConditionsClient';

export const metadata: Metadata ={
  title : 'Terms & Conditions" | WG '
}
const TermsConditions = () => {
  return (
   <TermsConditionsClient />
  )
}

export default TermsConditions;