import TableData from "@/components/commons/tables/TableData";
import { Contract } from "@/interfaces/Contract";
import { contractTableAdapter } from "@/interfaces/adapters/ContractAdapter";
import contractService from "@/services/tables/contracts";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Contract> = [
  {
    title: "Applicant",
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
    title: "Kms",
    dataIndex: "contract_kms",
    key: "contract_kms",
  },
  {
    title: "Amount",
    dataIndex: "contract_amount",
    key: "contract_amount",
  },
  {
    title: "Country",
    dataIndex: "country_name",
    key: "country_name",
  },
  {
    title: "Plate",
    dataIndex: "plate",
    key: "plate",
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
        Data={contracts}
        dataToShow={contractTableAdapter(contracts)}
        {...{ columns }}
      />
    </main>
  );
};

export default ContractPage;
