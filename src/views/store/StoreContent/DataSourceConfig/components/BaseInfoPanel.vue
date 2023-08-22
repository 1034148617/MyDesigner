<template>
    <n-form label-placement="left" label-width="auto" style="maxWidth: 540px;margin: 20px 40px;">
        <n-form-item label="*ID">
            <n-input placeholder="id" />
        </n-form-item>
        <n-form-item label="*名称">
            <n-input placeholder="name" />
        </n-form-item>
        <n-form-item label="标签">
            <n-dynamic-tags v-model:value="tags" />
        </n-form-item>
        <n-form-item label="服务类别">
            <n-radio-group v-model:value="dsType">
                <n-radio v-for="index in typeRadios" :key="index.value" :value="index.value">
                    {{ index.label }}
                </n-radio>
            </n-radio-group>
        </n-form-item>
        <n-form-item label="执行方式">
            <n-radio-group v-model:value="executeType">
                <n-radio v-for="index in executeRadios" :key="index.value" :value="index.value">
                    {{ index.label }}
                </n-radio>
            </n-radio-group>
            <input type="checkbox" checked="true" class="radio" style="margin-left: 100px;">在事务中执行
        </n-form-item>
        <n-form-item label="返回类型">
            <n-select v-model:value="returnType" :options="returnOptions" />
        </n-form-item>
        <n-form-item label="记录操作日志">
            <input type="checkbox" class="radio">说明：每次调用都会记入系统日志
        </n-form-item>
        <n-form-item label="任意传入参数">
            <input type="checkbox" class="radio">说明：参数传入和参数定义无关，由传递参数方决定
        </n-form-item>
        <n-form-item label="访问模式">
            <n-input />
        </n-form-item>
        <n-form-item label="访问超时地址">
            <n-input />
        </n-form-item>
        <n-form-item label=" ">
            <n-button style="width:200px;">保存</n-button>
        </n-form-item>
    </n-form>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

// * 标签
const tags = ref(['界面', '加载'])

// * 服务类别
const dsType = ref('SQL 参数模式')
const typeRadios = [
    {
        label: 'SQL 参数模式',
        value: 'SQL 参数模式'
    },
    {
        label: 'SQL Razor模式',
        value: 'SQL Razor模式'
    },
    {
        label: 'C# 脚本',
        value: 'C# 脚本'
    },
]

// * 执行方式
const executeType = ref('执行')
const executeRadios = [
    {
        label: '执行',
        value: '执行'
    },
    {
        label: '查询',
        value: '查询'
    }
]

// * 返回类型
const returnType = ref('Object')
const returnOptions = [
    {
        label: 'Object',
        value: 'Object'
    }
]
</script>

