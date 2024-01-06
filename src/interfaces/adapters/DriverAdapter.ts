import { Option } from "@/components/commons/forms/InputSelect";
import { Driver, DriverOption, EditDriver } from "../Driver";

export const driverAdapter = (drivers: Driver[]): TableDataType<Driver>[] => {
  return drivers.map((driver) => ({
    driver_name: driver.driver_name?.toString(),
    address: driver.address?.toString(),
    phone: driver.phone?.toString(),
    is_free_cover:driver.is_free_cover==true?1:0,
    district_name: driver.district?.district_name || "",
    key: driver.driver_code,
  }));
};

export const driversOptionAdapter = (drivers: DriverOption[]): Option[] =>
  drivers
    .filter((driver) => !driver.is_free_cover)
    .map((driver) => ({
      label: driver.driver_name,
      value: driver.driver_code.toString(),
    }));

export const driverFormAdapter = (
  driver: Driver
): FormDataType<EditDriver> => ({
  id_driver: driver.id_driver.toString(),
  driver_name: driver.driver_name?.toString() ?? "",
  address: driver.address?.toString() ?? "",
  phone: driver.phone?.toString() ?? "",
  district_code: driver.district?.district_code.toString() ?? "",
  is_free_cover: driver.is_free_cover?.toString() ?? "",
  driver_code: driver?.driver_code.toString(),
});

export const driverTypesAdapter = (
  driver: FormDataType<EditDriver>
): EditDriver => ({
  id_driver: driver.id_driver.toString(),
  driver_name: driver.driver_name?.toString() ?? "",
  address: driver.address?.toString() ?? "",
  phone: driver.phone?.toString() ?? "",
  district_code: Number(driver.district_code) ?? "",
  is_free_cover: Boolean(driver.is_free_cover) ?? "",
  driver_code: Number(driver?.driver_code),
});

export const driverCreateAdapter = (driver: Driver) => ({
  driver_name: driver.driver_name?.toString() ?? "",
  address: driver.address?.toString() ?? "",
  phone: driver.phone?.toString() ?? "",
  district_code: Number(driver.district?.district_code) ?? "",
  is_free_cover: Boolean(driver.is_free_cover) ?? "",
});
