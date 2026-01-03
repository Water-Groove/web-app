import ReportClient from "../_components/ReportClient";

const Reports = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchP = await searchParams;
  console.log(searchP);
  return (
    <div className="">
      <ReportClient />
    </div>
  );
};

export default Reports;
