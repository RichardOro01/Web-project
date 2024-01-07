"use client";
import { DatePicker, Select} from "antd";
import { useEffect, useState } from "react";
import { TouristGroupActivity } from "@/interfaces/TouristGroupActivity";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React from "react"; "@/interfaces/adapters/TouristAdapter";
import { reportsService } from "@/services/reports";
import dayjs, { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import { Tourist } from "@/interfaces/TourGroup";
import { touristOptionsAdapter } from "@/interfaces/adapters/TouristAdapter";

interface TouristGroupActivitiesProps {
  columns: ColumnsType<TouristGroupActivity>;
  data: TouristGroupActivity[];
  groups: Tourist[];
}

const TouristGroupActivities: React.FC<TouristGroupActivitiesProps> = ({
  columns,
  groups,
  data,
}) => {
  const router = useRouter();
  const initialGroup = groups.length > 0 ? groups[0].group_code : "";
  const [selectedGroup, setSelectedGroup] = useState(initialGroup);
  const [loading, setLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState<TouristGroupActivity[]>([]);
  const [dateRange, setDateRange] = useState<RangeValue<Dayjs>>([null, null]);


  const updateDataToShow = async () => {
    setLoading(true);
    try {
        if(dateRange && dateRange[0] && dateRange[1]){
            const start_date: string = dateRange[0].format("YYYY-MM-DD")
            const end_date: string = dateRange[1].format("YYYY-MM-DD")

            const data = await reportsService.getTouristGroupActivities(start_date, end_date,selectedGroup);
            const formatDateToHHMM = data.map((item: TouristGroupActivity)=>({
                ...item,
                pickup_time: item.pickup_time ? dayjs(item.pickup_time).format("HH:mm") : null,
            }));
            setDataToShow(formatDateToHHMM);
        };
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    updateDataToShow();
  }, [dateRange]);

  useEffect(() => {
    updateDataToShow();
  }, [selectedGroup]);

  return (
    <>
      <div className="flex flex-col">
        <Title>{("Tourist group activities")}</Title>
        <DatePicker.RangePicker 
            onChange={(dates) => setDateRange(dates as RangeValue<Dayjs>)}
            value={dateRange}
        />
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
                "Tourist group activities"
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

export default TouristGroupActivities;