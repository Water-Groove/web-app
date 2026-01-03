import { Metadata } from "next";
import InvestmentDisclaimerClient from './_components/InvestmentDisclaimerClient';

export const metadata: Metadata = {
  title: "Investment Disclaimer | WG",
};
const InvestmentDisclaimer = () => {
  return <InvestmentDisclaimerClient />;
};

export default InvestmentDisclaimer;
