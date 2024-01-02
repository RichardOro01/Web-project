"use client";

import { Top3Country } from "@/interfaces/Top3Country";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import router, { useRouter } from "next/router";
import React from "react";

interface Top3CountriesProps {
  columns: ColumnsType<Top3Country>;
  data: Top3Country[];
}

const Top3Countries: React.FC<Top3CountriesProps> = ({ columns, data }) => {
  return (
    <>
      <div className="flex flex-col">
        <Title>{"Top Countries"}</Title>
        <Table columns={columns} dataSource={data} />
        <footer className="flex justify-end gap-2">
          <Button onClick={() => downloadPDF(mapData(data,columns), columns, "Top")}>
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

export default Top3Countries;