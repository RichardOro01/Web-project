import { CRUD_ModalsType } from "@/components/modals";
import brandService from "./tables/brands";
import contractService from "./tables/contracts";
import servicesService from "./tables/services";
import { Service } from "./IService";
import coupleService from "./tables/couples";
import driverService from "./tables/drivers";
import carService from "./tables/cars";

const services: { [key in CRUD_ModalsType]: Service } = {
  brands: brandService,
  contracts: contractService,
  services: servicesService,
  couples:coupleService,
  drivers:driverService,
  cars:carService
};

export default services;
