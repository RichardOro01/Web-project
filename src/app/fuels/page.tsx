import TableData from "@/components/commons/tables/TableData";
import { Fuel } from "@/interfaces/Fuel";
import fuelService from "@/services/tables/fuels";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Fuel> = [
  {
    title: "Fuel name",
    dataIndex: "fuel_name",
    key: "fuel_name",
  },
];

const FuelPage = async () => {
  let fuels: Fuel[] = [];
  try {
    fuels = await fuelService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData title="Fuels" modal="fuels" data={fuels} {...{ columns }} />
    </main>
  );
};

export default FuelPage;
