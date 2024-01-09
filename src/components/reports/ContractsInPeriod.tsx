"use client";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { ContractInPeriod } from "@/interfaces/ContractsInPeriod";
import { downloadPDF, mapData } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React from "react";
("@/interfaces/adapters/TouristAdapter");
import { reportsService } from "@/services/reports";
import dayjs, { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";

interface ContractsInPeriodProps {
  columns: ColumnsType<ContractInPeriod>;
  data: ContractInPeriod[];
}

const ContractsInPeriod: React.FC<ContractsInPeriodProps> = ({
  columns,
  data,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState<ContractInPeriod[]>([]);
  const [dateRange, setDateRange] = useState<RangeValue<Dayjs>>([null, null]);

  const updateDataToShow = async () => {
    setLoading(true);
    try {
      if (dateRange && dateRange[0] && dateRange[1]) {
        const start_date: string = dateRange[0].format("YYYY-MM-DD");
        const end_date: string = dateRange[1].format("YYYY-MM-DD");
        const data = await reportsService.getContractsInPeriod(
          start_date,
          end_date
        );
        const formatDateToString = data.map((item: ContractInPeriod) => ({
          ...item,
          start_date: item.start_date
            ? dayjs(item.start_date).format("YYYY-MM-DD")
            : null,
          end_date: item.end_date
            ? dayjs(item.end_date).format("YYYY-MM-DD")
            : null,
        }));
        setDataToShow(formatDateToString);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateDataToShow();
  }, [dateRange]);

  return (
    <>
      <div className="flex flex-col">
        <Title>{"Contracts in period"}</Title>
        <DatePicker.RangePicker
          onChange={(dates) => setDateRange(dates as RangeValue<Dayjs>)}
          value={dateRange}
        />
        <Table loading={loading} columns={columns} dataSource={dataToShow} />
        <footer className="flex justify-end gap-2">
          <Button
            onClick={() =>
              downloadPDF(
                mapData(data, columns),
                columns,
                "Contracts in period"
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

export default ContractsInPeriod;
