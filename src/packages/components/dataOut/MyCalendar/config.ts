import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType, PickCreateComponentType } from '@/packages/index.d'
import MyCalendarConfig from './index'
import cloneDeep from 'lodash/cloneDeep'
import { StyleType } from "@/packages/style.d"
import { AttrType } from '@/packages/index.d'
import { BackgroundModeEnum } from "@/enums/componentEnum"

export const style: StyleType = {
    // width: "70%",
    Background: {
        Mode: BackgroundModeEnum.THEME
    },
    Font: {
        Size: 14,
    }
}
export const attr: AttrType = {
    w: 300,
    h: 300,
    zIndex: -1
}
export const option = {
    // 功能
    dataset: '我是日历',
    isBtnYear: true,
    isBtnMonth: false,

}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = MyCalendarConfig.key
    public config = cloneDeep(MyCalendarConfig)
    public option = cloneDeep(option)

    constructor() {
        super(MyCalendarConfig.key, attr, style)
    }

}
