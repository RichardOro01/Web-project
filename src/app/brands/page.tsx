import TableData from "@/components/commons/tables/TableData";
import { Brand } from "@/interfaces/Brand";
import brandService from "@/services/tables/brands";
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
  let brands: Brand[] = [];
  try {
    brands = await brandService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData title="Brands" modal="brands" data={brands} {...{ columns }} />
    </main>
  );
};

export default BrandPage;
