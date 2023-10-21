import { Fuel } from "./Fuel";
import { TableData } from "./TableData";

export interface Brand extends TableData {
  name: string;
  seats: number;
  fuelType: Fuel;
  spending: number;
}
