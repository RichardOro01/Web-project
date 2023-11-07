import { Brand, CreateBrand, EditBrand } from "../Brand";

export const brandAdapter = (brands: Brand[]): TableDataType<Brand>[] => {
  return brands.map((brand) => ({
    ...brand,
    key: brand.brand_code,
    fuel_name: brand.fuel?.fuel_name,
  }));
};

export const brandFormAdapter = (
  brand: TableDataType<Brand>
): FormDataType<EditBrand> => ({
  brand_code: brand.brand_code.toString(),
  brand_name: brand.brand_name,
  amo_seats: brand.amo_seats?.toString() ?? "",
  spending: brand.spending?.toString() ?? "",
  fuel_code: brand.fuel?.fuel_code.toString() ?? "",
});

export const brandTypesAdapter = (
  brand: FormDataType<EditBrand>
): EditBrand => ({
  brand_code: parseInt(brand.brand_code),
  brand_name: brand.brand_name,
  amo_seats: parseInt(brand.amo_seats),
  spending: parseInt(brand.spending),
  fuel_code: parseInt(brand.fuel_code ?? ""),
});

export const brandCreateAdapter = (brand: EditBrand): CreateBrand => ({
  brand_name: brand.brand_name,
  amo_seats: brand.amo_seats,
  spending: brand.spending,
  fuel_code: brand.fuel_code,
});
