import { Contract } from "@/interfaces/Contract";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const contractService: Service = {
  get: async (key?: string) => GET(`contracts${key ? `/${key}` : ""}`),
  add: async (data: Contract) => POST("contracts", data),
  delete: async (key: string) => DELETE(`contracts/${key}`),
  update: async (key: string, body: Contract) => POST(`contracts/${key}`, body),
};

export default contractService;
