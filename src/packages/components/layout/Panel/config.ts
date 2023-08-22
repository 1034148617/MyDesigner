import { PublicGroupConfigClass } from '@/packages/config'
import { CreateComponentGroupType } from '@/packages/index.d'
import config from './index'
import cloneDeep from 'lodash/cloneDeep'

const attr = {
    w: 200,
    h: 200,
    zIndex: 100
}

const option = {
    Hint: null,
}

const option_config = [
    {
        key: 'Hint',
        name: "提示",
        type: "string"
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

