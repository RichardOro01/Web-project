import TableData from "@/components/commons/tables/TableData";
import { Contract } from "@/interfaces/Contract";
import contractService from "@/services/contracts";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Contract> = [
  {
    title: "Applicant",
    dataIndex: "applicant",
    key: "applicant",
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
    title: "Kms",
    dataIndex: "kms",
    key: "kms",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Fleet number",
    dataIndex: "fleet_number",
    key: "fleet_number",
  },
];

const ContractPage = async () => {
  let contracts: Contract[] = [];
  try {
    contracts = await contractService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Contracts"
        modal="contracts"
        data={contracts}
        {...{ columns }}
      />
    </main>
  );
};

export default ContractPage;
