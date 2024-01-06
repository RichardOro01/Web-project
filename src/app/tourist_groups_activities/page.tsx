import TouristGroupActivities from "@/components/reports/TouristGroupActivities";
import { Tourist } from "@/interfaces/TourGroup";
import { TouristGroupActivity } from "@/interfaces/TouristGroupActivity";
import prisma from "@/lib/prisma";
import { reportsService } from "@/services/reports";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<TouristGroupActivity> = [
  {
    title: "Service name",
    dataIndex: "service_name",
    key: "service_name",
  },
  {
    title: "Country name",
    dataIndex: "country_name",
    key: "country_name",
  },
  {
    title: "Pickup place",
    dataIndex: "pickup_place",
    key: "pickup_place",
  },
  {
    title: "Pickup time",
    dataIndex: "pickup_time",
    key: "pickup_time",
  },
  {
    title: "Pax",
    dataIndex: "pax",
    key: "pax",
  },
  {
    title: "Service kms",
    dataIndex: "service_kms",
    key: "service_kms",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Request number",
    dataIndex: "request_number",
    key: "request_number",
  },
];
const ContractInPeriodPage = async () => {
  let groups: Tourist[] = [];
  let data: TouristGroupActivity[] = [];

  try {
    groups = await prisma.tourist_group.findMany();
    const startDate = "2023-01-01"
    const endDate = "2023-01-02"
    data = await reportsService.getTouristGroupActivities(startDate,endDate,groups[0].group_code);
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col gap-8 p-5">
      <TouristGroupActivities columns={columns} data={data} groups={groups}/>
    </main>
  );
};

export default ContractInPeriodPage;
