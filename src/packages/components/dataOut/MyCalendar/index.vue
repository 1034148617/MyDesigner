<template>
  <el-calendar ref="calendar" :style="{
    ...useSizeStyle(attr),
    ...useStyle(style)
  }">
    <template #header="{ date }">
      <span>{{ date }}</span>
      <el-button-group>
        <el-button v-if="isBtnYear" size="small" @click="selectDates('prev-year')">
          上一年
        </el-button>
        <el-button v-if="isBtnMonth" size="small" @click="selectDates('prev-month')">
          上个月
        </el-button>
        <el-button v-if="isBtnMonth || isBtnYear" size="small" @click="selectDates('today')">今天</el-button>
        <el-button v-if="isBtnMonth" size="small" @click="selectDates('next-month')">
          下个月
        </el-button>
        <el-button v-if="isBtnYear" size="small" @click="selectDates('next-year')">
          下一年
        </el-button>
      </el-button-group>
    </template>
  </el-calendar>
</template>

<script lang='ts' setup>
import { PropType, ref, toRefs, watch, computed } from "vue"
import { CreateComponentType } from "@/packages/index.d"
import { } from '@element-plus/icons-vue'
import { useStyle } from '../../../hooks/useStyle.hook';
import { useSizeStyle } from '@/views/designer/ContentCanvas/hooks/useStyle.hook';

// props
const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
const { attr, style } = toRefs(props.config)
const {
  dataset,
  isBtnYear,
  isBtnMonth,

  fontSize,
  backgroundColor,
  backgroundColor_hover,
  color_hover,
  backgroundColor_selected,
  color_selected,

} = toRefs(props.config.option)

// 日历数据
const calendar = ref()
const selectDates = (val: string) => {
  calendar.value.selectDate(val)
}


</script>

<style lang="scss" scoped>
.el-calendar {
  // width: v-bind('attr');
  font-size: v-bind('fontSize + "px"');
  background-color: v-bind('backgroundColor');

  @include deep() {
    .el-calendar__header {
      height: 10%;
      padding: 0;
      padding-bottom: 12px;
    }

    .el-calendar__body {
      height: 90%;
      padding: 0;
    }

    .el-calendar-table:not(.is-range) td.prev {
      // color: v-bind('color2');
    }

    .el-calendar-table thead th {
      color: inherit;
    }

    .el-calendar-table {
      height: 100%;
    }

    .el-calendar-day {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
    }

    .el-calendar-day:hover {
      background-color: v-bind('backgroundColor_hover');
      color: v-bind('color_hover');
    }

    .is-selected>.el-calendar-day {
      background-color: v-bind('backgroundColor_selected');
      color: v-bind('color_selected');
    }
  }

}
</style>
