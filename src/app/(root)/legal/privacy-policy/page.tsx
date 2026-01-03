import { Metadata } from 'next';
import React from 'react';
import PrivacyPolicyClient from './_components/PrivacyPolicyClient';

export const metadata: Metadata = {
  title: "Privacy Policy | WG"
}
const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyClient />
  )
}

export default PrivacyPolicy