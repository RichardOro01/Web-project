import TableData from "@/components/commons/tables/TableData";
import { Brand } from "@/interfaces/Brand";
import { Driver } from "@/interfaces/Driver";
import brandService from "@/services/tables/brands";
import driverService from "@/services/tables/drivers";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Driver> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "District name",
    dataIndex: "district_name",
    key: "district_name",
  },
  {
    title: "Is free cover",
    dataIndex: "is_free_cover",
    key: "is_free_cover",
  },
];

const DriverPage = async () => {
  let drivers: Driver[] = [];
  try {
    drivers = await driverService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData title="Drivers" modal="drivers" data={drivers} {...{ columns }} />
    </main>
  );
};

export default DriverPage
