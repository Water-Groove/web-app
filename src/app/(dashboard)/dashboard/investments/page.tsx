import { Metadata } from "next";
import { getInvestments } from "@/services/client/r.service";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import InvestmentClient from "../_components/InvestmentClient";

export const metadata: Metadata = {
  title: "Transactions | WG",
  description: "View and manage your transaction history",
};

const Transactions = async () => {

  const {user} = await resolveServerAuth();
  const res = await getInvestments(user.id);

  const data = res?.data ?? []

  return (
    <div className="">
      <InvestmentClient investments={data} />
    </div>
  );
};

export default Transactions;
