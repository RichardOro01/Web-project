"use client";

import ServiceModal from "@/components/modals/management/ServiceModal";
import { Service } from "@/interfaces/Service";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const columns: ColumnsType<Service> = [
  {
    title: "Request number",
    dataIndex: "requestNumber",
    key: "requestNumber",
  },
  {
    title: "Service name",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Tour group",
    dataIndex: "tourGroup",
    key: "tourGroup",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Pickup place",
    dataIndex: "pickupPlace",
    key: "ampickupPlaceount",
  },
  {
    title: "Pax",
    dataIndex: "pax",
    key: "pax",
  },
  {
    title: "Service(km)",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const ServicePage = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const hideModal = () => {
    setModal(false);
  };
  return (
    <main className="flex flex-col gap-8 p-5">
      <Title>Services</Title>
      <Table {...{ columns }} />

      <footer className="flex justify-end gap-2">
        <Button onClick={() => router.push("/", { scroll: false })}>
          Back
        </Button>
        <Button onClick={() => setModal(true)} type="primary">
          Insert
        </Button>
      </footer>
      {modal && <ServiceModal />}
    </main>
  );
};

export default ServicePage;
