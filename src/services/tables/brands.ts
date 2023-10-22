import { Brand } from "@/interfaces/Brand";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const brandService: Service = {
  get: async (key?: string) => GET(`brands${key ? `/${key}` : ""}`),
  add: async (data: Brand) => POST("brands", data),
  delete: async (key: string) => DELETE("brands", key),
  update: async (key: string, body: Brand) => POST(`brands/${key}`, body),
};

export default brandService;
