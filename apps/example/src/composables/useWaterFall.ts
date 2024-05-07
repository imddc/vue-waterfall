import { render } from 'vue'
import Card from '~/components/Card.vue'
import { ResponseType, WaterfallItem } from '~/types/index.dto'

const proxy_base_url = 'https://px.s.rainchan.win/'
const handlerUrl = (url: string): string => {
  url = url.replace('_p0.', '_p0_master1200.')
  url = url.replace('.png', '.jpg')
  return proxy_base_url + 'c/540x540_70/img-master/' + url
}

function getRealHeight(item: WaterfallItem, width: number) {
  const div = document.createElement('div')
  render(
    h(Card, {
      data: item,
      width: width + 'px',
      noImage: true
    }),
    div
  )
  document.body.appendChild(div)
  const { height } = div.getBoundingClientRect()
  document.body.removeChild(div)
  return height
}

export const useWaterFall = () => {
  // [x]: 配置项
  const waterfallConfig = reactive({
    minColumnCount: 3,
    maxColumnCount: 6,
    minItemWidth: 150,
    padding: 10,
    gap: 10,
    loading: false,
    bottomDistance: 10
  })

  // [x]: 先请求数据
  const data = reactive<ResponseType & { end: boolean }>({
    page: 0,
    max: 0,
    size: 30,
    total: 0,
    list: [],
    end: false
  })

  async function requestData() {
    if (data.end || waterfallConfig.loading) {
      return
    }

    waterfallConfig.loading = true
    data.page++
    const resp: ResponseType = await fetch(
      `https://mock.tatakai.top/images/${data.page}/${data.size}`
    )
      .then((res) => res.json())
      .finally(() => {
        waterfallConfig.loading = false
      })

    if (resp.list.length === 0) {
      data.end = true
    }

    data.total = resp.total
    data.max = resp.max
    data.list = [
      ...data.list,
      ...resp.list.map((item) => ({
        ...item,
        url: handlerUrl(item.url)
      }))
    ]
  }

  async function checkLoadMore() {
    if (data.end || waterfallConfig.loading) {
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
    calcHeight
  }
}
