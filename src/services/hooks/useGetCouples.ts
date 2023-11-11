import { Couple } from "@/interfaces/Couple";
import { useState, useEffect, useCallback } from "react";
import coupleService from "../tables/couples";

function useGetCouples() {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Couple[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getCouples = useCallback(async () => {
    setLoading(true);
    await coupleService.get()
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
    getCouples();
  }, [getCouples]);

  return { loading: loading, list:  list , error: error};
}

export default useGetCouples;