import TableData from "@/components/commons/tables/TableData";
import { Fuel } from "@/interfaces/Fuel";
import { fuelTableAdapter } from "@/interfaces/adapters/FuelAdapter";
import fuelService from "@/services/tables/fuels";
import { ColumnsType } from "antd/es/table";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const roles = [1]

const columns: ColumnsType<Fuel> = [
  {
    title: "Fuel name",
    dataIndex: "fuel_name",
    key: "fuel_name",
  },
];

const FuelPage = async () => {
  const session = await getServerSession(authOptions)
  const rol = session?.role_code
  if (rol&&!roles.includes(rol)) {
    return redirect("/");
  }
  let fuels: Fuel[] = [];
  try {
    fuels = await fuelService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Fuels"
        modal="fuels"
        Data={fuels}
        dataToShow={fuelTableAdapter(fuels)}
        {...{ columns }}
      />
    </main>
  );
};

export default FuelPage;
