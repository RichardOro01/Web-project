import Top5Drivers from "@/components/reports/Top5Drivers";
import { Top5Driver } from "@/interfaces/Top5Driver";
import prisma from "@/lib/prisma";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Top5Driver> = [
  {
    title: "Id driver",
    dataIndex: "id_driver",
    key: "id_driver",
  },
  {
    title: "Driver name",
    dataIndex: "driver_name",
    key: "driver_name",
  },
  {
    title: "Service count",
    dataIndex: "service_count",
    key: 'service_count',
  },
];
const top5DriverPage = async () => {
  let data: Top5Driver[] = [];
  try {
    data =
      await prisma.$queryRaw`SELECT * FROM top_5_drivers_by_service_count()`;
    console.log(data);
    data = data.map((item) => ({
      ...item,
      service_count: Number(item.service_count),
      key: item.id_driver,
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col gap-8 p-5">
      <Top5Drivers {...{ data, columns }} />;
    </main>
  )
};
export default top5DriverPage;