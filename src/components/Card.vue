<template>
  <div bg-white>
    <div bg-gray-2 rounded overflow-hidden>
      <img v-if="loaded" :src="data.url" alt="" />
      <Loading v-else />
    </div>

    <div>description</div>
  </div>
</template>

<script setup lang="ts">
import { WaterfallItem } from '~/types/index.dto'

const props = defineProps<{
  data: WaterfallItem
}>()

console.log(props.data)

// TODO: 完成卡片
const loaded = ref(false)
const height = ref('auto')

onBeforeMount(() => {
  height.value = '100%'
  new Promise((resolve) => {
    const img = new Image()
    if (img.complete) {
      loaded.value = true
      resolve(true)
    }
    img.onload = () => {
      loaded.value = true
      resolve(true)
    }
    img.onerror = () => {
      console.log('img loaded error', props.data.url)
      loaded.value = true
      resolve(true)
    }

    img.src = props.data.url
  })
})
</script>

<style></style>
