import { Couple } from "@/interfaces/Couple";
import { useState, useEffect, useCallback } from "react";
import coupleService from "../tables/couples";
import { Brand } from "@/interfaces/Brand";
import brandService from "../tables/brands";

function useGetBrands() {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getBrands = useCallback(async () => {
    setLoading(true);
    await brandService.get()
      .then((res) => {
        setList(res);
      })
      .catch((e) => {
        setError(e)
      })
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  return { loading: loading, list:  list , error: error};
}

export default useGetBrands;