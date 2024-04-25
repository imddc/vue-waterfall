<template>
  <div
    :style="{ width, height }"
    bg-white
    rounded-8
    overflow-hidden
    b-1
    b-solid
    flex
    flex-col
  >
    <div v-if="!noImage" flex-center w-full h-full bg-bluegray>
      <Transition name="fade">
        <img
          v-if="loaded"
          :src="data.url"
          alt=""
          w-full
          h-full
          block
          object-cover
        />
        <Loading v-else />
      </Transition>
    </div>

    <div p-4 my-2>
      <div font-bold text-12>{{ data.title }}</div>
      <div text-gray-500 text-10 my-2>{{ data.author.name }}</div>
      <ul flex items-center flex-wrap gap-2>
        <li
          v-for="item of data.tags"
          :key="item"
          rounded-2
          bg-amber
          mr-2
          p-1
          text-10
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WaterfallItem } from '~/types/index.dto'

const props = withDefaults(
  defineProps<{
    data: WaterfallItem
    noImage?: boolean
    width?: number | string
  }>(),
  {
    noImage: false,
    width: '100%'
  }
)

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
