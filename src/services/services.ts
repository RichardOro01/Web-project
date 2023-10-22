import brandService from "./brands";
import contractService from "./contracts";
import serviceAppService from "./servicesApp";

const services = {
  brands: brandService,
  contracts: contractService,
  servicesApp: serviceAppService,
};

export default services;
