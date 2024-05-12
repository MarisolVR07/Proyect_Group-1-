import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse<T> {
  data: T | null;
}

async function fetchApi<T>(
  method: HttpMethod,
  url: string,
  requestData?: any
): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: requestData ? JSON.stringify(requestData) : undefined,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: T = await response.json();
  return { data };
}

function useApi<T>() {
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async (
    method: HttpMethod,
    url: string,
    requestData?: any
  ): Promise<T | null> => {
    setLoading(true);

    try {
      const response = await fetchApi<T>(method, url, requestData);
      setLoading(false);
      return response.data;
    } catch {
      setLoading(false);
      return null;
    }
  };

  return { loading, callApi };
}

export default useApi;
