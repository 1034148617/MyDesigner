<template>
    <n-space>
        <el-button v-loading.fullscreen.lock="loading" @click="onSave">保存</el-button>
        <el-button @click="rediectToPriview">预览</el-button>
    </n-space>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import _ from 'lodash'
import { useMessage } from 'naive-ui'
import { useEditStore } from '@/store/modules/editStore/editStore'
import { fetchID, getRandomNum, SaveDocument, DB, COL_CANVAS } from '@/utils'

const message = useMessage()
const route = useRoute()
const editStore = useEditStore()

const loading = ref(false)

// 保存页面相关信息
const onSave = async () => {
    const id = fetchID(route.fullPath)
    if (id == null) return

    loading.value = true                        // 保存时打开加载框
    const content = editStore.$state            // 页面状态
    content["_id"] = {
        id: id,
        updateTime: new Date().getTime(),
        code: getRandomNum()
    }

    const res = await SaveDocument(DB, COL_CANVAS, content)

    const res_code = res?.data.statue           // 接口返回码

    // 保存提示和关闭加载框
    if(res_code == 200 ){
        message.info('保存成功', { duration: 2000, closable: true })
    }else{
        message.warning('保存失败', { duration: 2000, closable: true })
    }
    loading.value = false
}
            
// 跳转到预览页面
const rediectToPriview = () => {
    const id = fetchID(route.fullPath)
    if (id == null) return

    const path = `/#/component/preview/${id}`
    const newWindow = window.open(path, '_blank')

    if (newWindow) {
        newWindow.focus();
    }
}

</script>

