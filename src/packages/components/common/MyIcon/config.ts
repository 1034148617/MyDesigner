import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType, PickCreateComponentType } from '@/packages/index.d'
import MyIconConfig from './index'
import cloneDeep from 'lodash/cloneDeep'
import { StyleType } from "@/packages/style.d"
import { ColorTypeEnum } from "../index.d"
import { AttrType } from "@/packages/index.d"
import { BackgroundModeEnum } from '@/enums/componentEnum'


export const attr: AttrType = {
    w: 20,
    h: 20,
    zIndex: -1
}

export const style: StyleType = {
    Padding: {

    },
    Background: {
        Mode: BackgroundModeEnum.COLOR
    },
    Font: {
        Size: 20
    }

}

export const option = {
    // 功能
    type: "Edit"
}

const option_config = [
    {
        key: "type",
        name: "图标",
        type: "string"
    }
]


export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = MyIconConfig.key
    public config = cloneDeep(MyIconConfig)
    public option = cloneDeep(option)
    public optionConfig = cloneDeep(option_config)
    constructor() {
        super(MyIconConfig.key, attr, style)
    }

}
