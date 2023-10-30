<template>
    <n-form label-placement="left" label-width="auto" style="maxWidth: 540px;margin: 20px 40px;">
        <n-form-item label="*ID">
            <n-input v-model:value="baseInfo.fileID" placeholder="id" />
        </n-form-item>
        <n-form-item label="*名称">
            <n-input v-model:value="baseInfo.fileName" placeholder="name" />
        </n-form-item>
        <n-form-item label="标签">
            <n-dynamic-tags v-model:value="baseInfo.tags" />
        </n-form-item>
        <n-form-item label="服务类别">
            <n-radio-group v-model:value="baseInfo.dsType">
                <n-radio v-for="index in typeRadios" :key="index.value" :value="index.value">
                    {{ index.label }}
                </n-radio>
            </n-radio-group>
        </n-form-item>
        <n-form-item label="执行方式">
            <n-radio-group v-model:value="baseInfo.executeType">
                <n-radio v-for="index in executeRadios" :key="index.value" :value="index.value">
                    {{ index.label }}
                </n-radio>
            </n-radio-group>
            <n-checkbox v-model:checked="baseInfo.isTranscation" style="margin-left: 100px;">在事务中执行</n-checkbox>
        </n-form-item>
        <n-form-item label="返回类型">
            <n-select v-model:value="baseInfo.returnType" :options="returnOptions" />
        </n-form-item>
        <n-form-item label="记录操作日志">
            <n-checkbox v-model:checked="baseInfo.logRecording">说明：每次调用都会记入系统日志</n-checkbox>
        </n-form-item>
        <n-form-item label="任意传入参数">
            <n-checkbox v-model:checked="baseInfo.arbitrayParam">说明：参数传入和参数定义无关，由传递参数方决定</n-checkbox>
        </n-form-item>
        <n-form-item label="访问模式">
            <n-select v-model:value="baseInfo.accessModel" :options="accessModelOptions" clearable />
        </n-form-item>
        <n-form-item label="访问超时地址">
            <n-input v-model:value="baseInfo.timeoutAddress" />
        </n-form-item>
        <n-form-item label="描述信息">
            <n-input v-model:value="baseInfo.description" type="textarea" :autosize="{minRows: 2}" />
        </n-form-item>
        <n-form-item label=" ">
            <n-button style="width:200px;" @click="saveBaseInfo">保存</n-button>
        </n-form-item>
    </n-form>
</template>

<script lang='ts' setup>
import { ref, PropType, watch } from 'vue'
import { DataSourceFileType, dsTypeEnum, executeTypeEnum, returnTypeEnum, accessModelEnum } from '../index.d'
import _ from 'lodash'

const props = defineProps({
    value: {
        type: Object as PropType<DataSourceFileType>,
        required: false,
        default: {
            baseInfo: {}
        }
    }
})

const baseInfo = ref()
watch(
    () => props.value.baseInfo,
    (newValue) => {
        baseInfo.value = Object.assign({
            fileID: '',
            fileName: '',
            tags: [],
            dsType: dsTypeEnum.SQL_PARAM_MODEL,
            executeType: executeTypeEnum.SELECT,
            isTranscation: true,
            returnType: returnTypeEnum.OBJECT,
            logRecording: false,
            arbitrayParam: false,
            description: null,
            accessModel: null,
            timeoutAddress: null
        }, newValue)
    },
    {
        immediate: true,
        deep: true
    }
)

// * 服务类别
const typeRadios = [
    {
        label: 'SQL 参数模式',
        value: dsTypeEnum.SQL_PARAM_MODEL
    },
    {
        label: 'SQL Razor模式',
        value: dsTypeEnum.SQL_RAZOR_MODEL
    },
    {
        label: 'C# 脚本',
        value: dsTypeEnum.CSHARP_MODEL
    },
]

// * 执行方式
const executeRadios = [
    {
        label: '执行',
        value: executeTypeEnum.EXECUTE
    },
    {
        label: '查询',
        value: executeTypeEnum.SELECT
    }
]

// * 返回类型
const returnOptions = [
    {
        label: 'object',
        value: returnTypeEnum.OBJECT
    },
    {
        label: 'json',
        value: returnTypeEnum.JSON
    },
    {
        label: 'boolean',
        value: returnTypeEnum.BOOLEAN
    },
    {
        label: 'datatable',
        value: returnTypeEnum.DATATABLE
    },
    {
        label: 'css',
        value: returnTypeEnum.CSS
    },
    {
        label: 'js',
        value: returnTypeEnum.JS
    },
    {
        label: 'attachfile',
        value: returnTypeEnum.ATTACHFILE
    },
    {
        label: 'textplain',
        value: returnTypeEnum.TEXTPLAIN
    }
]

// * 访问模式 
const accessModelOptions = [
    {
        label: '匿名访问',
        value: accessModelEnum.ANONYMITY
    },
    {
        label: '登录后访问',
        value: accessModelEnum.AFTERLOGIN
    },
    {
        label: '用户名密码访问',
        value: accessModelEnum.CIPHER
    },
    {
        label: 'TOKEN访问',
        value: accessModelEnum.TOKEN
    }
]

// * 保存基本信息
const saveBaseInfo = () => {
    if (!baseInfo.value.fileID) {
        window['$message'].error('文件ID不能为空')
        return
    }
    if (!baseInfo.value.fileName) {
        window['$message'].error('文件名不能为空')
        return
    }
    props.value.baseInfo = _.cloneDeep(baseInfo.value)
    window['$message'].info('保存成功')

    // TODO: 对更新时间和更新人字段的更新
}

</script>

