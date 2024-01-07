import TableData from "@/components/commons/tables/TableData";
import { Month } from "@/interfaces/Month";
import { monthTableAdapter } from "@/interfaces/adapters/MonthAdaparter";
import monthService from "@/services/tables/months";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Month> = [
  {
    title: "Month",
    dataIndex: "month_code",
    key: "month_code",
  },
  {
    title: "Report code",
    dataIndex: "report_code",
    key: "report_code",
  },
];

const MonthPage = async () => {
  let months: Month[] = [];
  try {
    months = await monthService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Months"
        modal="months"
        Data={months}
        dataToShow={monthTableAdapter(months)}
        {...{ columns }}
      />
    </main>
  );
};

export default MonthPage;
