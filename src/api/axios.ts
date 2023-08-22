/**
 * @description 封装axios
 * @createTime 2023.04.07
 */
import axios, { AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
const httpStore = useHttpStore()
const ajaxConfig = httpStore.getAjaxConfig

const axiosInstance = axios.create({
    baseURL: ajaxConfig.baseUrl,
    timeout: ajaxConfig.timeout,
    withCredentials: ajaxConfig.isCrossDomain
})

// request拦截器
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        return config
    },
    (error: AxiosRequestConfig) => {
        return Promise.reject(error)
    }
)

// response拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return new Promise((reslove, reject) => {
            if (response.status === 200) {
                reslove(response)
            } else {
                reject(response)
            }
        })
    },
    (error: AxiosResponse) => {
        return Promise.reject(error)
    }
)

export default axiosInstance