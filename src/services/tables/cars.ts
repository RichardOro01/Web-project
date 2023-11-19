import { Car } from "@/interfaces/Car";
import { Service } from "../IService";
import { DELETE, GET, POST } from "..";

const carService: Service = {
    get: async (key?: string) => GET(`cars${key ? `/${key}` : ""}`),
    add: async (data: Car) => POST("cars", data),
    delete: async (key: string) => DELETE(`cars/${key}`),
    update: async (key: string, body: Car) => POST(`cars/${key}`, body),
};

export default carService