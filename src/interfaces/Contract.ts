import { Car } from "./Car";
import { Country } from "./Country";
export interface Contract {
  contract_code: number;
  applicant_name: string | null;
  start_date: Date | null;
  end_date: Date | null;
  contract_kms: number | null;
  contract_amount: number | null;
  country?: Country;
  car?: Car;
}

export interface EditContract
  extends Omit<Contract, "country" | "plate" | "end_date" | "start_date"> {
  country_code?: string;
  car_code?: number;
  start_date?: string | null;
  end_date?: string | null;
}
export interface CreateContract extends Omit<Contract, "contract_code"> {}
