"use client";

import { Top3Group } from "@/interfaces/Top3Group";
import { handleDownloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import router, { useRouter } from "next/router";
import React from "react";

interface Top3GroupsProps {
  columns: ColumnsType<Top3Group>;
  data: Top3Group[];
}

const Top3Groups: React.FC<Top3GroupsProps> = ({ columns, data }) => {
  return (
    <>
      <div className="flex flex-col">
        <Title>{"Top Groups"}</Title>
        <Table columns={columns} dataSource={data} />
        <footer className="flex justify-end gap-2">
          <Button onClick={() => handleDownloadPDF(mapData(data,columns), columns, "Top")}>
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
