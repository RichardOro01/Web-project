export interface Country {
  country_code: string;
  country_name: string;
}

export interface CreateCountry extends Omit<Country, "country_code"> {}
