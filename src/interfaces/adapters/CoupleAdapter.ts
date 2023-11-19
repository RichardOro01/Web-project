import { Option } from "@/components/commons/forms/InputSelect";
import { CreateFuel, Fuel } from "../Fuel";
import { Couple } from "../Couple";

export const coupleOptionsAdapter = (couples: Couple[]): Option[] =>
    couples.map((couple) => ({
      label: `${couple.driver1?.driver_name} and ${couple.driver2?.driver_name}`,
      value: couple.couple_id.toString(),
    }));
    
export const coupleAdapter = (fuels: Fuel[]): TableDataType<Fuel>[] => {
  return fuels.map((fuel) => ({
    ...fuel,
    key: fuel.fuel_code,
  }));
};

export const coupleFormAdapter = (
  fuel: TableDataType<Fuel>
): FormDataType<Fuel> => ({
  fuel_code: fuel.fuel_code.toString(),
  fuel_name: fuel.fuel_name,
});

export const coupleTypesAdapter = (fuel: FormDataType<Fuel>): Fuel => ({
  fuel_code: parseInt(fuel.fuel_code),
  fuel_name: fuel.fuel_name,
});

export const coupleCreateAdapter = (couple: Couple): CreateCouple => ({
    driver1: couple.driver1,
    driver2: couple.driver2
});
