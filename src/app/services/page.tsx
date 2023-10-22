import TableData from "@/components/commons/tables/TableData";
import { ServiceApp } from "@/interfaces/Service";
import serviceAppService from "@/services/servicesApp";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<ServiceApp> = [
  {
    title: "Request number",
    dataIndex: "request_number",
    key: "request_number",
  },
  {
    title: "Service name",
    dataIndex: "service_name",
    key: "service_name",
  },
  {
    title: "Tour group",
    dataIndex: "tour_group",
    key: "tour_group",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Pickup place",
    dataIndex: "pickup_place",
    key: "pickup_place",
  },
  {
    title: "Pax",
    dataIndex: "pax",
    key: "pax",
  },
  {
    title: "Service(km)",
    dataIndex: "service_kms",
    key: "service_kms",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const ServicePage = async () => {
  let services: ServiceApp[] = [];
  try {
    services = await serviceAppService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Services"
        modal="services"
        data={services}
        {...{ columns }}
      />
    </main>
  );
};

export default ServicePage;
