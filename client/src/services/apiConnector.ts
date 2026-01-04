/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = async <T = any>(
  method: Method,
  url: string,
  bodyData: any = null,
  headers: Record<string, string> = {},
  params: Record<string, any> = {}
): Promise<AxiosResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data: bodyData,
      headers,
      params,
    };

    return await axiosInstance(config);
  } catch (error: any) {
    // Centralized error handling
    throw error.response?.data || error.message;
  }
};
