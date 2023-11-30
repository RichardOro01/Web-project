import { Brand } from "./Brand";
import { Couple } from "./Couple";

export interface Car {
    number: number;
    plate: string|null;
    brand?: Brand;
    couple?: Couple;
  }

  export interface EditCar extends Omit<Car,'couple' & 'brand'> {
    fleet_number?:number;
    couple_code?:number;
    brand_code?:number;
  }
  
  export interface CreateCar extends Omit<EditCar, 'number'> {
    fleet_number?:number;
  }