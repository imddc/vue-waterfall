<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import type { WaterfallItem } from '~/types/index.dto'
import Loading from './Loading.vue'

const props = withDefaults(
  defineProps<{
    data: WaterfallItem
    noImage?: boolean
    width?: number | string
  }>(),
  {
    noImage: false,
    width: '100%',
  },
)

const widthStyle = computed(() => typeof props.width === 'number' ? `${props.width}px` : props.width)

// TODO: 完成卡片
const loaded = ref(false)
const height = ref('auto')

onBeforeMount(() => {
  if (props.noImage) {
    return
  }
  height.value = '100%'
  const img = new Image()
  img.src = props.data.url
  if (img.complete) {
    loaded.value = true
    return
  }
  img.onload = () => {
    loaded.value = true
  }
  img.onerror = () => {
    console.log('img loaded error', props.data.url)
    loaded.value = true
  }
})
</script>

<template>
  <div
    :style="{ width: widthStyle }"
    class="bg-white rounded-[8px] border border-gray-300 overflow-hidden flex flex-col size-full"
  >
    <div
      v-if="!noImage"
      class="flex-center size-full bg-gray-500"
    >
      <Transition name="fade">
        <img
          v-if="loaded"
          :src="data.url"
          alt=""
          class="size-full block object-cover"
        >
        <Loading v-else />
      </Transition>
    </div>

    <div class="p-4 my-2">
      <div class="font-bold text-12">
        {{ data.title }}
      </div>
      <div class="text-gray-500 my-2">
        {{ data.author.name }}
      </div>
      <ul
        class="flex items-center flex-wrap gap-2"
      >
        <li
          v-for="item of data.tags"
          :key="item"
          class="rounded-[6px] bg-gray-200 mr-2 px-2 py-1"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
