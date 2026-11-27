import axios from "axios"
import { appConfig } from "./AppConfig";

export const axiosClient = axios.create({
  baseURL: appConfig.apiBaseUrl, 
  timeout: 90000,
  timeoutErrorMessage: "Server timed out...",
  responseEncoding: "utf-8",
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
})


axiosClient.interceptors.response.use(
  (response) => response.data,
  (exception) => {
    console.log({exception})
    if(exception.response) {
      throw exception.response
    } else {
      throw {code: exception.status, message: exception.message}
    }
  }
)