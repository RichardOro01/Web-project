import { Free_cover } from "../Free_cover";

export const free_coverTableAdapter = (free_covers: Free_cover[]): TableDataType<Free_cover>[] => {
  return free_covers.map((free_cover,index) => ({
    key: index,
    brand_name: free_cover.brand?.brand_name || "",
    driver_name: free_cover.driver?.driver_name,
  }));
};

