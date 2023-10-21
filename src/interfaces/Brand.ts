import { Fuel } from "./Fuel";
import { TableData } from "./TableData";

export interface Brand extends TableData {
  name: string;
  seats: number;
  fuel: Fuel;
  spending: number;
}
