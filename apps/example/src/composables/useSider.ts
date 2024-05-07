export const useSider = () => {
  const siderWidth = 300
  const siderShow = ref(false)

  const setSider = () => {
    document.body.style.height = window.innerHeight + 'px'
    if (window.innerWidth > 768) {
      siderShow.value = true
      document.body.style.paddingLeft = siderWidth + 'px'
    } else {
      siderShow.value = false
      document.body.style.paddingLeft = 0 + ''
    }
  }

  onMounted(() => {
    setSider()
    window.addEventListener('resize', setSider, false)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setSider, false)
  })

  return {
    siderShow,
    siderWidth
  }
}
