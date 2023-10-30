export enum pageOpenTypeEnum {
    EMBED = 'embed',            // 内嵌
    BLANK = "blank",           // 新窗口
    DIALOG = 'dialog'         // 对话框
}

export enum pageOpenNameEnum {
    embed = '内嵌',
    blank = '新窗口',
    dialog = '对话框',
}

// 导航菜单(路由)节点类型
export type NavigationNode = {
    nodeID: string
    nodeName: string
    children?: NavigationNode[] | null
    targetUrl?: string | null
    description?: string | null
    openModel?: pageOpenTypeEnum | null 
    index?: number | null
    icon?: string | null
    isUse?: boolean | null
}

// 导航菜单样式类型
export type NavigationStyle = {
    
}

// 导航菜单方案类型
export type NavigationOption = {
    nodes: NavigationNode[]
    style: NavigationStyle | null
}

// 项目导航菜单配置
export type ProjectNavigation = {
    projectID: string                       // 项目ID
    targetOption: string | null             // 选择方案
    options: {                              // 方案
        [key: string]: NavigationOption
    }
    homepage: string | null                 // 主页：页面ID
    roleHomePage: {                         // 角色默认主页
        [key: string]: string | null
    }
}








