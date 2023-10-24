import { CRUD_ModalsType } from "@/components/modals";
import brandService from "./tables/brands";
import contractService from "./tables/contracts";
import servicesService from "./tables/services";
import discrepancyService from "./tables/discrepancies"
import roadmapService from "./tables/roadmaps";
import { Service } from "./IService";
import carService from "./tables/cars";
import driverService from "./tables/drivers";
import CoupleModal from "@/components/modals/services/CoupleModal";


const services: { [key in CRUD_ModalsType]: Service } = {
  brands: brandService,
  contracts: contractService,
  services: servicesService,
  cars:carService,
  drivers: driverService,
  couples: CoupleModal
};

export default services;
