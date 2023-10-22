"use client";

import ContractModal from "@/components/modals/management/ContractModal";
import { Contract } from "@/interfaces/Contract";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const columns: ColumnsType<Contract> = [
  {
    title: "Applicant",
    dataIndex: "applicant",
    key: "applicant",
  },
  {
    title: "Start date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Kms",
    dataIndex: "ksm",
    key: "kms",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Fleet number",
    dataIndex: "fleetNumber",
    key: "fleetNumber",
  },
];

const ContractPage = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const hideModal = () => {
    setModal(false);
  };
  return (
    <main className="flex flex-col gap-8 p-5">
      <Title>Contracts</Title>
      <Table {...{ columns }} />

      <footer className="flex justify-end gap-2">
        <Button onClick={() => router.push("/", { scroll: false })}>
          Back
        </Button>
        <Button onClick={() => setModal(true)} type="primary">
          Insert
        </Button>
      </footer>
      {modal && <ContractModal />}
    </main>
  );
};

export default ContractPage;
