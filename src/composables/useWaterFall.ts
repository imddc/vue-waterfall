import { ResponseType } from '~/types/index.dto'

const proxy_base_url = 'https://px.s.rainchan.win/'
const handlerUrl = (url: string): string => {
  url = url.replace('_p0.', '_p0_master1200.')
  url = url.replace('.png', '.jpg')
  return proxy_base_url + 'c/540x540_70/img-master/' + url
}

export const useWaterFall = () => {
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
    if (data.end) {
      return
    }

    data.page++
    const resp: ResponseType = await fetch(
      `https://mock.tatakai.top/images/${data.page}/${data.size}`
    ).then((res) => res.json())

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

  // TODO: 触底加载
  onBeforeMount(() => {
    requestData()
  })

  return {
    data
  }
}
