<template>
  <div class="my-preview">
    <preview-control>
      <div v-if="isShow">
        <preview-content></preview-content>
      </div>
    </preview-control>
  </div>  
</template>

<script lang='ts' setup>
import { PreviewContent } from './components/PreviewContent'
import { PreviewControl } from './components/PreviewControl'
import { useComInstall } from '@/hooks/useComInstall.hook'

const { isShow } = useComInstall()


</script>

<style lang="scss" scoped>
@include go('preview') {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .my-preview-scale {
    transform-origin: center center;
  }

  .my-preview-entity {
    overflow: hidden;
  }
}

</style>
