"use client";

import BrandModal from "@/components/modals/services/BrandModal";
import { Brand } from "@/interfaces/Brand";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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

const BrandPage = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const hideModal = () => {
    setModal(false);
  };
  return (
    <main className="flex flex-col gap-8 p-5">
      <Title>Brands</Title>
      <Table {...{ columns }} />

      <footer className="flex justify-end gap-2">
        <Button onClick={() => router.push("/", { scroll: false })}>
          Back
        </Button>
        <Button onClick={() => setModal(true)} type="primary">
          Insert
        </Button>
      </footer>
      {modal && <BrandModal {...{ hideModal }} />}
    </main>
  );
};

export default BrandPage;
