<template>
  <div class="my-preview-content">
    <preview-render v-for="item, index in components" :item="item"></preview-render>
  </div>
</template>

<script lang='ts' setup>
import { PreviewRender } from '../PreviewRender'
import { useEditStore } from '@/store/modules/editStore/editStore'

const editStore = useEditStore()
const components = editStore.getComponentList

</script>

<style lang="scss" scoped>
@include go('preview-content') {}
</style>
