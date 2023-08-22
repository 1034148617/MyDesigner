
import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType, PickCreateComponentType } from '@/packages/index.d'
import { StyleType } from "@/packages/style"
import { ColorTypeEnum } from "../index.d"
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
    // Opacity: 0.5,
    // Cursor?: CursorEnum,
    // Background?: BackgroundType,
    // Border?: BorderType,
    // BorderRadius?: BorderRadiusType,
    // ScrollBars?: ScrollBarsTypeEnum,
    // Margin?: MarginType,
    // Padding?: PaddingType,
    // Font?: FontType
}

const attr: AttrType = {
    w: 100,
    h: 40,
    zIndex: -1
}

export const option = {
    content: '按钮',
    type: ColorTypeEnum.PRIMARY,
    SetType: "",
    leftIcon: "",
    rightIcon: "",
    plain: false,
    round: false,
    circle: false,
    disabled: false,
    link: false,
    text: false,
    loading: false
}

const option_config = [
    {
        key: "content",
        name: "按钮内容",
        type: "textarea"
    }, {
        key: "type",
        name: "类型",
        type: "enum",
        default: ColorTypeEnum
    }, {
        key: "SetType",
        name: "自定义类型",
        type: "color"
    }, {
        key: "leftIcon",
        name: "左图标",
        type: "string"
    }, {
        key: "rightIcon",
        name: "右图标",
        type: "string"
    }, {
        key: "plain",
        name: "朴素",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }, {
        key: "round",
        name: "圆角",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }, {
        key: "circle",
        name: "圆形",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }, {
        key: "disabled",
        name: "禁用",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }, {
        key: "link",
        name: "链接按钮",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }, {
        key: "text",
        name: "文本按钮",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }, {
        key: "loading",
        name: "loading",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }
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
