import { CRUD_ModalsType } from ".";
import BrandModal from "./services/BrandModal";
import ContractModal from "./management/ContractModal";

export const CRUD_Modals: { [key in CRUD_ModalsType]: React.ReactElement } = {
  brands: <BrandModal />,
  contracts: <ContractModal />,
};
