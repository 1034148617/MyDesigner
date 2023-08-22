<template>
  <!-- 事件配置 -->
  <n-collapse class="my-mt-3" arrow-placement="right" :default-expanded-names="['1']">
    <n-text depth="3">
      组件 Name:
      <n-text>{{ targetComponent.value }}</n-text>
    </n-text>
    <n-collapse-item title="事件配置" name="1">
      <template #header-extra>
        <n-button type="primary" tertiary size="small" @click.stop="showModal = true">
          查看代码
        </n-button>
      </template>
      <n-data-table :columns="columns" :data="EventData" />
    </n-collapse-item>
  </n-collapse>
  <!-- 编辑器弹窗 -->
  <n-modal class="my-data-monaco-editor" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1200px; height: 700px">
      <template #header>
        <n-space>
          <n-text>事件编辑器</n-text>
        </n-space>
      </template>

      <template #header-extra> </template>

      <n-layout has-sider>
        <n-layout-sider :collapsed-width="14" :width="280" show-trigger="bar" collapse-mode="transform"
          content-style="padding: 12px 12px 0px 12px;margin-left: 3px;">

        </n-layout-sider>
        <n-layout style="height: 580px; padding-left: 20px">
          <n-tabs v-model:value="editTab" type="card" tab-style="min-width: 100px;">
            <n-tab-pane v-for="(eventName, index) in Events" :key="index"
              :tab="`${EventTypeName[eventName]}-${eventName}`"
              :name="eventName">
              <!-- 函数名称 -->
              <p class="my-pl-3">
                <span class="func-keyword">function &nbsp;&nbsp;</span>
                <span class="func-keyNameWord">{{ eventName }}(mouseEvent)&nbsp;&nbsp;{</span>
              </p>
              <!-- 编辑主体 -->
              <monaco-editor v-model:modelValue="EventContent[eventName]" height="480px" language="javascript" />
              <!-- 函数结束 --> 
              <p class="my-pl-3 func-keyNameWord">}</p>
            </n-tab-pane>
          </n-tabs>
        </n-layout>
      </n-layout>

      <template #action>
        <n-space justify="space-between">
          <div class="my-flex-items-center"></div>
          <n-space>
            <n-button size="medium" type="primary" @click="saveEvents">保存</n-button>
            <n-button size="medium" @click="closeEvents">取消</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { h, ref, computed, watch } from 'vue'
import { MonacoEditor } from '@/components/Base/MonacoEditor'
import { BaseEvent, ComponentEvent } from '@/enums/eventEnum'
import { NButton } from 'naive-ui'
import { useTargetComponent } from '../../hooks/useTargetData.hook'
const { targetComponent } = useTargetComponent()

// 事件名
const EventTypeName = {
  [BaseEvent.ON_LOADING]: '加载后',
  [BaseEvent.ON_CLICK]: '点击',
  [BaseEvent.ON_MOUSEENTER]: '鼠标移入',
  [BaseEvent.ON_MOUSELEAVE]: '鼠标移出',
  [BaseEvent.ON_RESIZE]: '大小改变'
}

// 受控弹窗
const showModal = ref(false)
// 编辑区域控制
const editTab = ref('loading')
// events 函数模板
let EventContent = ref({ ...targetComponent.value.events.baseEvent, ...targetComponent.value.events.componentEvent })

// 显示列
type EventRow = {
  event: string
}
const columns = [
  {
    title: '事件',
    key: 'event'
  },
  {
    title: '值',
    key: 'actions',
    render(row: EventRow) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => {
            showModal.value = true
            editTab.value = row.event.slice(3)
          }
        },
        { default: () => '编辑' }
      )
    }
  }
]

// 通用事件函数展示
const EventData = computed(() => {
  const Events = {}
  Object.assign(Events, targetComponent.value.events.baseEvents)
  Object.assign(Events, targetComponent.value.events.componentEvents)
  const datas = Object.entries(Events).map(item => {
    return {
      event: 'on_' + item[0],
      value: '编辑'
    }
  })
  return datas
})

// 通用事件函数
const Events =  computed(() => {
  const Events = {}
  Object.assign(Events, targetComponent.value.events.baseEvents)
  Object.assign(Events, targetComponent.value.events.componentEvents)
  return Object.entries(Events).map(item => item[0])
})

// 取消按钮
const closeEvents = () => {
  showModal.value = false
}

// 保存按钮
const saveEvents = () => {

  const formatFunctions = ()=>{
    console.log(EventContent)
  }
  
  formatFunctions()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) {
      EventContent.value = { ...targetComponent.value.events.baseEvent, ...targetComponent.value.events.componentEvent }
    }
  }
)

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

