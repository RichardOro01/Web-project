import { Driver } from "@/interfaces/Driver";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";
import { Couple } from "@/interfaces/Couple";

const driverService: Service = {
  get: async (key?: string) => GET(`drivers${key ? `/${key}` : ""}`),
  add: async (data: Driver) => POST("drivers", data),
  delete: async (key: string) => DELETE(`drivers/${key}`),
  update: async (key: string, body: Driver) => POST(`drivers/${key}`, body),
};

export default driverService;