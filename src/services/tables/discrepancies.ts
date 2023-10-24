import { Discrepancy } from "@/interfaces/Discrepancy";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const discrepancyService: Service = {
  get: async (key?: string) => GET(`discrepancies${key ? `/${key}` : ""}`),
  add: async (data: Discrepancy) => POST("discrepancies", data),
  delete: async (key: string) => DELETE("discrepancies", key),
  update: async (key: string, body: Discrepancy) => POST(`discrepancies/${key}`, body),
};

export default discrepancyService;


