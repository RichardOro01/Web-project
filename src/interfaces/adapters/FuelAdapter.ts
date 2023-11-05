import { Option } from "@/components/commons/forms/InputSelect";
import { Fuel } from "../Fuel";

export const fuelOptionsAdapter = (fuels: Fuel[]): Option[] =>
  fuels.map((fuel) => ({
    label: fuel.fuel_name,
    value: fuel.fuel_code.toString(),
  }));
