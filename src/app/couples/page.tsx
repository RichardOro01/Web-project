import TableData from "@/components/commons/tables/TableData";
import { Couple } from "@/interfaces/Couple";
import { coupleAdapter } from "@/interfaces/adapters/CoupleAdapter";
import coupleService from "@/services/tables/couples";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Couple> = [
  {
    title: "Driver 1",
    dataIndex: "driver1_name",
    key: "driver1_name",
  },
  {
    title: "Driver 2",
    dataIndex: "driver2_name",
    key: "driver2_name",
  },
];

const CouplePage = async () => {
  let couples: Couple[] = [];
  try {
    couples = await coupleService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Couple"
        modal="couples"
        data={couples}
        dataToShow={coupleAdapter(couples)}
        {...{ columns }}
      />
    </main>
  );
};

export default CouplePage;
