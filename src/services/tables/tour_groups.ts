import { TourGroup } from "@/interfaces/TourGroup";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const tourService: Service = {
  get: async (key?: string) => GET(`tour_groups${key ? `/${key}` : ""}`),
  add: async (data: TourGroup) => POST("tour_groups", data),
  delete: async (key: string) => DELETE("tour_groups", key),
  update: async (key: string, body: TourGroup) =>
    POST(`tour_groups/${key}`, body),
};

export default tourService;
