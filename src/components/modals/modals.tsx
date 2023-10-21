import { CRUD_ModalsType } from ".";
import BrandModal from "./services/BrandModal";

export const CRUD_Modals: { [key in CRUD_ModalsType]: React.ReactElement } = {
  brands: <BrandModal />,
};
