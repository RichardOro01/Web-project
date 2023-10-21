import { Brand } from "@/interfaces/Brand";
import { DELETE, GET, POST } from ".";
import { Service } from "./IService";

const brandService: Service = {
  get: async () => GET("brands"),
  add: async (data: Brand) => POST("brands", data),
  delete: async (key: string) => DELETE("brands", key),
};

export default brandService;
