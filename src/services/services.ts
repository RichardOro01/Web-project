import { CRUD_ModalsType } from "@/components/modals";
import brandService from "./tables/brands";
import contractService from "./tables/contracts";
import servicesService from "./tables/services";
import discrepancyService from "./tables/discrepancies";
import roadmapService from "./tables/roadmaps";
import { Service } from "./IService";
import carService from "./tables/cars";
import driverService from "./tables/drivers";
import coupleService from "./tables/couples";
import districtService from "./tables/districts";
import fuelService from "./tables/fuels";
import countryService from "./tables/countries";
import tourService from "./tables/tour_groups";

const services: { [key in CRUD_ModalsType]: Service } = {
  brands: brandService,
  contracts: contractService,
  services: servicesService,
  cars: carService,
  drivers: driverService,
  couples: coupleService,
  discrepancies: discrepancyService,
  roadmaps: roadmapService,
  districts: districtService,
  fuels: fuelService,
  countries: countryService,
  tour_groups: tourService,
};

export default services;
