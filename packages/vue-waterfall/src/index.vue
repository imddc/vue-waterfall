<template>
  <div
    ref="containerRef"
    :style="{
      height: Math.max(...columnTop) || 100 + 'px',
      padding: isNumber(padding) ? padding + 'px' : padding
    }"
    relative
  >
    <div
      v-for="item in itemSpaces"
      :key="item.index"
      :style="containerStyles(item)"
      absolute
    >
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, withDefaults } from 'vue'

import { useElementSize } from './composables'

export interface WaterfallItem {
  id: number
  title: string
  ts: number
  width: number
  height: number
  tags: string[]
  statistic: {
    bookmarks: number
    likes: number
    comments: number
    views: number
  }
  url: string
  author: {
    id: number
    name: string
    bio: string
    avatar: string
    background: string
  }
}
export interface RenderItem {
  item: WaterfallItem
  index: number
  column: number
  width: number
  height: number
  left: number
  top: number
}

// [x]: 完成瀑布流
interface WaterfallProps {
  minColumnCount?: number
  maxColumnCount?: number
  gap?: number
  padding?: number | string
  minItemWidth?: number
  items: WaterfallItem[]
  calcItemHeight?: (item: any, itemWidth: number) => number
}

const props = withDefaults(defineProps<WaterfallProps>(), {
  minColumnCount: 2,
  maxColumnCount: 5,
  gap: 10,
  padding: 10,
  minItemWidth: 200,
  items: () => [],
  calcItemHeight: () => 250
})
defineSlots<{
  default(props: { item: RenderItem }): any
}>()

const containerStyles = (item: RenderItem) => ({
  width: item.width + 'px',
  height: item.height + 'px',
  transition: 'all 0.3s ease-in-out',
  transform: `translate(${item.left}px, ${item.top}px)`
})

const containerRef = ref<HTMLDivElement>()
const { width: containerWidth } = useElementSize(containerRef)

const columnCount = computed<number>(() => {
  if (!containerWidth.value) {
    return 0
  }
  if (containerWidth.value > props.minItemWidth * 2) {
    const count = Math.floor(containerWidth.value / props.minItemWidth)
    if (props.maxColumnCount && props.maxColumnCount < count) {
      return props.maxColumnCount
    }
    return count
  }
  return props.minColumnCount
})
const columnTop = ref(new Array(columnCount.value).fill(0))
const itemWidth = computed(() => {
  if (!containerRef.value || columnCount.value <= 0) {
    return 0
  }
  const gapWidth = (columnCount.value - 1) * props.gap
  return Math.ceil((containerWidth.value - gapWidth) / columnCount.value)
})

const itemSpaces = ref<RenderItem[]>([])
watchEffect(() => {
  if (!columnCount.value) {
    itemSpaces.value = []
    return
  }
  const length = props.items.length
  const spaces = new Array(length)

  let start = 0
  const cache = itemSpaces.value.length && length > itemSpaces.value.length
  if (cache) {
    start = itemSpaces.value.length
  } else {
    columnTop.value = new Array(columnCount.value).fill(0)
  }

  for (let i = 0; i < length; i++) {
    if (cache && i < start) {
      spaces[i] = itemSpaces.value[i]
      continue
    }
    const columnIndex = getColumnIndex()
    const top = columnTop.value[columnIndex]
    const left = (itemWidth.value + props.gap) * columnIndex
    const height = props.calcItemHeight(props.items[i], itemWidth.value)

    const space: RenderItem = {
      index: i,
      column: columnIndex,
      item: props.items[i],
      top,
      left,
      width: itemWidth.value,
      height
    }

    columnTop.value[columnIndex] += height + props.gap
    spaces[i] = space
  }

  itemSpaces.value = spaces
})

function isNumber(v: number | string) {
  return typeof v === 'number'
}
function getColumnIndex() {
  return columnTop.value.indexOf(Math.min(...columnTop.value))
}
</script>

<style></style>
