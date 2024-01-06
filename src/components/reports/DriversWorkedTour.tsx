"use client";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { DriverWorkedTourGroup } from "@/interfaces/DriverWorkedTourGroup";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React from "react";
import { Tourist } from "@/interfaces/TourGroup";
import { touristOptionsAdapter } from "@/interfaces/adapters/TouristAdapter";
import { reportsService } from "@/services/reports";

interface DriversWorkedTourProps {
  columns: ColumnsType<DriverWorkedTourGroup>;
  data: DriverWorkedTourGroup[];
  groups: Tourist[];
}

const DriversWorkedTour: React.FC<DriversWorkedTourProps> = ({
  columns,
  groups,
  data,
}) => {
  const router = useRouter();
  const initialGroup = groups.length > 0 ? groups[0].group_code : "";
  const [selectedGroup, setSelectedGroup] = useState(initialGroup);
  const [loading, setLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState(data);

  const updateDataToShow = async () => {
    setLoading(true);
    try {
      const data = await reportsService.getDriversWorkedGroupTour(
        selectedGroup
      );
      const booleanToString = data.map((item: DriverWorkedTourGroup )=>({
        key: item.driver_name,
        ...item,
        is_free_cover: item.is_free_cover ? 'true' : 'false'
      }));
      setDataToShow(booleanToString);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateDataToShow();
  }, [selectedGroup]);

  return (
    <>
      <div className="flex flex-col">
        <Title>{"Drivers worked tour group"}</Title>
        <Select
          placeholder="Select Toursit Group"
          style={{ width: 200, marginBottom: 16 }}
          onChange={setSelectedGroup}
          options={touristOptionsAdapter(groups)}
          value={selectedGroup}
        />
        <Table loading={loading} columns={columns} dataSource={dataToShow} />
        <footer className="flex justify-end gap-2">
          <Button
            onClick={() =>
              downloadPDF(
                mapData(data, columns),
                columns,
                "Drivers worked tour group"
              )
            }
          >
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

export default DriversWorkedTour;
