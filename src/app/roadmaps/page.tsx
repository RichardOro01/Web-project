import TableData from "@/components/commons/tables/TableData";
import { Roadmap } from "@/interfaces/Roadmap";
import roadmapService from "@/services/tables/roadmaps";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Roadmap> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Fleet number",
    dataIndex: "fleet_number",
    key: "fleet_number",
  },
  {
    title: "Kms",
    dataIndex: "kms",
    key: "kms",
  },
  {
    title: "Departure time",
    dataIndex: "departure_time",
    key: "departure_time",
  },
];

const RoadmapPage = async () => {
  let roadmaps: Roadmap[] = [];
  try {
    roadmaps = await roadmapService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData title="Roadmaps" modal="roadmaps" data={roadmaps} {...{ columns }} />
    </main>
  );
};

export default RoadmapPage;
