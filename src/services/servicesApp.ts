import { ServiceApp } from "@/interfaces/Service";
import { DELETE, GET, POST } from ".";
import { Service } from "./IService";

const serviceAppService: Service = {
  get: async (key?: string) => GET(`services${key ? `/${key}` : ""}`),
  add: async (data: ServiceApp) => POST("services", data),
  delete: async (key: string) => DELETE("services", key),
  update: async (key: string, body: ServiceApp) =>
    POST(`services/${key}`, body),
};

export default serviceAppService;
