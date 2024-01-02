import Top3Groups from "@/components/reports/Top3Groups";
import { top3Group } from "@/interfaces/Top3Group";
import prisma from "@/lib/prisma";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<top3Group> = [
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
  let data: top3Group[] = [];
  try {
    data =
      await prisma.$queryRaw`SELECT * FROM top_3_tour_groups_by_activity_count()`;
    console.log(data);
    data = data.map((item) => ({
      ...item,
      activity_count: Number(item.activity_count),
      key: item.group_name,
    }));
  } catch (error) {
    console.log(error);
  }

  return <Top3Groups {...{ data, columns }} />;
};
export default top3GroupPage;
