export interface Report {
  report_code: number;
  amo_services: number | null;
  amo_rents: number | null;
  income_rents: number | null;
  amo_others: number | null;
  income_others: number | null;
  income_total: number | null;
}

export interface CreateReport extends Omit<Report, "report_code"> {}
