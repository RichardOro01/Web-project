import TableData from "@/components/commons/tables/TableData";
import { Discrepancy } from "@/interfaces/Discrepancy";
import discrepancyService from "@/services/tables/discrepancies";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Discrepancy> = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
  },
  {
    title: "Fleet number",
    dataIndex: "fleet_number",
    key: "fleet_number",
  },
  {
    title: "Planned kms",
    dataIndex: "planned_kms",
    key: "planned_kms",
  },
  {
    title: "Tours kms",
    dataIndex: "tours_kms",
    key: "tours_kms",
  },
  {
    title: "Difference kms",
    dataIndex: "difference_kms",
    key: "difference_kms",
  },
  {
    title: "Planned fuel",
    dataIndex: "planned_fuel",
    key: "planned_fuel",
  },
  {
    title: "Consumed fuel",
    dataIndex: "consumed_fuel",
    key: "consumed_fuel",
  },
  {
    title: "Dif spending fuel",
    dataIndex: "dif_spending_fuel",
    key: "dif_spending_fuel",
  },
];

const DiscrepancyPage = async () => {
  let discrepancies: Discrepancy[] = [];
  try {
    discrepancies = await discrepancyService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData title="Discrepancies" modal="discrepancies" data={discrepancies} {...{ columns }} />
    </main>
  );
};

export default DiscrepancyPage;
