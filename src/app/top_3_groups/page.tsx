import Top3Groups from "@/components/reports/Top3Groups";
import { Top3Group } from "@/interfaces/Top3Group";
import prisma from "@/lib/prisma";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Top3Group> = [
  {
    title: "Group name",
    dataIndex: "group_name",
    key: "group_name",
  },
  {
    title: "Activity count",
    dataIndex: "activity_count",
    key: "activity_count",
  },
];
const top3GroupPage = async () => {
  let data: Top3Group[] = [];
  try {
    data =
      await prisma.$queryRaw`SELECT * FROM top_3_tour_groups_by_activity_count()`;
    data = data.map((item) => ({
      ...item,
      activity_count: Number(item.activity_count),
      key: item.group_name,
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col gap-8 p-5">
      <Top3Groups {...{ data, columns }} />;
    </main>
  );
};
export default top3GroupPage;
