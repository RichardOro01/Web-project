import TableData from "@/components/commons/tables/TableData";
import { Brand } from "@/interfaces/Brand";
import brandService from "@/services/brands";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Brand> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Seats",
    dataIndex: "seats",
    key: "seats",
  },
  {
    title: "Fuel Type",
    dataIndex: "fuel",
    key: "fuel",
  },
  {
    title: "Spending",
    dataIndex: "spending",
    key: "spending",
  },
];

const BrandPage = async () => {
  const brands = await brandService.get();
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData title="Brands" modal="brands" data={brands} {...{ columns }} />
    </main>
  );
};

export default BrandPage;
