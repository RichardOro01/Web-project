import { ServiceI } from "@/interfaces/Service";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const serviceAppService: Service = {
  get: async (key?: string) => GET(`services${key ? `/${key}` : ""}`),
  add: async (data: ServiceI) => POST("services", data),
  delete: async (key: string) => DELETE(`services/${key}`),
  update: async (key: string, body: ServiceI) => POST(`services/${key}`, body),
};

export default serviceAppService;
