import { Brand } from "./Brand";
import { Driver } from "./Driver";

export interface Free_cover {
    brand?: Brand;
    driver?: Driver;
}

export interface CreateFree extends Omit<Free_cover, "brand" & "driver"> {
    brand_code?:number;
    driver_code?:number;
}