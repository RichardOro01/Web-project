import { Role } from "@/interfaces/Role";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const roleService: Service = {
  get: async (key?: string) => GET(`roles${key ? `/${key}` : ""}`),
  add: async (data: Role) => POST("roles", data),
  delete: async (key: string) => DELETE(`roles/${key}`),
  update: async (key: string, body: Role) => POST(`roles/${key}`, body),
};

export default roleService;
