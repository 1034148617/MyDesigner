<template>
    <strong class="my-text" :class="{none: isShow}">
        {{ props.text }}
    </strong>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

// 仅在设计界面显示
const isShow = computed(() => {
    const route = useRoute()
    const path = route.fullPath
    if (path.includes("/component/home"))
        return false
    return true
})


</script>

<style lang="scss" scoped>
@include go(text) {
    opacity: 1;
    display: block;
    position: absolute;
    width: 100%;
    height: 18px;
    top: 50%;
    left: 0;
    margin-top: -8px;
    font-weight: normal;
    text-align: center;
    color: #9e9d9d;
    overflow: hidden;
    font-size: 16px;
    line-height: 16px;
}

.none {
    display: none
}

</style>
