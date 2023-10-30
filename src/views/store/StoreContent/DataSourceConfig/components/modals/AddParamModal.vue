<template>
    <n-modal v-model:show="modalVisible" class="custom-card" preset="card" :style="bodyStyle" title="新增变量" size="huge"
        :mask-closable="false">
        <n-form ref="formRef" :model="param" label-placement="left" label-align="right" label-width="90"
            require-mark-placement="left" :rules="rules">
            <n-form-item label="参数编号" path="paramID" :show-require-mark="true">
                <n-input v-model:value="param.paramID" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item label="参数名称" path="paramName" :show-require-mark="true">
                <n-input v-model:value="param.paramName" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item label="参数类型">
                <n-select v-model:value="param.paramType" :options="typeOptions">
                </n-select>
            </n-form-item>
            <n-form-item label="默认值">
                <n-input v-model:value="param.defaultValue" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item label="测试默认值">
                <n-input v-model:value="param.testDefaultValue" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item label="备注">
                <n-input v-model:value="param.comment" type="textarea" :autosize="{ minRows: 2, maxRows: 3 }" />
            </n-form-item>
            <n-form-item label="显示顺序" path="index" :show-require-mark="true">
                <n-input-number v-model:value="param.index" style="width: 230px;" :min="0" />
            </n-form-item>
        </n-form>
        <template #footer>
            <n-space justify="end">
                <n-button type="primary" @click="onConfirm">确定</n-button>
                <n-button @click="closeModal">取消</n-button>
            </n-space>
        </template>
    </n-modal>
</template>
  
<script lang="ts" setup>
import { ref, watch, PropType, onMounted } from 'vue'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { ParamType, paramTypeEnum } from '../../index.d'
import { checkParamCode } from '@/utils'

const props = defineProps({
    showModal: {
        type: Boolean,
        reqiure: true
    },
    params: {
        type: Object as PropType<Array<ParamType>>,
        require: false,
        default: []
    }
})

const param = ref<ParamType>({
    paramID: 'param01',
    paramName: '',
    paramType: paramTypeEnum.STRING,
    defaultValue: '',
    testDefaultValue: '',
    comment: '',
    index: 10
})

onMounted(() => {
    if (props.params.length > 0) {
        const targetParam = props.params[props.params.length - 1]
        param.value.paramID = targetParam.paramID + '1'
        param.value.index = targetParam.index + 10
    }
})

const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
    paramID: {
        required: true,
        validator(rule: FormItemRule, value: string) {
            if (!value) {
                return new Error('参数编号不能为空')
            } else if (!checkParamCode(value)) {
                return new Error('参数编号不符合规则')
            } else if (props.params.map(item=> item.paramID).includes(value)){
                return new Error('参数编号已存在')
            }

            return true
        },
        trigger: ['change', 'blur']
    },
    paramName: {
        required: true,
        message: '请输入参数名',
        trigger: ['input', 'blur']
    },
    index: {
        required: true,
        validator(rule: FormItemRule, value: string) {
            if (!value) {
                return new Error('显示顺序不能为空')
            } else if (!/^\d*$/.test(value)) {
                return new Error('显示顺序需要整数')
            }
            return true
        },
        trigger: ['change', 'blur']
    }
}

const typeOptions = [
    {
        label: '字符型',
        value: paramTypeEnum.STRING
    },
    {
        label: '数字型',
        value: paramTypeEnum.NUMBER
    },
    {
        label: '日期型',
        value: paramTypeEnum.DATETIME
    },
    {
        label: '多媒体型',
        value: paramTypeEnum.MULTIMEDIA
    },
]

const bodyStyle = {
    width: '400px'
}

const modalVisible = ref(false)
watch(() => props.showModal, (newValue) => {
    modalVisible.value = newValue
})

const emits = defineEmits(['add', 'close'])

const onConfirm = (e: MouseEvent) => {
    formRef.value?.validate((errors) => {
        if (!errors) {
            emits('add', param.value)
            closeModal()
        } else {
            window['$message'].error('添加失败')
        }
    })

}

const closeModal = () => {
    emits('close')
    modalVisible.value = false
}

</script>