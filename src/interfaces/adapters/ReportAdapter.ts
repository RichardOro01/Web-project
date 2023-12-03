import { Option } from "@/components/commons/forms/InputSelect";
import { Report, CreateReport } from "../Report";

export const reportOptionsAdapter = (reports: Report[]): Option[] =>
  reports.map((report) => ({
    label: report.report_code.toString(),
    value: report.report_code.toString(),
  }));

export const reportTableAdapter = (
  reports: Report[]
): TableDataType<Report>[] => {
  return reports.map((report) => ({
    ...report,
    key: report.report_code,
  }));
};

export const reportFormAdapter = (report: Report): FormDataType<Report> => ({
  report_code: report.report_code.toString(),
  income_others: report.income_others?.toString() ?? "",
  amo_others: report.amo_others?.toString() ?? "",
  income_total: report.income_total?.toString() ?? "",
  income_rents: report.income_rents?.toString() ?? "",
  amo_rents: report.amo_rents?.toString() ?? "",
  amo_services: report.amo_services?.toString() ?? "",
});

export const reportTypesAdapter = (report: FormDataType<Report>): Report => ({
  report_code: parseInt(report.report_code),
  amo_services: parseInt(report.amo_services),
  amo_rents: parseInt(report.amo_rents),
  income_rents: parseFloat(report.income_rents),
  amo_others: parseInt(report.amo_others),
  income_others: parseFloat(report.income_others),
  income_total: parseFloat(report.income_total),
});

export const reportCreateAdapter = (report: Report): CreateReport => ({
  amo_services: report.amo_services,
  amo_rents: report.amo_rents,
  income_rents: report.income_rents,
  amo_others: report.amo_others,
  income_others: report.income_others,
  income_total: report.income_total,
});
