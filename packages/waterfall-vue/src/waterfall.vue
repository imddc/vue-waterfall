<template>
  <div
    ref="containerRef"
    :style="{
      position: 'relative',
      height: Math.max(...columnTop) + 'px',
      padding: isNumber(padding) ? padding + 'px' : padding
    }"
  >
    <div
      v-for="item in itemSpaces"
      :key="item.index"
      :style="containerStyles(item)"
    >
      <slot :item="item">
        <img
          :src="item.item.url"
          alt="item url"
          style="width: 100%; height: 100%"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, CSSProperties, ref, watchEffect, withDefaults } from 'vue'
import { useElementSize } from './composables'
import { ItemType, RenderItem } from './types'

// [x]: 完成瀑布流
interface WaterfallProps {
  minColumnCount?: number
  maxColumnCount?: number
  gap?: number
  padding?: number | string
  minItemWidth?: number
  // 有默认值，因此声明为可选（withDefaults 会把解析后的类型补回非可选）
  items?: ItemType<T>[]
  calcItemHeight?: (item: any, itemWidth: number) => number
}

defineOptions({
  name: 'Waterfall'
})
const props = withDefaults(defineProps<WaterfallProps>(), {
  minColumnCount: 2,
  maxColumnCount: 5,
  gap: 10,
  padding: 10,
  minItemWidth: 200,
  items: () => [],
  calcItemHeight: (item, itemWidth) => (itemWidth * item.height) / item.width
})
defineSlots<{
  default(props: { item: RenderItem }): any
}>()

const containerStyles = (item: RenderItem): CSSProperties => ({
  position: 'absolute',
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
const columnTop = ref(Array.from({ length: columnCount.value }, () => 0))
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
  // 用空数组 + 逐位赋值：下面循环会把 0..length-1 每个位置都填上，
  // 同时避开 new Array(n) 那种「一个参数是长度还是元素」的歧义
  const spaces: RenderItem[] = []

  let start = 0
  const cache = itemSpaces.value.length && length > itemSpaces.value.length
  if (cache) {
    start = itemSpaces.value.length
  } else {
    columnTop.value = Array.from({ length: columnCount.value }, () => 0)
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
