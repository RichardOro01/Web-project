import { Tourist } from "@/interfaces/TourGroup";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const tourService: Service = {
  get: async (key?: string) => GET(`tourist_groups${key ? `/${key}` : ""}`),
  add: async (data: Tourist) => POST("tourist_groups", data),
  delete: async (key: string) => DELETE(`tourist_groups/${key}`),
  update: async (key: string, body: Tourist) =>
    POST(`tourists_groups/${key}`, body),
};

export default tourService;
