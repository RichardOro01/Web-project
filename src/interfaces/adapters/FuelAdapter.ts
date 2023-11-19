import { Option } from "@/components/commons/forms/InputSelect";
import { CreateFuel, Fuel } from "../Fuel";

export const fuelOptionsAdapter = (fuels: Fuel[]): Option[] =>
  fuels.map((fuel) => ({
    label: fuel.fuel_name,
    value: fuel.fuel_code.toString(),
  }));

export const fuelAdapter = (fuels: Fuel[]): TableDataType<Fuel>[] => {
  return fuels.map((fuel) => ({
    ...fuel,
    key: fuel.fuel_code,
  }));
};

export const fuelFormAdapter = (
  fuel: TableDataType<Fuel>
): FormDataType<Fuel> => ({
  fuel_code: fuel.fuel_code.toString(),
  fuel_name: fuel.fuel_name,
});

export const fuelTypesAdapter = (fuel: FormDataType<Fuel>): Fuel => ({
  fuel_code: parseInt(fuel.fuel_code),
  fuel_name: fuel.fuel_name,
});

export const fuelCreateAdapter = (fuel: Fuel): CreateFuel => ({
  fuel_name: fuel.fuel_name,
});
