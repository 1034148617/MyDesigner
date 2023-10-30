<template>
  <div class="my-icon-picker" @click="modalRef = !modalRef"></div>
  <my-modal
    v-model="modalRef"
    title="选择图标"
    @close="modalRef = false"
    :width="width"
    :height="height"
    top="10vh"
    showSwitch
    draggable
    resizable
    switchable
    center
  >
    <n-card style="margin-bottom: 16px">
      <n-tabs type="line" animated>
        <n-tab-pane name="font" tab="字体图标">
          <font-icon-load />
        </n-tab-pane>
        <n-tab-pane name="img" tab="图片图标">
          <img-icon-load />
        </n-tab-pane>
        <n-tab-pane name="svg" tab="svg图标">
          <svg-icon-load />
        </n-tab-pane>
      </n-tabs>
    </n-card>

    <template #footer>
      <el-button>确定</el-button>
      <el-button @click="modalRef = false">取消</el-button>
    </template>
  </my-modal>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { MyModal } from "@/components/Common/MyModal"
import FontIconLoad from './FontIconLoad.vue'
import ImgIconLoad from './ImgIconLoad.vue'
import SvgIconLoad from './SvgIconLoad.vue'

const modalRef = ref(false)
const width = ref(1000)
const height = ref(580)

const selectIcon = ref<string>()





</script>

<style lang="scss" scoped>
@include go(icon-picker) {
  width: 30px;
  height: 30px;
}
</style>
