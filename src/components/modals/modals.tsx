import { CRUD_ModalsType } from ".";
import BrandModal from "./services/BrandModal";
import ContractModal from "./management/ContractModal";
import ServiceModal from "./management/ServiceModal";
import DiscrepancyModal from "./management/DiscrepancyModal";
import RoadmapModal from "./management/RoadmapModal";
import CarModal from "./services/CarModal";
import DriverModal from "./services/DriverModal";
import CoupleModal from "./services/CoupleModal";
import DistrictModal from "./others/DistrictModal";

export const CRUD_Modals: { [key in CRUD_ModalsType]: React.ReactElement } = {
  brands: <BrandModal />,
  contracts: <ContractModal />,
  services: <ServiceModal />,
  cars: <CarModal />,
  drivers: <DriverModal />,
  couples: <CoupleModal />,
  discrepancies: <DiscrepancyModal />,
  roadmaps: <RoadmapModal />,
  districts: <DistrictModal />,
};
