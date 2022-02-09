import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (
  method: "get" | "post",
  url: string,
  paramOrBody: any,
  setStore: Function
) => {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let config = { method: method, url: url };

  paramOrBody !== null && Object.assign(config, paramOrBody);

  const callUrl = async () => {
    try {
      const { data } = await axios(config);
      console.log("data", data);
      setPayload(data);
      setStore !== null && setStore(data);
    } catch (e) {
      setError("😢");
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("start");
    callUrl();
    console.log("end");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { payload, loading, error };
};

export default useFetch;
