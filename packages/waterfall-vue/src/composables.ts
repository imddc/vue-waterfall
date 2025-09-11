import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export function useElementSize(el: Ref<HTMLElement | undefined>) {
  const width = ref(0)
  const height = ref(0)

  watch(
    () => el.value,
    (el) => {
      const observer = new ResizeObserver((entries) => {
        const [entry] = entries
        width.value = entry.contentRect.width
        height.value = entry.contentRect.height
      })

      if (el) {
        observer.observe(el)
      }
    },
  )

  return {
    width,
    height,
  }
}
