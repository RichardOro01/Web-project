import { Option } from "@/components/commons/forms/InputSelect";
import { Couple, CreateCouple } from "../Couple";

export const coupleOptionsAdapter = (couples: Couple[]): Option[] =>
  couples.map((couple) => ({
    label: `${couple.driver1?.driver_name} and ${couple.driver2?.driver_name}`,
    value: couple.couple_code.toString(),
  }));

export const coupleAdapter = (couples: Couple[]): TableDataType<Couple>[] => {
  return couples.map((couple) => ({
    key: couple.couple_code,
    driver1_name: couple.driver1?.driver_name ?? "",
    driver2_name: couple.driver2?.driver_name ?? "",
  }));
};

export const coupleFormAdapter = (couple: Couple): FormDataType<Couple> => ({
  couple_code: couple.couple_code?.toString(),
  driver1: couple.driver1?.driver_code?.toString(),
  driver2: couple.driver2?.driver_code?.toString(),
});

export const coupleTypesAdapter = (couple: FormDataType<CreateCouple>) => ({
  driver_1: Number(couple.driver1),
  driver_2: Number(couple.driver2),
});

export const coupleCreateAdapter = (couple: Couple) => ({
  driver1_code: Number(couple.driver1?.driver_code),
  driver2_code: Number(couple.driver2?.driver_code),
});
