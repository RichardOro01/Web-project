import TableData from "@/components/commons/tables/TableData";
import { TourGroup } from "@/interfaces/TourGroup";
import tourService from "@/services/tables/tour_groups";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<TourGroup> = [
  {
    title: "Tour group name",
    dataIndex: "tour_name",
    key: "tour_name",
  },
];

const TourPage = async () => {
  let tourist_groups: TourGroup[] = [];
  try {
    tourist_groups = await tourService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Tourist Groups"
        modal="tour_groups"
        data={tourist_groups}
        {...{ columns }}
      />
    </main>
  );
};

export default TourPage;
