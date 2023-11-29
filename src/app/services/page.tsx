import TableData from "@/components/commons/tables/TableData";
import { ServiceI } from "@/interfaces/Service";
import { serviceTableAdapter } from "@/interfaces/adapters/ServiceAdapter";
import servicesAppService from "@/services/tables/services";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<ServiceI> = [
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
    dataIndex: "group_name",
    key: "group_name",
  },
  {
    title: "Country",
    dataIndex: "country_name",
    key: "country_name",
  },
  {
    title: "Pickup place",
    dataIndex: "pickup_place",
    key: "pickup_place",
  },
  {
    title: "Pickup time",
    dataIndex: "pickup_time",
    key: "pickup_time",
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
  let services: ServiceI[] = [];
  try {
    services = await servicesAppService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Services"
        modal="services"
        data={services}
        dataToShow={serviceTableAdapter(services)}
        {...{ columns }}
      />
    </main>
  );
};

export default ServicePage;
