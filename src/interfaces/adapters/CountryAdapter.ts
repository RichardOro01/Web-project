import { Option } from "@/components/commons/forms/InputSelect";
import { CreateCountry, Country } from "../Country";

export const countryOptionsAdapter = (countries: Country[]): Option[] =>
  countries.map((country) => ({
    label: country.country_name,
    value: country.country_code.toString(),
  }));

export const countryAdapter = (
  countries: Country[]
): TableDataType<Country>[] => {
  return countries.map((country) => ({
    ...country,
    key: parseInt(country.country_code),
  }));
};
