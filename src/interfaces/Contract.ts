import { Country } from "./Country";
import { TableData } from "./TableData";
export interface Contract extends TableData {
  applicant: string;
  start_date: Date;
  end_date: Date;
  kms: string;
  amount: number;
  country: Country;
  fleet_number: string;
}
