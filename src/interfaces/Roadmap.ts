import { TableData } from "./TableData";

export interface Roadmap extends TableData {
  date: Date;
  fleet_number: number;
  kms: number;
  departure_time: Date;
}
