enum ColorTypeEnum {
    DEFAULT = "default",
    PRIMARY = "primary",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger"
}

export default [
    {
        id: "content",
        label: "按钮内容",
        type: "string",
        value: '按钮'
    },
    {
        id: "type",
        label: "类型",
        type: "enum",
        default: ColorTypeEnum,
        value: ColorTypeEnum.PRIMARY
    }, 
    {
        id: "SetType",
        label: "自定义类型",
        type: "color",
        value: ""
    }, 
    {
        id: "leftIcon",
        label: "左图标",
        type: "string",
        value: ""
    }, 
    {
        id: "rightIcon",
        label: "右图标",
        type: "string",
        value: ""
    },
    {
        id: "plain",
        label: "朴素",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        },
        value: false
    }, 
    {
        id: "round",
        label: "圆角",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        },
        value: false
    }, 
    {
        id: "circle",
        label: "圆形",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        },
        value: false
    }, 
    {
        id: "disabled",
        label: "禁用",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        },
        value: false
    }, 
    {
        id: "link",
        label: "链接按钮",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        },
        value: false
    }, 
    {
        id: "text",
        label: "文本按钮",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        },
        value: false
    }, 
    {
        id: "loading",
        label: "loading",
        type: "switch",
        default: {
            checked: '是',
            unchecked: '否'
        },
        value: false
    }
]