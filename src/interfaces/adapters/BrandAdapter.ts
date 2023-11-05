import { Brand, CreateBrand } from "../Brand";

export const brandAdapter = (brands: Brand[]): TableDataType<Brand>[] => {
  return brands.map((brand) => ({ ...brand, key: brand.brand_code }));
};

export const brandTypesAdapter = (brand: {
  [key in keyof Brand]: string;
}): Brand => ({
  ...brandCreateAdapter(brand),
  brand_code: parseInt(brand.brand_code),
});

export const brandCreateAdapter = (brand: {
  [key in keyof CreateBrand]: string;
}): CreateBrand => ({
  ...brand,
  amo_seats: parseInt(brand.amo_seats),
  spending: parseInt(brand.spending),
  fuel_code: parseInt(brand.fuel_code),
});
