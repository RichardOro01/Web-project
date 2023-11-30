import { Month } from "../Month";

export const monthTableAdapter = (months: Month[]): TableDataType<Month>[] => {
  return months.map((month) => ({
    ...month,
    key: month.month_code
  }));
};

export const monthFormAdapter = (
  month: Month
): FormDataType<Month> => ({
  month_code: month.month_code.toString(),
  report_code: month.report_code?.toString() ?? "",
});

export const monthTypesAdapter = (
  month: FormDataType<Month>
): Month => ({
  month_code: new Date(month.month_code),
  report_code: parseInt(month.report_code),
});

export const monthCreateAdapter = (
  month: Month): Month => ({
  month_code: new Date(month.month_code),
  report_code: month.report_code
});