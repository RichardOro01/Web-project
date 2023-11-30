import { Driver } from "./Driver";

export interface Couple {
    couple_code:number;
    driver1?: Driver;
    driver2?: Driver;
}

export interface CreateCouple extends Omit<Couple, "driver1" & "driver2"> {
    driver1_code?:number;
    driver2_code?:number;
}