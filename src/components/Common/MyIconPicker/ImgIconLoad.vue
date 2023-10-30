<template>
  <div class="my-icon-loader"></div>
</template>

<script lang="ts" setup>
import { imgIconsList, getImgType } from './load';


console.log(getImgType())
// console.log(imgIconsList)

</script>

<style>
.my-icon-loader {
  height: 510px;
}
</style>
