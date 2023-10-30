export const url_root = "http://192.168.7.53/ksyy"

export const url_loadProjectList = "http://192.168.1.78/develop/api/D6080759054B4CEF8B96C591495D5CAB.ds"

export const url_develop_base = "http://192.168.1.184:8090"
export const DEVELOP_API = {
    // 接口可用性检查
    "health": `${url_develop_base}/app/service/platform/health/health`,
    // 统一登录服务
    "login": `${url_develop_base}/app/service/user/login`,
    "logout": `${url_develop_base}/app/service/user/logout`,
    // 统一接口服务
    "useInterface":  `${url_develop_base}/app/service/platform/service/call`,
    "useNetInterface":  `${url_develop_base}/app/service/platform/service/callNetService`,
    "addInterface":  `${url_develop_base}/app/service/platform/service/add`,
    
}





























