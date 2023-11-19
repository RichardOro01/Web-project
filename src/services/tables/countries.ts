import { Country } from "@/interfaces/Country";
import { DELETE, GET, POST } from "..";
import { Service } from "../IService";

const countryService: Service = {
  get: async (key?: string) => GET(`countries${key ? `/${key}` : ""}`),
  add: async (data: Country) => POST("countries", data),
  delete: async (key: string) => DELETE(`countries/${key}`),
  update: async (key: string, body: Country) => POST(`countries/${key}`, body),
};

export default countryService;
