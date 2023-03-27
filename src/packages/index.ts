import { ComponentTypeEnum, ComponentType, ConfigType } from '@/packages/index.d'
import CommonList from './components/common'
import DataList from './components/data'
import DisplayList from './components/display'
import LayoutList from './components/layout'
import StandardList from './components/standard'

/**
 * 加载所有组件
 */
const indexModules:
    Record<string, {
        [key: string]: any;
    }> = import.meta.globEager('./components/**/index.vue')

const imgModules:
    Record<string, {
        [key: string]: any;
    }> = import.meta.globEager('@/assets/img/**')

// * 所有组件
export let ComponentsList: ComponentType = {
    [ComponentTypeEnum.COMMON]: CommonList,
    [ComponentTypeEnum.DATA]: DataList,
    [ComponentTypeEnum.DISPLAY]: DisplayList,
    [ComponentTypeEnum.LAYOUT]: LayoutList,
    [ComponentTypeEnum.STANDARD]: StandardList
}

/**
 * * 获取组件
 * @param {string} id 组件标识符
 */
export const fetchComponent = (id: string) => {
    for (const key in indexModules) {
        const urlSplit = key.split('/')
        if (urlSplit[urlSplit.length - 2] === id) {
            return indexModules[key]
        }
    }
}

/**
 * 获取组件（包装）
 * @param config 配置项
 */
export const getComponent = (config: ConfigType) => {
    const { key } = config
    return fetchComponent(key)?.default
}

/**
 * 获取组件拖拽图片
 * @param config 配置项
 */
export const fetchComponentImg = (config: ConfigType) => {
    const { img } = config

    let imgName;
    if (img == null) {
        imgName = "Default.png"
    } else {
        imgName = img.substring(img.lastIndexOf('/') + 1)
    }

    for (const key in imgModules) {
        const urlSplit = key.split('/')
        if (urlSplit[urlSplit.length - 1] === imgName) {
            return imgModules[key]?.default
        }
    }
}

/**
 * * 获取目标组件配置信息
 * @param config 配置项
 */
export const createComponent = async (config: ConfigType) => {
    let addr: string;
    if (config.branch == null || config.branch == undefined) {
        addr = `./components/${config.type}/${config.key}/config.ts`
    } else {
        addr = `./components/${config.type}/${config.branch}/${config.key}/config.ts`
    }

    /* @vite-ignore */
    const component = await import(addr)
    return new component.default
}
