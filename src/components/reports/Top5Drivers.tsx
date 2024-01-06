"use client";

import { Top5Driver} from "@/interfaces/Top5Driver";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React from "react";

interface Top5DriversProps {
  columns: ColumnsType<Top5Driver>;
  data: Top5Driver[];
}

const Top5Drivers: React.FC<Top5DriversProps> = ({ columns, data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col">
        <Title>{"Top Drivers"}</Title>
        <Table columns={columns} dataSource={data} />
        <footer className="flex justify-end gap-2">
          <Button onClick={() => downloadPDF(mapData(data,columns), columns, "Top 5 Drivers")}>
            Download PDF
          </Button>
          <Button onClick={() => router.push("/", { scroll: false })}>
            Back
          </Button>
        </footer>
      </div>
      
    </>
  );
};

export default Top5Drivers;