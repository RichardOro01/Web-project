import { Option } from "@/components/commons/forms/InputSelect";
import { District, CreateDistrict } from "../District";

export const districtOptionsAdapter = (districts: District[]): Option[] =>
  districts.map((district) => ({
    label: district.district_name,
    value: district.district_code.toString(),
  }));

export const districtAdapter = (
  districts: District[]
): TableDataType<District>[] => {
  return districts.map((district) => ({
    ...district,
    key: district.district_code,
  }));
};

export const districtFormAdapter = (
  district: TableDataType<District>
): FormDataType<District> => ({
  district_code: district.district_code.toString(),
  district_name: district.district_name,
});

export const districtTypesAdapter = (
  district: FormDataType<District>
): District => ({
  district_code: parseInt(district.district_code),
  district_name: district.district_name,
});

export const districtCreateAdapter = (district: District): CreateDistrict => ({
  district_name: district.district_name,
});
