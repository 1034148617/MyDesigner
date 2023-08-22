export enum HttpStoreEnum {
    USER_CONFIG = 'userConfig',
    SQL_SERVER_CONFIG = 'sqlServerConfig',
    AJAX_CONFIG = 'ajaxConfig'
}

export interface HttpStoreType {
    [HttpStoreEnum.USER_CONFIG]: any
    [HttpStoreEnum.SQL_SERVER_CONFIG]: any
    [HttpStoreEnum.AJAX_CONFIG]: any
}
