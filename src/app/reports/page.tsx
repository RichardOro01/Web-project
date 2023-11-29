import TableData from "@/components/commons/tables/TableData";
import { Report } from "@/interfaces/Report";
import { reportAdapter } from "@/interfaces/adapters/ReportAdapter";
import reportService from "@/services/tables/reports";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Report> = [
  {
    title: "Amount services",
    dataIndex: "amo_services",
    key: "amo_services",
  },
  {
    title: "Amount rents",
    dataIndex: "amo_rents",
    key: "amo_rents",
  },
  {
    title: "Income rents",
    dataIndex: "income_rents",
    key: "income_rents",
  },
  {
    title: "Amount others",
    dataIndex: "amo_others",
    key: "amo_others",
  },
  {
    title: "Income others",
    dataIndex: "income_others",
    key: "income_others",
  },
  {
    title: "Income total",
    dataIndex: "income_total",
    key: "income_total",
  },
];

const ReportPage = async () => {
  let reports: Report[] = [];
  try {
    reports = await reportService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Reports"
        modal="reports"
        data={reportAdapter(reports)}
        {...{ columns }}
      />
    </main>
  );
};

export default ReportPage;
