export interface Brand {
  brand_code: number;
  brand_name: string;
  amo_seats: number;
  fuel_code: number;
  spending: number;
}

export interface CreateBrand extends Omit<Brand, "brand_code"> {}
