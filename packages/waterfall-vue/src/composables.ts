import { ref, Ref, watch } from 'vue'

export const useElementSize = (el: Ref<HTMLElement | undefined>) => {
  const width = ref(0)
  const height = ref(0)

  watch(
    () => el.value,
    (element) => {
      const observer = new ResizeObserver((entries) => {
        const [entry] = entries
        width.value = entry.contentRect.width
        height.value = entry.contentRect.height
      })

      if (element) {
        observer.observe(element)
      }
    }
  )

  return {
    width,
    height
  }
}
