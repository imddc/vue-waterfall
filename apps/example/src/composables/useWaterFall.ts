import type { WaterfallItem } from '~/types/index.dto'
import { h, onBeforeMount, reactive, ref, render } from 'vue'
import Card from '~/components/Card.vue'
import { mockData } from '~/utils'

function getRealHeight(item: WaterfallItem, width: number) {
  const div = document.createElement('div')
  render(
    h(Card, {
      data: item,
      width,
      noImage: true,
    }),
    div,
  )
  document.body.appendChild(div)
  const { height } = div.getBoundingClientRect()
  document.body.removeChild(div)
  return height
}

export function useWaterFall() {
  // [x]: 配置项
  const waterfallConfig = reactive({
    minColumnCount: 3,
    maxColumnCount: 6,
    minItemWidth: 150,
    padding: 10,
    gap: 10,
    loading: false,
    bottomDistance: 10,
  })

  // [x]: 先请求数据
  const data = ref<WaterfallItem[]>([])
  async function requestData() {
    if (waterfallConfig.loading) {
      return
    }

    waterfallConfig.loading = true
    const resp = await mockData()
      .finally(() => {
        waterfallConfig.loading = false
      })

    data.value.push(...resp)
  }

  async function checkLoadMore() {
    if (waterfallConfig.loading) {
      return
    }

    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop

    const distance = scrollHeight - clientHeight - scrollTop

    if (distance <= waterfallConfig.bottomDistance) {
      await requestData()
    }

    requestAnimationFrame(checkLoadMore)
  }

  const calcHeight = (item: WaterfallItem, itemWidth: number) => {
    const { width, height } = item
    const realHeight = getRealHeight(item, itemWidth)
    return (itemWidth * height) / width + realHeight
  }

  // [x]: 触底加载
  onBeforeMount(() => {
    checkLoadMore()
  })

  return {
    data,
    waterfallConfig,
    calcHeight,
  }
}
