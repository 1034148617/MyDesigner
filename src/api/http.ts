import qs from 'qs'
import axios from 'axios'
import axiosInstance from './axios'
import {
    RequestHttpEnum,
    ContentTypeEnum,
} from '@/enums/httpEnum'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
const httpStore = useHttpStore()

export const get = (url: string, params?: object) => {
    return axiosInstance({
        url: url,
        method: RequestHttpEnum.GET,
        params: params
    })
}

export const post = (url: string, data?: object, headersType?: string) => {
    return axiosInstance({
        url: url,
        method: RequestHttpEnum.POST,
        data: data,
        headers: {
            'Content-Type': headersType || ContentTypeEnum.JSON
        }
    })
}

export const patch = (url: string, data?: object, headersType?: string) => {
    return axiosInstance({
        url: url,
        method: RequestHttpEnum.PATCH,
        data: data,
        headers: {
            'Content-Type': headersType || ContentTypeEnum.JSON
        }
    })
}

export const put = (url: string, data?: object, headersType?: ContentTypeEnum) => {
    return axiosInstance({
        url: url,
        method: RequestHttpEnum.PUT,
        data: data,
        headers: {
            'Content-Type': headersType || ContentTypeEnum.JSON
        }
    })
}

export const del = (url: string, params?: object) => {
    return axiosInstance({
        url: url,
        method: RequestHttpEnum.DELETE,
        params
    })
}

// 获取请求函数，默认get
export const http = (type?: RequestHttpEnum) => {
    switch (type) {
        case RequestHttpEnum.GET:
            return get

        case RequestHttpEnum.POST:
            return post

        case RequestHttpEnum.PATCH:
            return patch

        case RequestHttpEnum.PUT:
            return put

        case RequestHttpEnum.DELETE:
            return del

        default:
            return get
    }
}

// 对数据服务进行封装
export const executeDs = async (dsId: string, params: { [key: string]: any } = {}): Promise<any> => {
    // dsId进行处理
    if (!dsId.includes('/api')) {
        if (!dsId.includes('.ds')) {
            dsId = dsId + '.ds'
        }
        dsId = '/api/' + dsId
    }

    // 参数处理
    const urlParams = qs.stringify(params)

    // 执行
    return axiosInstance.post(dsId, urlParams)
}

// 对sql进行封装
export const executeSql = async (_sql: string): Promise<any> => {
    return axios.post(httpStore.getMssqlConfig.api, {
        sql: _sql
    })
}