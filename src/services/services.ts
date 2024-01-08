import { CRUD_ModalsType } from "@/components/modals";
import { Service } from "./IService";
import brandService from "./tables/brands";
import carService from "./tables/cars";
import contractService from "./tables/contracts";
import countryService from "./tables/countries";
import coupleService from "./tables/couples";
import discrepancyService from "./tables/discrepancies";
import districtService from "./tables/districts";
import driverService from "./tables/drivers";
import fuelService from "./tables/fuels";
import monthService from "./tables/months";
import reportService from "./tables/reports";
import roadmapService from "./tables/roadmaps";
import servicesAppService from "./tables/services";
import tourService from "./tables/tour_groups";
import userService from "./tables/users";

const services: { [key in CRUD_ModalsType]: Service } = {
  brands: brandService,
  contracts: contractService,
  services: servicesAppService,
  cars: carService,
  drivers: driverService,
  couples: coupleService,
  discrepancies: discrepancyService,
  roadmaps: roadmapService,
  districts: districtService,
  fuels: fuelService,
  countries: countryService,
  tour_groups: tourService,
  reports: reportService,
  users: userService,
  months: monthService,
};

export default services;
