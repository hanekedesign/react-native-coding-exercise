import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { clearSession } from "../utils";

const ENV = process.env.NODE_ENV;

//filter the logs here
const shouldLog = (config: InternalAxiosRequestConfig | undefined) => {
  // return  config?.url?.includes("tracking")
  return false;
};

const logRequest = (config: InternalAxiosRequestConfig) => {
  if (ENV === "development" && shouldLog(config)) {
    console.log(
      JSON.stringify(
        {
          type: "Request",
          method: config.method,
          url: config.url,
          date: config.headers?.date,
          data: config.data,
        },
        null,
        2
      )
    );
  }
};

const logResponse = (response: AxiosResponse) => {
  if (ENV === "development" && shouldLog(response.config)) {
    console.log(
      JSON.stringify(
        {
          type: "Response",
          status: response.status,
          statusText: response.statusText,
          date: response.headers?.date,
          data: response.data,
        },
        null,
        2
      )
    );
  }
};

const logErrorResponse = (error: AxiosError) => {
  if (ENV === "development" && shouldLog(error?.config)) {
    console.log(
      JSON.stringify(
        {
          type: "Error Response",
          status: error.response?.status,
          statusText: error.response?.statusText,
          date: error.response?.headers?.date,
          data: error.response?.data,
        },
        null,
        2
      )
    );
  }
};

export const requestIntercept =
  (token: string | null) => async (config: InternalAxiosRequestConfig) => {
    try {
      if (!config?.headers) throw new Error("No headers on the request");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      logRequest(config);
      return config;
    } catch {
      if (ENV === "development") console.warn("NO TOKEN FOUND IN STORAGE");
      logRequest(config);
      return config;
    }
  };

export const responseSuccess = async (res: AxiosResponse) => {
  logResponse(res);
  return res;
};

export const responseError =
  (logout?: () => void) => async (error: AxiosError) => {
    logErrorResponse(error);
    if (error?.response?.status === 401) {
      await clearSession();
      logout?.();
      if (ENV === "development") console.warn("NO TOKEN OR IT HAS EXPIRED");
    }
    throw error;
  };
