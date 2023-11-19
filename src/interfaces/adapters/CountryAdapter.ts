import { Option } from "@/components/commons/forms/InputSelect";
import { Country } from "../Country";

export const countryOptionsAdapter = (countries: Country[]): Option[] =>
  countries.map((country) => ({
    label: country.country_name,
    value: country.country_code,
  }));

export const countryAdapter = (
  countries: Country[]
): TableDataType<Country>[] => {
  return countries.map((country) => ({
    ...country,
    key: country.country_code,
  }));
};

export const countryTypesAdapter = (
  country: FormDataType<Country>
): Country => ({
  country_code: country.country_code,
  country_name: country.country_name,
});
