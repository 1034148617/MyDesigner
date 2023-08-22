import { RequestHttpEnum } from '@/enums/httpsEnum'

export enum ParamsTypeEnum {
    "VARIABLE" = "variable",
    "FUNCTION" = "function",
    "API" = "api"
}

export type BaseParamsType = {
    type: ParamsTypeEnum,               // 变量类型
    id: string,                         // 变量ID
    name: string,                       // 变量名
    description: string,                // 变量描述
    isExpanded: boolean,                // 是否展开描述
    isDelete: boolean,                  // 是否可删除
    isEdit: boolean,                        // 是否可编辑
}

/**
 * 全局变量
 */
export type VariableType = BaseParamsType & {
    value: any
}

/**
 * 全局函数
 */
export type FunctionType = BaseParamsType & {
    value: any
}

export type DataSrouceType = {
    isAutoLoad: boolean,
    dsId: string,
    params: Array<any>,
    method?: RequestHttpEnum,
    default_value?: any,
    value?: any
}

/**
 * 全局接口
 */
export type ApiType = BaseParamsType & DataSrouceType

export type ParamsType = {
    [key: string]: VariableType | FunctionType | ApiType
}

export type DataBandType = {
    [key: string]: any
}

/**
 * key: Page(全局对象)/组件id/接口id
 */
export type RecordType = {
    [key: string]: DataBandType
}

export type GlobalParamsType = {
    user: ParamsType,
    system: ParamsType,
    record: RecordType
}

