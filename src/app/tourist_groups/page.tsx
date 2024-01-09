import TableData from "@/components/commons/tables/TableData";
import { Tourist } from "@/interfaces/TourGroup";
import { touristTableAdapter } from "@/interfaces/adapters/TouristAdapter";
import tourService from "@/services/tables/tour_groups";
import { ColumnsType } from "antd/es/table";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const roles = [1]

const columns: ColumnsType<Tourist> = [
  {
    title: "Tour group name",
    dataIndex: "group_name",
    key: "group_name",
  },
];

const TourPage = async () => {
  const session = await getServerSession(authOptions)
  const rol = session?.role_code
  if (rol&&!roles.includes(rol)) {
    return redirect("/");
  }
  let tourist_groups: Tourist[] = [];
  try {
    tourist_groups = await tourService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Groups"
        modal="tour_groups"
        Data={tourist_groups}
        dataToShow={touristTableAdapter(tourist_groups)}
        {...{ columns }}
      />
    </main>
  );
};

export default TourPage;
