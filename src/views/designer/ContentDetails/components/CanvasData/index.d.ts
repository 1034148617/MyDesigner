import { RequestHttpEnum, RequestHttpIntervalEnum, RequestDataTypeEnum, SelectHttpTimeNameObj } from '@/enums/httpEnum'

// 匹配结果
export enum DataResultEnum {
    NULL = 0,
    SUCCESS = 1,
    FAILURE = 2,
}

// 数据源类型
export enum SelectCreateDataEnum {
    NULL = '无数据',
    STATIC = '静态数据',
    AJAX = '接口数据',
    SQL = 'SQL数据',
}

// 数据源接口
export interface SelectCreateDataType {
    label: SelectCreateDataEnum
    value: RequestDataTypeEnum
    disabled?: boolean
}
