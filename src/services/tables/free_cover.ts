import { Car } from "@/interfaces/Car";
import { Service } from "../IService";
import { DELETE, GET, POST } from "..";
import { Free_cover } from "@/interfaces/Free_cover";

const free_coverServices: Service = {
    get: async (key?: string) => GET(`free_covers${key ? `/${key}` : ""}`),
    add: async (data: Free_cover) => POST("free_covers", data),
    delete: async (key: string) => DELETE(`free_covers/${key}`),
    update: async (key: string, body: Free_cover) => POST(`free_covers/${key}`, body),
};

export default free_coverServices