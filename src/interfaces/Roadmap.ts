import { TableData } from "./TableData";

export interface Roadmap extends TableData {
  date: Date;
  fleet_number: number;
  kms: number;
  deaparture_time: Date;
}
