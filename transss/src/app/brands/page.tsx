"use client";

import BrandModal from "@/components/modals/services/BrandModal";
import { Brand } from "@/interfaces/Brand";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
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

  const hideModal = () => {
    setModal(false);
  };
  return (
    <main className="flex flex-col gap-8 p-5">
      <Title>Brands</Title>
      <Table {...{ columns }} />

      <footer>
        <Button onClick={() => setModal(true)}>Insertar</Button>
      </footer>
      {modal && <BrandModal {...{ hideModal }} />}
    </main>
  );
};

export default BrandPage;
