"use client";
import { Select } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DriverWorkedTourGroup } from "@/interfaces/DriverWorkedTourGroup";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React from "react";
import { Tourist } from "@/interfaces/TourGroup";
import { touristOptionsAdapter } from "@/interfaces/adapters/TouristAdapter";

interface DriversWorkedTourProps {
  columns: ColumnsType<DriverWorkedTourGroup>;
  data: DriverWorkedTourGroup[];
  groups: Tourist[];
  setSelectedTourGroup: Dispatch<SetStateAction<string>>; 
}

const DriversWorkedTour: React.FC<DriversWorkedTourProps> = ({ columns, groups, data, setSelectedTourGroup }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        <Title>{"Top Countries"}</Title>
        <Select
          placeholder="Select Toursit Group"
          style={{ width: 200, marginBottom: 16 }}
          onChange={setSelectedTourGroup}
          options={touristOptionsAdapter(groups)}
        />
        <Table columns={columns} dataSource={data} />
        <footer className="flex justify-end gap-2">
          <Button onClick={() => downloadPDF(mapData(data, columns), columns, "Drivers worked group tour")}>
            Download PDF
          </Button>
          <Button onClick={() => router.push("/", { scroll: false })}>Back</Button>
        </footer>
      </div>
    </>
  );
};

export default DriversWorkedTour;