import ContractsInPeriod from "@/components/reports/ContractsInPeriod";
import { ContractInPeriod } from "@/interfaces/ContractsInPeriod";
import { reportsService } from "@/services/reports";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<ContractInPeriod> = [
  {
    title: "Applicant name",
    dataIndex: "applicant_name",
    key: "applicant_name",
  },
  {
    title: "Start date",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "End date",
    dataIndex: "end_date",
    key: "end_date",
  },
  {
    title: "Contract kms",
    dataIndex: "contract_kms",
    key: "contract_kms",
  },
  {
    title: "Contract amount",
    dataIndex: "contract_amount",
    key: "contract_amount",
  },
  {
    title: "Country name",
    dataIndex: "country_name",
    key: "country_name",
  },
  {
    title: "Fleet number",
    dataIndex: "fleet_number",
    key: "fleet_number",
  },
];
const ContractInPeriodPage = async () => {
  let data: ContractInPeriod[] = [];

  try {
    const startDate = "2023-01-01"
    const endDate = "2023-01-02"
      data = await reportsService.getContractsInPeriod(startDate,endDate);
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col gap-8 p-5">
      <ContractsInPeriod columns={columns} data={data} />
    </main>
  );
};

export default ContractInPeriodPage;
