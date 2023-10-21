import { Brand } from "@/interfaces/Brand";
import { GET, POST } from ".";

export const getBrands = async () => {
  return GET("brands");
};

export const addBrand = async (data: Brand) => {
  return POST("brands", data);
};
