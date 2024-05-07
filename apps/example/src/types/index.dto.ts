export interface ResponseType {
  page: number
  max: number
  size: number
  total: number
  list: WaterfallItem[]
}

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
