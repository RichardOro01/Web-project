import { Brand } from "./Brand";
import { Couple } from "./Couple";

export interface Car {
    car_code: number;
    plate: string|null;
    brand?: Brand;
    couple?: Couple;
  }

  export interface EditCar extends Omit<Car,'couple' & 'brand'> {
    couple_code?:number;
    brand_code?:number;
  }
  
  export interface CreateCar extends Omit<EditCar, 'car_code'> {
    fleet_number?:number;
  }