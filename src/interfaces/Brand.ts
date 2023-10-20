import { Fuel } from "./Fuel";

export interface Brand {
  name: string;
  seats: number;
  fuelType: Fuel;
  spending: number;
}
