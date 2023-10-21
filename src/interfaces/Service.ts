import { Country } from "./Country";
import { TourGroup } from "./TourGroup";
export interface Service {
  service_name: string;
  tour_group: TourGroup;
  country: Country;
  pickup_place: string;
  pickup_time: Date;
  pax: number;
  service: string;
  amount: number;
}
