import { PublicGroupConfigClass } from '@/packages/config'
import {
    GroupModeEnum,
    BorderStyleEnum,
    ScrollBarsTypeEnum,
    BackgroundModeEnum
} from '@/enums/componentEnum'
import { CreateComponentGroupType } from '@/packages/index.d'
import config from './index'
import cloneDeep from 'lodash/cloneDeep'

const attr = {
    w: 200,
    h: 200
}

const style = {
    ScrollBars: ScrollBarsTypeEnum.NONE,
    // Border: {
    //     Width: 0,
    //     Style: BorderStyleEnum.SOLID
    // },
}

const option = {
    Hint: null,
    Dock: GroupModeEnum.TOP,
    check_box_test: ['a'],
    switch: true,
    textarea_test: null
}

const option_config = [
    {
        key: 'Hint',
        name: "提示",
        type: "string"
    },
    {
        key: "Dock",
        name: "模式",
        type: "enum",
        default: GroupModeEnum
    },
    {
        key: "check_box_test",
        name: "多选框",
        type: "checkbox",
        default: ['a','b','c']
    },
    {
        key: "switch_test",
        name: "开关",
        type: "switch",
        default: {
            checked: "选择",
            unchecked: "未选择"
        }
    },
    {
        key: "textarea_test",
        name: "文本域",
        type: "textarea",
        default: "请输入"
    }
]

export default class Config extends PublicGroupConfigClass implements CreateComponentGroupType {
    public key = config.key
    public config = cloneDeep(config)
    public option = cloneDeep(option)
    public option_config = cloneDeep(option_config)
    public groupList = []

    constructor() {
        super(config.key, attr, style)
    }
}

