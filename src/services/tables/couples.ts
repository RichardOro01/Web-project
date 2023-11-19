import { DELETE, GET, POST } from "..";
import { Service } from "../IService";
import { Couple } from "@/interfaces/Couple";

const coupleService: Service = {
  get: async (key?: string) => GET(`couples${key ? `/${key}` : ""}`),
  add: async (data: Couple) => POST("couples", data),
  delete: async (key: string) => DELETE(`couples/${key}`),
  update: async (key: string, body: Couple) => POST(`couples/${key}`, body),
};

export default coupleService;