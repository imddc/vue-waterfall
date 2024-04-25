export const useSider = () => {
  const siderShow = ref(false)

  const setSider = () => {
    document.body.style.height = window.innerHeight + 'px'
    if (window.innerWidth > 768) {
      siderShow.value = true
      document.body.style.paddingLeft = 300 + 'px'
      return
    }

    siderShow.value = false
    document.body.style.paddingRight = 0 + ''
  }

  onMounted(() => {
    setSider()
    window.addEventListener('resize', setSider, false)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setSider, false)
  })

  return {
    siderShow
  }
}
