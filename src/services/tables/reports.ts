import { Report } from "@/interfaces/Report";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const reportService: Service = {
  get: async (key?: string) => GET(`reports${key ? `/${key}` : ""}`),
  add: async (data: Report) => POST("reports", data),
  delete: async (key: string) => DELETE(`reports/${key}`),
  update: async (key: string, body: Report) => POST(`reports/${key}`, body),
};

export default reportService;
