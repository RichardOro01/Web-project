import DriversWorkedTour from "@/components/reports/DriversWorkedTour";
import { DriverWorkedTourGroup } from "@/interfaces/DriverWorkedTourGroup";
import { Tourist } from "@/interfaces/TourGroup";
import prisma from "@/lib/prisma";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

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
    const [selectedTourGroup, setSelectedTourGroup] = useState('')
    let groups: Tourist[] = [];
    let data: DriverWorkedTourGroup[] = [];
  
    try {
      groups = await prisma.tourist_group.findMany();
      data = await prisma.$queryRaw`SELECT * FROM drivers_worked_tour_group(${selectedTourGroup})`;
    } catch (error) {
      console.log(error);
    }
  
    return (
      <main className="flex flex-col gap-8 p-5">
        <DriversWorkedTour columns={columns} groups={groups} data={data} setSelectedTourGroup = {setSelectedTourGroup} />
      </main>
    );
  };
  
  export default DriverWorkedTourPage;