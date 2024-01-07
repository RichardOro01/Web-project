import TableData from "@/components/commons/tables/TableData";
import { Brand } from "@/interfaces/Brand";
import { brandTableAdapter } from "@/interfaces/adapters/BrandAdapter";
import brandService from "@/services/tables/brands";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Brand> = [
  {
    title: "Name",
    dataIndex: "brand_name",
    key: "brand_name",
  },
  {
    title: "Seats",
    dataIndex: "amo_seats",
    key: "amo_seats",
  },
  {
    title: "Fuel Type",
    dataIndex: "fuel_name",
    key: "fuel_name",
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
      <TableData
        title="Brands"
        modal="brands"
        Data={brands}
        dataToShow={brandTableAdapter(brands)}
        {...{ columns }}
      />
    </main>
  );
};

export default BrandPage;
