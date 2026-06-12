import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json"
  }
})

const engine = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.get(url, config)
    return res.data
  },
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.post(url, data, config)
    return res.data
  },
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.put(url, data, config)
    return res.data
  },
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.delete(url, config)
    return res.data
  }
}

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
)

export default engine