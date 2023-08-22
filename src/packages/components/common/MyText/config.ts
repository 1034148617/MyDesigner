import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType, PickCreateComponentType } from '@/packages/index.d'
import MyTextConfig from './index'
import cloneDeep from 'lodash/cloneDeep'
import { StyleType } from "@/packages/style.d"
import { ColorTypeEnum } from "../index.d"
import { AttrType } from "@/packages/index.d"
import { BackgroundModeEnum, BorderStyleEnum } from '@/enums/componentEnum'



export const attr: AttrType = {
    w: 100,
    h: 30,
    zIndex: -1
}

export const style: StyleType = {
    Padding: {},
}

export const option = {
    // 功能
    content: '文本内容',
    type: ColorTypeEnum.PRIMARY,
    textEllipsis: ""
}
const option_config = [
    {
        key: "content",
        name: "文本内容",
        type: "textarea"
    }, {
        key: "type",
        name: "文本类型",
        type: "enum",
        default: ColorTypeEnum
    }, {
        key: "textEllipsis",
        name: "最大行数",
        type: "number"
    }
]

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = MyTextConfig.key
    public config = cloneDeep(MyTextConfig)
    public option = cloneDeep(option)
    public option_config = cloneDeep(option_config)
    constructor() {
        super(MyTextConfig.key, attr, style)
    }

}
