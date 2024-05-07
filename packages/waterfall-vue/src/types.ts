export interface WaterfallItem {
  width: number
  height: number
  url: string
}

export type ItemType<T = any> = WaterfallItem & T

export interface RenderItem<T = any> {
  item: ItemType<T>
  index: number
  column: number
  width: number
  height: number
  left: number
  top: number
}
