import { ComponentTypeEnum, ComponentType, ConfigType, ComponentModeEnum } from '@/packages/index.d'
import { PublicConfigClass, PublicGroupConfigClass } from '@/packages/config'
import CommonList from './components/common'
import LayoutList from './components/layout'
import _ from 'lodash'

// * 加载所有组件vue入口
export const indexModules:
    Record<string, {
        [key: string]: any;
    }> = import.meta.glob('./components/**/index.vue', { eager: true })

// * 加载所有组件配置文件
export const configModules:
Record<string, {
    [key: string]: any;
}> = import.meta.glob('./components/**/*.ts', { eager: true })

// * 加载所有组件配置文件（config.vue）
export const settingModules:
Record<string, {
    [key: string]: any;
}> = import.meta.glob('@/packages/components/**/config.vue', { eager: true })

// * 加载组件拖拽图片配置
export const imgModules:
    Record<string, {
        [key: string]: any;
    }> = import.meta.glob('@/assets/img/**', { eager: true })

// * 加载所有组件
export let ComponentsList: ComponentType = {
    [ComponentTypeEnum.COMMON]: CommonList,
    [ComponentTypeEnum.LAYOUT]: LayoutList,
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


/***********************************************************************************/
// * 组件实例创建入口
export const createComponent = async (config: ConfigType) => {
    const { mode } = config

    if (mode == ComponentModeEnum.ATOM) {
        return await createAtomComponent(config)
    } else if (mode == ComponentModeEnum.GROUP) {
        return await createGroupComponent(config)
    } else if (mode == ComponentModeEnum.MOLECULE) {
        
    }
}

// * 获取组件定义的文件对象
export const getDefineType = async (config: ConfigType, file: string) => {
    let addr: string;
    if (config.branch == null || config.branch == undefined) {
        addr = `./components/${config.type}/${config.key}/${file}.ts`
    } else {
        addr = `./components/${config.type}/${config.branch}/${config.key}/${file}.ts`
    }

    if(addr in configModules){
        const file_obj = await import(addr)
        return file_obj.default
    }else{
        return null
    }
}

// * 创建原子组件
export const createAtomComponent = async (config: ConfigType) => {
    const component = new PublicConfigClass(config)

    const attr = await getDefineType(config, 'attr')
    const style = await getDefineType(config, 'style')
    const event = await getDefineType(config, 'event')
    const option = await getDefineType(config, 'option')

    if (attr) {
        Object.assign(component.attr, attr)
    }
    if (style) {
        Object.assign(component.style, style)
    }
    if (event) {
        Object.assign(component.events, event)
    }
    if (option) {
        Object.assign(component.option, option)
    }

    console.log(component)
    return component
}

// * 创建容器分子组件
export const createGroupComponent = async (config: ConfigType) => {
    const component = new PublicGroupConfigClass(config)

    const attr = await getDefineType(config, 'attr')
    const style = await getDefineType(config, 'style')
    const event = await getDefineType(config, 'event')
    const option = await getDefineType(config, 'option')


    if (attr) {
        Object.assign(component.attr, attr)
    }
    if (style) {
        Object.assign(component.style, style)
    }
    if (event) {
        Object.assign(component.events, event)
    }
    if (option) {
        Object.assign(component.option, option)
    }

    console.log(component)
    return component
}

// * 创建分子组件
export const createMoleculrComponent = async (config: ConfigType) => {
    


}
/***********************************************************************************/






















