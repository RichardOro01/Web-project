import { CRUD_ModalsType } from ".";
import BrandModal from "./services/BrandModal";
import ContractModal from "./management/ContractModal";
import ServiceModal from "./management/ServiceModal";
import DiscrepancyModal from "./management/DiscrepancyModal";
import RoadmapModal from "./management/RoadmapModal";

export const CRUD_Modals: { [key in CRUD_ModalsType]: React.ReactElement } = {
  brands: <BrandModal />,
  contracts: <ContractModal />,
  services: <ServiceModal />,
  discrepancies: <DiscrepancyModal />,
  roadmaps: <RoadmapModal />,
};
