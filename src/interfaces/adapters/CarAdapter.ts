import { Option } from "@/components/commons/forms/InputSelect";
import { Car, CreateCar, EditCar } from "../Car";


export const carAdapter = (cars: Car[]): TableDataType<Car>[] => {
  return cars.map((car) => ({
    fleet_number: car.fleet_number,
    plate: car.plate || "",
    brand_name: car.brand?.brand_name,
    key: car.fleet_number,
    couple_name: `${car.couple?.driver1?.driver_name} and ${car.couple?.driver2?.driver_name}`,
  }));
};

export const carFormAdapter = (car: Car): FormDataType<EditCar> => ({
  fleet_number: car.fleet_number?.toString() ?? "",
  plate: car.plate?.toString() ?? "",
  brand_code: car?.brand?.brand_code.toString() || "",
  couple_code: car.couple?.couple_code?.toString() ?? "",
  car_code:car.car_code.toString()
});

export const carTypesAdapter = (car: FormDataType<EditCar>): EditCar => ({
  fleet_number: Number(car.fleet_number),
  plate: car.plate,
  brand_code: Number(car.brand_code),
  couple_code: parseInt(car.couple_code ?? ""),
  car_code: parseInt(car.car_code)
});

export const carCreateAdapter = (car: EditCar): CreateCar => ({
  fleet_number: car.fleet_number,
  plate: car.plate,
  brand_code: car.brand_code,
  couple_code: car.couple_code,
});

export const carOptionsAdapter = (cars: Car[]): Option[] =>
  cars.map((car) => ({
    label: car.plate as string,
    value: car.fleet_number?.toString(),
  }));
