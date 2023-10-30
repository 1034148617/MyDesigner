import { accessModelEnum, type ParamType } from '../DataSourceConfig/index.d'


/* 基础信息类型 */
export type BaseInfoType = {
    fileID: string
    fileName: string
    tags: string[] | null
    modultID: string | null
    description: string | null
    // TODO: 修改页面主题配置为主题类型
    theme: string | null
    accessModel: accessModelEnum | null
    timeoutAddress: string | null
}

/* 脚本类型 */
export enum scriptTypeEnum {
    "INIT" = 'initScript',
    "MOUNTED" = "mountedScript",
    "TIMING" = "timingScript",
    "TRIGGER" = 'triggerScript'
}

export enum scriptTypeNameEnum {
    "INIT" = '初始化前脚本',
    "MOUNTED"  = '初始化后脚本',
    "TIMING" = '定时脚本',
    "TRIGGER" = '触发脚本'
}

export type scriptType = {
    [scriptTypeEnum.INIT]: string | null
    [scriptTypeEnum.MOUNTED]: string | null
    [scriptTypeEnum.TIMING]: string | null
    [scriptTypeEnum.TRIGGER]: string | null
}

/* 版本类型 */
export type versionType = {
    index: number
    version: string
    storageTime: Date
    operator: string | null
    baseInfo: BaseInfoType
    paramList: ParamType[]
    script: scriptType
}

/* 修改历史版本 */
export type historyType = {
    targetVersion: number
    versions: versionType[]
}


/* 页面文件类型 */
export type FrameworkFileType = {
    baseInfo: BaseInfoType // 基本信息
    paramList: ParamType[] // 参数列表  
    script: scriptType // 脚本
    history: historyType // 修改历史
}
