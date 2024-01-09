import Top3Countries from "@/components/reports/Top3Countries";
import { Top3Country } from "@/interfaces/Top3Country";
import prisma from "@/lib/prisma";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Top3Country> = [
  {
    title: "Country name",
    dataIndex: "country_name",
    key: "country_name",
  },
  {
    title: "Services",
    dataIndex: "services",
    key: "services",
  },
];
const top3CountryPage = async () => {
  let data: Top3Country[] = [];
  try {
    data = await prisma.$queryRaw`SELECT * FROM tour_countries()`;
    data = data.map((item) => ({
      ...item,
      services: Number(item.services),
      key: item.country_name,
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col gap-8 p-5">
      <Top3Countries {...{ data, columns }} />;
    </main>
  );
};
export default top3CountryPage;
