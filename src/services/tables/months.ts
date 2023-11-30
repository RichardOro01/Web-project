import { Month } from "@/interfaces/Month";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const monthService: Service = {
  get: async (key?: string) => GET(`months${key ? `/${key}` : ""}`),
  add: async (data: Month) => POST("months", data),
  delete: async (key: string) => DELETE(`months/${key}`),
  update: async (key: string, body: Month) => POST(`months/${key}`, body),
};

export default monthService;
