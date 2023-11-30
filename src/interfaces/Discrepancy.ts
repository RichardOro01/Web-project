import { Month } from "./Month";
import { Car } from "./Car"


export interface Discrepancy {
  months: Month;
  planned_kms: number | null;
  tours_kms: number | null;
  difference_kms: number | null;
  planned_fuel: number | null;
  consumed_fuel : number | null;
  dif_spending_fuel : number | null;
  car: Car;
}

export interface EditDiscrepancy extends Omit<Discrepancy, "car" | "months"> {
  car_code?: number;
  month_code?: Date;
}