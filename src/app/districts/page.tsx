import TableData from "@/components/commons/tables/TableData";
import { District } from "@/interfaces/District";
import { districtTableAdapter } from "@/interfaces/adapters/DistrictAdapter";
import districtService from "@/services/tables/districts";
import { ColumnsType } from "antd/es/table";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const roles = [1]

const columns: ColumnsType<District> = [
  {
    title: "District name",
    dataIndex: "district_name",
    key: "district_name",
  },
];

const DistrictPage = async () => {
  const session = await getServerSession(authOptions)
  const rol = session?.role_code
  if (rol&&!roles.includes(rol)) {
    return redirect("/");
  }
  let districts: District[] = [];
  try {
    districts = await districtService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Districts"
        modal="districts"
        Data={districts}
        dataToShow={districtTableAdapter(districts)}
        {...{ columns }}
      />
    </main>
  );
};

export default DistrictPage;
