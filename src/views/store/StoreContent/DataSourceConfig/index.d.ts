/* 服务类别 */
export enum dsTypeEnum {
    SQL_PARAM_MODEL = 'sql_param_model',
    SQL_RAZOR_MODEL = 'sql_razor_model',
    CSHARP_MODEL = 'csharp_model'
}

/* 执行方式 */
export enum executeTypeEnum {
    EXECUTE = 'execute',
    SELECT = 'select'
}

/* 返回类型 */
export enum returnTypeEnum {
    OBJECT = 'object',
    JSPN = 'json',
    BOOLEAN = 'boolean',
    DATATABLE = 'datatable',
    CSS = 'css',
    JS = 'js',
    ATTACHFILE = 'attach_file',
    TEXTPLAIN = 'text_plain'
}

/* 参数类型 */
export enum paramTypeEnum {
    'STRING' = 'string',
    'NUMBER' = 'number',
    'DATETIME' = 'datetime',
    'MULTIMEDIA' = 'multimedia'
}

/* 基础信息类型 */
export type BaseInfoType = {
    fileID: string,
    fileName: string,
    tags: string[] | string | null ,
    dsType: dsTypeEnum | null,
    executeType: executeTypeEnum | null,
    returnType: returnTypeEnum | null,
    logRecording: boolean | null,
    arbitrayParam: boolean | null,  
    accessModel: string | null,
    timeoutAddress: string | null
}

/* 参数列表类型 */
export type ParamType = {
    paramID: string,
    paramName: string,
    paramType: paramTypeEnum,
    defaultValue: string | null,
    testDefaultValue: string | null,
    comment: string | null,
    index: number
}

/* 版本类型 */
export type versionType = {
    index: number,
    storageTime: Date,
    operator: string | null,
    baseInfo: BaseInfoType,
    paramList: ParamType[],    
    script: string
}   

/* 修改历史版本 */
export type historyType = {
    targetVersion: number,
    versions: versionType[]
}   

export type DataSourceFileType = {
    baseInfo: BaseInfoType,                 // 基本信息
    paramList: ParamType[],                 // 参数列表
    script: string,                         // 脚本
    history: historyType                    // 修改历史
}

