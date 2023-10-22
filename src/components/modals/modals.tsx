import { CRUD_ModalsType } from ".";
import BrandModal from "./services/BrandModal";
import ContractModal from "./management/ContractModal";
import ServiceModal from "./management/ServiceModal";

export const CRUD_Modals: { [key in CRUD_ModalsType]: React.ReactElement } = {
  brands: <BrandModal />,
  contracts: <ContractModal />,
  services: <ServiceModal />,
};
