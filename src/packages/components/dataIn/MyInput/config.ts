import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType, PickCreateComponentType } from '@/packages/index.d'
import config from './index'
import cloneDeep from 'lodash/cloneDeep'
import { StyleType } from "@/packages/style.d"
import { AttrType } from "@/packages/index.d"
import { BackgroundModeEnum } from '@/enums/componentEnum'


export const attr: AttrType = {
    w: 150,
    h: 40,
    zIndex: -1
}

export const style: StyleType = {
    Padding: {
    },
    Background: {
        Mode: BackgroundModeEnum.TRANSPARENT
    }
}

export const option = {
    // 功能
    dataset: '',
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = config.key
    public config = cloneDeep(config)
    public option = cloneDeep(option)
    constructor() {
        super(config.key, attr, style)
    }

}
