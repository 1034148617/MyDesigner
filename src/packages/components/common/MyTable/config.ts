
import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType, PickCreateComponentType } from '@/packages/index.d'
import { StyleType } from "@/packages/style"
import config from './index'
import cloneDeep from 'lodash/cloneDeep'
import { BackgroundModeEnum } from '@/enums/componentEnum'
import { AttrType } from "@/packages/index.d"

const style: StyleType = {
    Padding: {
        Width: 12
    },
    Background: {
        Mode: BackgroundModeEnum.COLOR
    }
}

const attr: AttrType = {
    w: 600,
    h: 400,
    zIndex: 1
}

export const option = {
    
}

const option_config: any = [
    
]

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = config.key
    public config = cloneDeep(config)
    public option = cloneDeep(option)
    public optionConfig = cloneDeep(option_config)
    constructor() {
        super(config.key, attr, style)
    }
}
