import { Brand } from "./Brand";
import { Couple } from "./Couple";

export interface Car {
  fleet_number: number;
  plate: string | null;
  brand?: Brand;
  couple?: Couple;
  car_code: number;
}

export interface EditCar extends Omit<Car, "couple" | "brand"> {
  couple_code?: number;
  brand_code?: number;
}

export interface CreateCar extends Omit<EditCar, "car_code"> {
}
