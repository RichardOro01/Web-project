import { Fuel } from "@/interfaces/Fuel";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const fuelService: Service = {
  get: async (key?: string) => GET(`fuels${key ? `/${key}` : ""}`),
  add: async (data: Fuel) => POST("fuels", data),
  delete: async (key: string) => DELETE("fuels", key),
  update: async (key: string, body: Fuel) => POST(`fuels/${key}`, body),
};

export default fuelService;
