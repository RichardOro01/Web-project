import { Country } from "./Country";
export interface Contract {
  applicant: string;
  start_date: Date;
  end_date: Date;
  kms: string;
  amount: number;
  country: Country;
  fleet_number: string;
}
