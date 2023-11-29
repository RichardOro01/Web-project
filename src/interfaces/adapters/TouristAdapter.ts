import { Option } from "@/components/commons/forms/InputSelect";
import { Tourist } from "../TourGroup";

export const touristOptionsAdapter = (tourists: Tourist[]): Option[] =>
  tourists.map((tourist) => ({
    label: tourist.group_name,
    value: tourist.group_code,
  }));

export const touristTableAdapter = (
  tourists: Tourist[]
): TableDataType<Tourist>[] => {
  return tourists.map((tourist) => ({
    ...tourist,
    key: tourist.group_code,
  }));
};

export const touristTypesAdapter = (
  tourist: FormDataType<Tourist>
): Tourist => ({
  group_code: tourist.group_code,
  group_name: tourist.group_name,
});
