import cloneDeep from 'lodash/cloneDeep'
import config from './index'
import { CreateComponentGroupType } from '@/packages/index.d'
import { PublicGroupConfigClass } from '@/packages/config'
import { GroupModeEnum } from '@/enums/componentEnum'

const attr = {
    w: 100,
    h: 100,
    zIndex: 1
}

const option = {
    Dock: GroupModeEnum.TOP,
}

const option_config = [
    {
        key: "Dock",
        name: "模式",
        type: "enum",
        default: GroupModeEnum
    }
]

export default class Config extends PublicGroupConfigClass implements CreateComponentGroupType {
    public key = config.key
    public config = cloneDeep(config)
    public option = cloneDeep(option)
    public optionConfig = cloneDeep(option_config)
    public groupList = []

    constructor() {
        super(config.key, attr)
    }
}

