export interface District {
  district_code: number;
  district_name: string;
}

export interface CreateDistrict extends Omit<District, "district_code"> {}
