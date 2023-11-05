import { Brand } from "../Brand";

export const brandAdapter = (brands: Brand[]): TableDataType<Brand>[] => {
  return brands.map((brand) => ({ ...brand, key: brand.brand_code }));
};

export const brandTypesAdapter = (
  brands: { [key in keyof Brand]: string }[]
): Brand[] => {
  return brands.map((brand) => ({
    ...brand,
    amo_seats: parseInt(brand.amo_seats),
    spending: parseInt(brand.spending),
    brand_code: parseInt(brand.brand_code),
  }));
};
