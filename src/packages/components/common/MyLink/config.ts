import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType, PickCreateComponentType } from '@/packages/index.d'
import MyLinkConfig from './index'
import cloneDeep from 'lodash/cloneDeep'
import { StyleType } from "@/packages/style.d"
import { ColorTypeEnum } from "../index.d"
import {
    GroupModeEnum,
    BorderStyleEnum,
    ScrollBarsTypeEnum,
    BackgroundModeEnum
} from '@/enums/componentEnum'
import { AttrType } from "@/packages/index.d"
import { clone } from 'lodash'



const attr: AttrType = {
    w: 100,
    h: 30,
    zIndex: -1
}

export const style: StyleType = {
    Background: {
        Mode: BackgroundModeEnum.COLOR
    },
}

export enum LinkTypeEnum {
    OUT = "外部链接",
    IN = "内部链接"
}

export const option = {
    // 功能
    content: '链接内容',
    type: ColorTypeEnum.PRIMARY,
    target: false,
    link: 'https://baidu.com',
    disabled: false,
    underline: true,
    LinkType: LinkTypeEnum.OUT
}

export const option_config = [
    {
        key: "content",
        name: "链接文案",
        type: "textarea"
    }, {
        key: "type",
        name: "类型",
        type: "enum",
        default: ColorTypeEnum
    }, {
        key: "LinkType",
        name: "跳转类型",
        type: "select",
        default: [
            {
                label: "外部链接",
                value: "a"
            }, {
                label: "内部链接",
                value: "b"
            }
        ]
    }, {
        key: "link",
        name: "跳转链接",
        type: "string"
    }, {
        key: "target",
        name: "跳转方式",
        type: "select",
        default: [
            {
                label: "当前窗口",
                value: false
            }, {
                label: "新窗口",
                value: true
            }
        ]
    }, {
        key: "disabled",
        name: "禁用",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }, {
        key: "underline",
        name: "下划线",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        }
    }
]

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = MyLinkConfig.key
    public config = cloneDeep(MyLinkConfig)
    public option = cloneDeep(option)
    public optionConfig = cloneDeep(option_config)
    constructor() {
        super(MyLinkConfig.key, attr, style)
    }

}
