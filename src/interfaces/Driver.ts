import { TableData } from "./TableData";

export interface Driver extends TableData {
  id: string;
  name: string;
  address: string;
  phone: string;
  district_name: string;
  is_free_cover: boolean;
}