<template>
  <router-view #default="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath"></component>
    </transition>
  </router-view>
</template>
