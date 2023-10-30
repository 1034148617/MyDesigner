/* 服务类别 */
export enum dsTypeEnum {
  SQL_PARAM_MODEL = "sql_param_model",
  SQL_RAZOR_MODEL = "sql_razor_model",
  CSHARP_MODEL = "csharp_model",
}

/* 执行方式 */
export enum executeTypeEnum {
  EXECUTE = "execute",
  SELECT = "select",
}

/* 返回类型 */
export enum returnTypeEnum {
  OBJECT = "object",
  JSON = "json",
  BOOLEAN = "boolean",
  DATATABLE = "datatable",
  CSS = "css",
  JS = "js",
  ATTACHFILE = "attach_file",
  TEXTPLAIN = "text_plain",
}

/* 参数类型 */
export enum paramTypeEnum {
  "STRING" = "string",
  "NUMBER" = "number",  
  "DATETIME" = "datetime",  
  "MULTIMEDIA" = "multimedia",
}

/* 格式化字符串选择 */
export enum formatParamEnum {
  "ALL" = 'all',
  "SCRIPT" = 'script',
  "BASE" = 'base',
  "PARAM" = 'param'
}3 

/* 访问模式 */
export enum accessModelEnum {
  "ANONYMITY" = 'anonymity',
  "AFTERLOGIN" = 'afterLogin',
  "CIPHER" = 'cipher',
  'TOKEN' = 'token'
}

/* 基础信息类型 */
export type BaseInfoType = {
  fileID: string
  fileName: string
  tags: string[] | null
  dsType: dsTypeEnum | null
  executeType: executeTypeEnum | null
  isTranscation: boolean | null
  returnType: returnTypeEnum | null
  logRecording: boolean | null
  arbitrayParam: boolean | null
  description: string | null
  // 可支持访问模式的类型枚举
  accessModel: accessModelEnum | null
  timeoutAddress: string | null
}

/* 参数列表类型 */
export type ParamType = {
  paramID: string
  paramName: string
  paramType: paramTypeEnum
  defaultValue: string | null
  testDefaultValue: string | null
  comment: string | null
  index: number
}

/* 版本类型 */
export type versionType = {
  index: number
  version: string
  storageTime: Date
  operator: string | null
  baseInfo: BaseInfoType
  paramList: ParamType[]
  script: string
}

/* 修改历史版本 */
export type historyType = {
  targetVersion: number
  versions: versionType[]
}



/* 数据服务文件类型 */
export type DataSourceFileType = {
  baseInfo: BaseInfoType // 基本信息
  paramList: ParamType[] // 参数列表
  script: string // 脚本
  history: historyType // 修改历史
}
