import { TableData } from "./TableData";

export interface Driver extends TableData {
  id_driver: string;
  driver_name: string | null;
  address: string | null;
  phone: string | null;
  district_code: number | null;
  is_free_cover: boolean | null;
  driver_code: number;
}