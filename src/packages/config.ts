import _ from 'lodash'
import { BaseEvent } from '@/enums/eventEnum'
import { GroupModeEnum, ScrollBarsTypeEnum } from '@/enums/componentEnum'
import { ComponentInitConfig } from '@/settings/designSetting'
import {
    ConfigType,
    AttrType,
    StatusType,
    EventType,
    CreateComponentType,
    CreateComponentGroupType,
    ComponentOption
} from "@/packages/index.d"
import { getUUID } from '@/utils'
import { StyleType } from '@/packages/style.d'

export class PublicConfigClass implements CreateComponentType {
    public id: string
    public isGroup: boolean
    public name: string
    public attr: AttrType
    public dock: GroupModeEnum
    public status: StatusType
    public layers: number
    public style: StyleType
    public events: EventType
    public config: ConfigType
    public option: { [key: string]: ComponentOption }

    constructor(config: ConfigType) {
        this.id = getUUID()
        this.isGroup = false
        this.name = config.key
        this.attr = {
            w: 100,
            h: 40,
            zIndex: -1,
            x: ComponentInitConfig.x,
            y: ComponentInitConfig.y,
            offsetX: ComponentInitConfig.offsetX,
            offsetY: ComponentInitConfig.offsetY
        }
        this.dock = GroupModeEnum.NONE
        this.status = {
            load: true,
            lock: false,
            hide: false,
            enabled: true
        }
        this.layers = 1
        this.style = {
            Opacity: 1,
            ScrollBars: ScrollBarsTypeEnum.NONE,
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
        this.events = {
            baseEvents: {
                [BaseEvent.ON_LOADING]: null,
                [BaseEvent.ON_CLICK]: null,
                [BaseEvent.ON_MOUSEENTER]: null,
                [BaseEvent.ON_MOUSELEAVE]: null,
                [BaseEvent.ON_RESIZE]: null,
            },
            componentEvents: {}
        }
        this.config = _.cloneDeep(config)
        this.option = {}
    }
}

export class PublicGroupConfigClass extends PublicConfigClass implements CreateComponentGroupType {
    public groupList: Array<CreateComponentType | CreateComponentGroupType>

    constructor(config: ConfigType) {
        super(config)
        this.isGroup = true
        this.dock = GroupModeEnum.TOP
        this.groupList = []
    }
}



