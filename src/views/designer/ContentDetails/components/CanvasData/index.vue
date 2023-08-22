<template>
  <div v-if="targetComponent">
    <my-setting-item name="数据源类型" :value="targetComponent.dataSource.type">
      <n-select v-model:value="targetComponent.dataSource.type" :options="selectOptions" />
    </my-setting-item>
    <n-divider />
    <!-- 静态数据 -->
    <div v-if="targetComponent.dataSource.type == RequestDataTypeEnum.STATIC">
    </div>
    <!-- 接口数据 -->
    <div v-if="targetComponent.dataSource.type == RequestDataTypeEnum.AJAX">
      <n-space vertical>
        <n-text style="font-size:16px">数据服务ID</n-text>
        <n-input v-model:value="targetComponent.dataSource.ds.dsId" type="text" placeholder="data-service id" clearable />
        <n-text style="font-size:16px">参数配置</n-text>
        <my-dynamic-input v-model:data="targetComponent.dataSource.ds.params" content="新增参数" :default="onCreate()">
          <template #default="{ item }">
            <n-input v-model:value="item.key" type="text" />
            <n-input v-model:value="item.value" type="text" />
          </template>
        </my-dynamic-input>
      </n-space>
    </div>
    <!-- sql数据 -->
    <div v-if="targetComponent.dataSource.type == RequestDataTypeEnum.SQL">
      <n-text style="font-size:16px">数据源sql:</n-text>
      <n-input v-model:value="targetComponent.dataSource.sql" type="textarea" placeholder="sql"
        style="font-size:16px;margin-top:10px;" clearable />
    </div>
    <n-divider />
    <n-space v-if="targetComponent.dataSource.type !== RequestDataTypeEnum.NULL" justify="end">
      <n-button @click="updateDataset">查看结果</n-button>
      <n-button>导出</n-button>
    </n-space>
  </div>
</template>
  
<script lang='ts' setup>
import { MySettingItem } from '@/components/Common/MyPanelItem/components/MySettingItem'
import { MyDynamicInput } from '@/components/Common/MyDynamicInput'
import { useTargetComponent } from '../../hooks/useTargetData.hook'
import { useEditStore } from '@/store/modules/editStore/editStore'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
import { SelectCreateDataType, SelectCreateDataEnum } from './index.d'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { executeDs, executeSql } from '@/api/http'
import { useMessage } from 'naive-ui'

const { targetComponent } = useTargetComponent()
const editStore = useEditStore()
const httpStore = useHttpStore()
const message = useMessage()

// 数据源类型选项
const selectOptions: SelectCreateDataType[] = [
  {
    label: SelectCreateDataEnum.NULL,
    value: RequestDataTypeEnum.NULL
  },
  {
    label: SelectCreateDataEnum.STATIC,
    value: RequestDataTypeEnum.STATIC
  },
  {
    label: SelectCreateDataEnum.AJAX,
    value: RequestDataTypeEnum.AJAX
  },
  {
    label: SelectCreateDataEnum.SQL,
    value: RequestDataTypeEnum.SQL
  }
]

// 数据服务参数动态录入
const onCreate = () => {
  return {
    key: '',
    value: ''
  }
}

// 执行sql更新dataset
const updateBySql = (): void => {
  if (!targetComponent.value.dataSource.sql) return

  targetComponent.value.dataSource.sql = targetComponent.value.dataSource.sql.trim()

  executeSql(targetComponent.value.dataSource.sql).then((res) => {
    if (!res.data.errcode) {
      targetComponent.value.dataSet = {
        type: 'Array',
        content: res.data
      }
    } else {
      message.error(`组件${targetComponent.value.value}设置sql错误,请检查`, {
        closable: true,
        duration: 3000
      })
    }
  })
}

// 执行数据服务更新dataset 
const updateByDs = async (): Promise<any> => {
  // 数据服务ID
  const dsId = targetComponent.value.dataSource.ds.dsId
  if (!dsId) return

  // 判断是否已登录
  if (!httpStore.getAjaxConfig.isConnect) {
    const loginResult = await httpStore.setConnection()
    if (!loginResult.data.IsSucceed) {
      message.error(`login failed: ${loginResult.data.Err}`, { closable: true, duration: 3000 })
      return
    }
    httpStore.resetConnect(true)
  }

  // 执行设定的数据服务
  const params = {}
  targetComponent.value.dataSource.ds.params.forEach((item: any) => {
    if (item.key == '') return
    params[item.key] = item.value
  })

  executeDs(dsId, params).then((res) => {
    if (!res.data.errcode) {
      targetComponent.value.dataSet = {
        type: 'Json',
        content: res.data.value
      }
    } else {
      message.error(`组件${targetComponent.value.value}访问接口错误:${res.data.errmsg}`, {
        closable: true,
        duration: 3000
      })
    }
  })
}

// 查看结果
const updateDataset = async (): Promise<any> => {
  if (targetComponent.value.dataSource.type == RequestDataTypeEnum.SQL) {
    updateBySql()
  } else if (targetComponent.value.dataSource.type == RequestDataTypeEnum.AJAX) {
    await updateByDs()
  }
}

</script>

<style></style>
