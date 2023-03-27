<template>
  <div class="my-loading-svg my-flex-center">
    <svg-icon name="loading"></svg-icon>
  </div>
</template>
<style lang="scss" scoped>
@include go('loading-svg') {
  width: 100%;
  height: 100%;
  background-color: transparent;
  img {
    height: 50px;
  }
}
</style>
