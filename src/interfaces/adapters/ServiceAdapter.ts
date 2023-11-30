import dayjs from "dayjs";
import { ServiceI, CreateService, EditService } from "../Service";
import { timeToDate } from "@/lib/utils";

export const serviceTableAdapter = (
  services: ServiceI[]
): TableDataType<ServiceI>[] => {
  return services.map((service) => ({
    key: service.service_code,
    service_name: service.service_name || "",
    pickup_place: service.pickup_place || "",
    pax: service.pax || "",
    service_kms: service.service_kms || "",
    amount: service.amount || "",
    request_number: service.request_number || "",
    country_name: service.country?.country_name,
    group_name: service.tour_group?.group_name,
    pickup_time: service.pickup_time
      ? dayjs(service.pickup_time).format("hh:mm A")
      : "",
  }));
};

export const serviceFormAdapter = (
  service: ServiceI
): FormDataType<EditService> => ({
  service_code: service.service_code.toString(),
  service_name: service.service_name ?? "",
  pickup_place: service.pickup_place ?? "",
  pickup_time: service.pickup_time
    ? dayjs(service.pickup_time).format("HH:mm")
    : "",
  pax: service.pax?.toString() ?? "",
  service_kms: service.service_kms?.toString() ?? "",
  amount: service.amount?.toString() ?? "",
  request_number: service.request_number?.toString() ?? "",
  country_code: service.country?.country_code,
  tour_group_code: service.tour_group?.group_code,
});

export const serviceTypesAdapter = (
  service: FormDataType<EditService>
): EditService => ({
  service_code: parseInt(service.service_code),
  service_name: service.service_name,
  pickup_place: service.pickup_place,
  pickup_time: timeToDate(service.pickup_time),
  pax: parseInt(service.pax),
  service_kms: parseFloat(service.service_kms),
  amount: parseFloat(service.amount),
  request_number: parseInt(service.request_number),
  country_code: service.country_code,
  tour_group_code: service.tour_group_code ?? "",
});

export const serviceCreateAdapter = (service: EditService): CreateService => ({
  service_name: service.service_name,
  pickup_place: service.pickup_place,
  pickup_time: service.pickup_time,
  pax: service.pax,
  service_kms: service.service_kms,
  amount: service.amount,
  request_number: service.request_number,
  country_code: service.country_code,
  tour_group_code: service.tour_group_code,
});
