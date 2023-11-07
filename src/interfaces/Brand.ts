import { Fuel } from "./Fuel";

export interface Brand {
  brand_code: number;
  brand_name: string;
  amo_seats: number | null;
  fuel?: Fuel;
  spending: number | null;
}

export interface EditBrand extends Omit<Brand, "fuel"> {
  fuel_code?: number;
}

export interface CreateBrand extends Omit<EditBrand, "brand_code"> {}
