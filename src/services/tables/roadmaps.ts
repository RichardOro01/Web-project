import { Roadmap } from "@/interfaces/Roadmap";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const roadmapService: Service = {
  get: async (key?: string) => GET(`roadmaps${key ? `/${key}` : ""}`),
  add: async (data: Roadmap) => POST("roadmaps", data),
  delete: async (key: string) => DELETE(`roadmaps/${key}`),
  update: async (key: string, body: Roadmap) => POST(`roadmaps/${key}`, body),
};

export default roadmapService;
