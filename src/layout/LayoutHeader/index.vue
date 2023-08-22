<template>
  <n-layout-header bordered class="my-header">
    <header class="my-header-box">
      <div class="header-item left">
        <n-space>
          <slot name="left"></slot>
        </n-space>
      </div>
      <div class="header-item center">
        <slot name="center"></slot>
      </div>
      <div class="header-item right">
        <n-space>
          <slot name="ri-left"> </slot>
          <slot name="ri-right"> </slot>
        </n-space>
      </div>
    </header>
  </n-layout-header>
</template>

<script lang='ts' setup>

</script>

<style lang="scss" scoped>
$min-width: 400px;

@include go(header) {
  &-box {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);

    .header-item {
      display: flex;
      align-items: center;
      min-width: $min-width;

      &.left {
        justify-content: start;
      }

      &.center {
        justify-content: center;
      }

      &.right {
        justify-content: end;
      }
    }

    height: $--header-height;
    padding: 0 60px;
  }
}
</style>

