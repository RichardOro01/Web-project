import DriversWorkedTour from "@/components/reports/DriversWorkedTour";
import { DriverWorkedTourGroup } from "@/interfaces/DriverWorkedTourGroup";
import { Tourist } from "@/interfaces/TourGroup";
import prisma from "@/lib/prisma";
import { reportsService } from "@/services/reports";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<DriverWorkedTourGroup> = [
  {
    title: "Driver ID",
    dataIndex: "id_driver",
    key: "id_driver",
  },
  {
    title: "Driver name",
    dataIndex: "driver_name",
    key: "driver_name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "District name",
    dataIndex: "district_name",
    key: "district_name",
  },
  {
    title: "Free cover",
    dataIndex: "is_free_cover",
    key: "is_free_cover",
  },
];
const DriverWorkedTourPage = async () => {
  let groups: Tourist[] = [];
  let data: DriverWorkedTourGroup[] = [];

  try {
    groups = await prisma.tourist_group.findMany();
    if (groups.length > 0)
      data = await reportsService.getDriversWorkedGroupTour(
        groups[0].group_code
      );
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col gap-8 p-5">
      <DriversWorkedTour columns={columns} groups={groups} data={data} />
    </main>
  );
};

export default DriverWorkedTourPage;
