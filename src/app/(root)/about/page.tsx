import React from 'react';
import { Metadata } from 'next';
import AboutClient from '@/app/(root)/_components/AboutClient';

export const metadata: Metadata = {
  title: "About Us | WG",
};

const AboutPage = () => {
  return <AboutClient />;
};

export default AboutPage;