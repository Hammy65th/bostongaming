import axios from "axios";
import { useState } from "react";

const BASE_URL = "http://localhost:5039/";

const useRequestData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMap, setDataMap] = useState({}); // Store multiple endpoints
  const [errorMap, setErrorMap] = useState({});

  const makeRequest = async (
    endpoint = "",
    method = "GET",
    headers = null,
    params = null,
    body = null
  ) => {
    setIsLoading(true);
    const fullUrl = `${BASE_URL}${endpoint}`;

    try {
      let response;

      if (method === "GET") {
        response = await axios.get(fullUrl, { headers, params });
      } else if (method === "DELETE") {
        response = await axios.delete(fullUrl, { headers, params });
        if (response.status === 204) {
          setDataMap((prev) => ({ ...prev, [endpoint]: { success: true, message: "Deleted successfully" } }));
          setErrorMap((prev) => ({ ...prev, [endpoint]: false }));
          return;
        }
      } else if (method === "POST") {
        response = await axios.post(fullUrl, body, { headers, params });
      } else if (method === "PUT") {
        response = await axios.put(fullUrl, body, { headers, params });
      } else if (method === "PATCH") {
        response = await axios.patch(fullUrl, body, { headers, params });
      } else {
        throw new Error("Invalid HTTP method.");
      }

      setDataMap((prev) => ({ ...prev, [endpoint]: response.data }));
      setErrorMap((prev) => ({ ...prev, [endpoint]: false }));
    } catch (err) {
      console.error(err);
      setDataMap((prev) => ({ ...prev, [endpoint]: null }));
      setErrorMap((prev) => ({ ...prev, [endpoint]: true }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    makeRequest,
    isLoading,
    data: dataMap,    // Now contains multiple endpoint results
    error: errorMap,  // Also keyed by endpoint
  };
};

export default useRequestData;
