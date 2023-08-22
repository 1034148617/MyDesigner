<template>
  <n-button quaternary title="连接配置">
    <svg-icon :size="iconSize" name="Setting" style="margin-top:3px" @click="showModal = true"></svg-icon>
  </n-button>

  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 600px; height: 600px;">
      <template #header>
        <n-space>
          <n-text>全局配置</n-text>
        </n-space>
      </template>

      <n-collapse :default-expanded-names="['1']" accordion>
        <n-collapse-item title="数据库设置" name="1">
          <n-button @click="sqlConnect">测试连接</n-button>
          <n-form :label-width="100" label-placement="left" label-align="left" style="margin-top:10px">
            <n-form-item label="匿名接口地址"><n-input v-model:value="httpStore.getMssqlConfig.api" /></n-form-item>
            <n-form-item label="测试Sql"><n-input v-model:value="httpStore.getMssqlConfig.sql" /></n-form-item>
          </n-form>
        </n-collapse-item>
        <n-collapse-item title="AJAX设置" name="2">
          <n-button @click="ajaxConnect">测试连接</n-button>
          <n-button @click="testConnect" style="margin-left:15px;">接口使用测试</n-button>
          <n-text style="margin-left:20px;">当前连接状态: {{ httpStore.getAjaxConfig.isConnect ? '已连接' : '未连接' }}</n-text>
          <n-form :label-width="100" label-placement="left" label-align="left" style="margin-top:10px">
            <n-form-item label="根域名"><n-input v-model:value="httpStore.getAjaxConfig.baseUrl" /></n-form-item>
            <n-form-item label="登录页"><n-input v-model:value="httpStore.getAjaxConfig.loginPage" /></n-form-item>
            <n-form-item label="测试接口ID"><n-input v-model:value="httpStore.getAjaxConfig.testDs" /></n-form-item>
            <n-form-item label="用户名"><n-input v-model:value="httpStore.getAjaxConfig.username" /></n-form-item>
            <n-form-item label="密码"><n-input v-model:value="httpStore.getAjaxConfig.password" /></n-form-item>
          </n-form>

        </n-collapse-item>
      </n-collapse>

      <template #action>
        <n-space justify="space-between">
          <div class="my-flex-items-center"></div>
          <n-space>
            <n-button size="medium" @click="showModal = false">关闭</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { executeDs, executeSql } from '@/api/http'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
const httpStore = useHttpStore()
const message = useMessage()

const iconSize = ref(20)

const showModal = ref(false)

const sqlConnect = () => {
  executeSql(httpStore.getMssqlConfig.sql).then((res) => {
    console.log(res)
    const result = res.data.errcode
    if (!result) {
      message.info("sql execute success", { closable: true, duration: 3000 })
    } else {
      message.error("sql execute error", { closable: true, duration: 3000 })
    }
  })
}

const ajaxConnect = () => {
  httpStore.setConnection().then(res => {
    const statue = res.data.IsSucceed   // 连接状态
    if (statue) {
      httpStore.resetConnect(true)
      message.info("ajax connect success", { closable: true, duration: 3000 })
    } else {
      message.error(`ajax connect failed, ${res.data.Err}`, { closable: true, duration: 3000 })
    }
  })
}

const testConnect = () => {
  executeDs(httpStore.getAjaxConfig.testDs).then((res) => {
    console.log(res)
    message.info(`result: ${res.data.value}`, { closable: true, duration: 3000 })
  })
}


</script>

