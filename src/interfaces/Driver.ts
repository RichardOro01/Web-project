import { District } from "./District";

export interface Driver  {
  id_driver: string;
  driver_name: string|null;
  address: string | null;
  phone: string | null;
  district?: District;
  is_free_cover: boolean | null;
  driver_code: number;
}

export interface EditDriver extends Omit<Driver, "district"> {
  district_code?: number;
}

export interface DriverOption extends Omit<Driver, "driver_name"> {
  driver_name: string;
}