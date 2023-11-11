import { Tourist } from "./TourGroup";
import { Country } from "./Country";
export interface ServiceI {
  service_code: number;
  service_name: string | null;
  pickup_place: string | null;
  pickup_time: Date | null;
  pax: number | null;
  service_kms: number | null;
  amount: number | null;
  request_number: number | null;
  country?: Country;
  tour_group?: Tourist;
}

export interface EditService extends Omit<ServiceI, "country" | "tour_group"> {
  country_code?: string;
  tour_group_code?: string;
}

export interface CreateService extends Omit<EditService, "service_code"> {}
