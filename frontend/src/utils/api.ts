import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("API base URL is not defined in environment variables");
}

const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

setAuthToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1Mzc1MjkxLCJpYXQiOjE3MjUyODg4OTEsImp0aSI6IjZiNGYxYWU4ODhiYzQwZmRhM2FlMmFkMmFjMjc1NDI0IiwidXNlcl9pZCI6M30._luEHZlm7591RTpPhHF8Ifk3B0yKnf-cWdKCrkNAEh0"
);

const api = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.get<T>(
        endpoint,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  post: async <T, U>(
    endpoint: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.post<T>(
        endpoint,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },
  put: async <T, U>(
    endpoint: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.put<T>(
        endpoint,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  },
  delete: async <T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.delete<T>(
        endpoint,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  },
};

export default api;
