import { Month } from "./Month";
import { TableData } from "./TableData";

export interface Discrepancy extends TableData {
  month: Month;
  fleet_number: number;
  planned_kms: number;
  tours_kms: number;
  difference_kms: number;
  planned_fuel: number;
  consumed_fuel : number;
  dif_spending_fuel : number;
}
