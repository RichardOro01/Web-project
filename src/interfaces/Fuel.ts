export interface Fuel {
  fuel_code: number;
  fuel_name: string;
}

export interface CreateFuel extends Omit<Fuel, "fuel_code"> {}
