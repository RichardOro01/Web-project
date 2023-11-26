import { User } from "@/interfaces/User";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const userService: Service = {
  get: async (key?: string) => GET(`users${key ? `/${key}` : ""}`),
  add: async (data: User) => POST("users", data),
  delete: async (key: string) => DELETE(`users/${key}`),
  update: async (key: string, body: User) => POST(`users/${key}`, body),
};

export default userService;
