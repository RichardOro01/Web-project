import { Car } from "./Car";

export interface Roadmap{
  roadmap_date: Date;
  car: Car;
  kms: number | null;
  departure_time: string | null;
}

export interface EditRoadmap extends Omit<Roadmap, "car" >{
  car_code?: number;
}

