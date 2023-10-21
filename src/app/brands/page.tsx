import TableData from "@/components/commons/tables/TableData";
import { Brand } from "@/interfaces/Brand";
import { ColumnsType } from "antd/es/table";
import React from "react";

const requestBrands = async () => {
  const response = await fetch("http://localhost:3000/api/brands", {
    cache: "no-store",
  });
  return await response.json();
};

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
    dataIndex: "fuelType",
    key: "fuelType",
  },
  {
    title: "Spending",
    dataIndex: "spending",
    key: "spending",
  },
];

const BrandPage = async () => {
  const brands = await requestBrands();
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData title="Brands" modal="brand" data={brands} {...{ columns }} />
    </main>
  );
};

export default BrandPage;
