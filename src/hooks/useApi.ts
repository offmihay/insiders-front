import { useAuth } from "./useAuth";
import { BACKEND_URL } from "../api/config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  queryParams?: Record<string, string>;
  body?: object;
  headers?: Record<string, string>;
}

const useApi = () => {
  const { token } = useAuth();

  const fetchData = async (endpoint: string, options: RequestOptions = {}) => {
    const { method = "GET", queryParams = {}, body, headers } = options;

    const url = new URL(endpoint, BACKEND_URL);
    for (const param in queryParams) {
      url.searchParams.append(param, queryParams[param]);
    }

    const requestHeaders = new Headers(
      headers || { "Content-Type": "application/json" }
    );
    requestHeaders.set("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  };

  return { fetchData };
};

export default useApi;
