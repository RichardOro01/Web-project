import { Roadmap } from "@/interfaces/Roadmap";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const roadmapService: Service = {
  get: async (key?: string) => GET(`rodamaps${key ? `/${key}` : ""}`),
  add: async (data: Roadmap) => POST("rodamaps", data),
  delete: async (key: string) => DELETE("rodamaps", key),
  update: async (key: string, body: Roadmap) => POST(`rodamaps/${key}`, body),
};

export default roadmapService;
