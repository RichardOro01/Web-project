import { Country } from "./Country";
import { TourGroup } from "./TourGroup";
import { TableData } from "./TableData";
export interface ServiceApp extends TableData {
  service_name: string;
  tour_group: TourGroup;
  country: Country;
  pickup_place: string;
  pickup_time: Date;
  pax: number;
  service_kms: string;
  amount: number;
}
