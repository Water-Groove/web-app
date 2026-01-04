import { Metadata } from 'next';
import ContactClient from '@/app/(root)/_components/ContactClient';

export const metadata: Metadata = {
  title: "Contact Us | WG",
};

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;