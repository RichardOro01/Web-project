import { TableData } from "./TableData";

export interface Car extends TableData {
    number: number;
    plate: number;
    brand: string;
    driver1: string;
    driver2: string;
  }