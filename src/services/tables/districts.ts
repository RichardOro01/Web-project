import { District } from "@/interfaces/District";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const districtService: Service = {
  get: async (key?: string) => GET(`districts${key ? `/${key}` : ""}`),
  add: async (data: District) => POST("districts", data),
  delete: async (key: string) => DELETE("districts", key),
  update: async (key: string, body: District) => POST(`districts/${key}`, body),
};

export default districtService;
