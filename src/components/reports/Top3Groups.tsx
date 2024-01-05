"use client";

import { Top3Group } from "@/interfaces/Top3Group";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React from "react";

interface Top3GroupsProps {
  columns: ColumnsType<Top3Group>;
  data: Top3Group[];
}

const Top3Groups: React.FC<Top3GroupsProps> = ({ columns, data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col">
        <Title>{"Top Groups"}</Title>
        <Table columns={columns} dataSource={data} />
        <footer className="flex justify-end gap-2">
          <Button onClick={() => downloadPDF(mapData(data,columns), columns, "Top 3 Tourist Group")}>
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

export default Top3Groups;
