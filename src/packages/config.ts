import { BaseEvent, EventLife } from '@/enums/eventEnum';
import { ComponentInitConfig } from '@/settings/designSetting'
import { AttrType, PublicConfigType, CreateComponentType, CreateComponentGroupType } from "@/packages/index.d";
import { getUUID } from '@/utils';
import { StyleType } from '@/packages/style.d';

// 单组件实例类
export class PublicConfigClass implements PublicConfigType {
    public id = getUUID()
    public isGroup = false
    public layers = 1
    public status = {
        load: true,
        lock: false,
        hide: false,
        enabled: true
    }
    public style = {
        Opacity: undefined,
        Background: {
            Color: undefined,
            ImageUrl: undefined,
            Mode: undefined
        },
        Border: {
            Width: undefined,
            Style: undefined,
            Color: undefined,
            TopWidth: undefined,
            RightWidth: undefined,
            BottomWidth: undefined,
            LeftWidth: undefined,
            TopStyle: undefined,
            RightStyle: undefined,
            BottomStyle: undefined,
            LeftStyle: undefined,
            TopColor: undefined,
            RightColor: undefined,
            BottomColor: undefined,
            LeftColor: undefined,
        },
        BorderRadius: {
            Radius: undefined,
            TopLeftRadius: undefined,
            TopRightRadius: undefined,
            BottomLeftRadius: undefined,
            BottomRightRadius: undefined
        },
        ScrollBars: undefined,
        Margin: {
            Width: undefined,
            Top: undefined,
            Bottom: undefined,
            Left: undefined,
            Right: undefined
        },
        Padding: {
            Width: undefined,
            Top: undefined,
            Bottom: undefined,
            Left: undefined,
            Right: undefined
        },
        Font: {
            Color: undefined,
            Size: undefined,
            LineHeight: undefined,
            Weight: undefined,
            Family: undefined,
            Style: undefined,
            TextAlign: undefined,
            TextDecoration: undefined
        }
    }
    public events = {
        baseEvent: {
            [BaseEvent.ON_CLICK]: undefined,
            [BaseEvent.ON_DBL_CLICK]: undefined,
            [BaseEvent.ON_MOUSE_ENTER]: undefined,
            [BaseEvent.ON_MOUSE_LEAVE]: undefined
        },
        advancedEvents: {
            [EventLife.VNODE_MOUNTED]: undefined,
            [EventLife.VNODE_BEFORE_MOUNT]: undefined
        }
    }
    public value: string
    public attr: AttrType

    constructor(key: string, attr: AttrType, style: StyleType) {
        // 默认name
        this.value = key
        // 基本属性设置
        this.attr = {
            x: ComponentInitConfig.x,
            y: ComponentInitConfig.y,
            w: attr.w,
            h: attr.h,
            zIndex: attr.zIndex,
            offsetX: ComponentInitConfig.offsetX,
            offsetY: ComponentInitConfig.offsetY
        }
        Object.assign(this.style, style)
    }
}

// 容器组件实例类
export class PublicGroupConfigClass extends PublicConfigClass {
    public isGroup = true
    public groupList: Array<CreateComponentType | CreateComponentGroupType> = []

    constructor(key: string, attr: AttrType, style: StyleType) {
        super(key, attr, style)
    }
}




