import { Driver } from "./Driver";

export interface Couple {
    couple_id:number|undefined;
    driver1: Driver|undefined;
    driver2: Driver|undefined;
}

export interface CreateCouple extends Omit<Couple, "couple_id"> {}