<script setup lang="ts">
import { ElInputNumber } from 'element-plus'
import { Waterfall } from 'vue-waterfall'
import Card from './components/Card.vue'
import Loading from './components/Loading.vue'
import { useWaterFall } from './composables/useWaterFall'
import { toRefs, watchEffect } from 'vue'

const { data, waterfallConfig, calcHeight } = useWaterFall()

// [x]: 根据col计算 反推配置项
const { minColumnCount, maxColumnCount, minItemWidth } = toRefs(waterfallConfig)

function handleSetMinColumnCount(num: number | undefined) {
  if (typeof num !== 'number') {
    return
  }

  const containerWidth = document.body.clientWidth
  const col = Math.floor(containerWidth / minItemWidth.value)

  if (col < 2) {
    return
  }

  if (num > maxColumnCount.value) {
    return
  }

  minColumnCount.value = num
}

function handleSetMaxColumnCount(num: number | undefined) {
  if (typeof num !== 'number') {
    return
  }
  if (num < minColumnCount.value) {
    return
  }
  const containerWidth = document.body.clientWidth
  const col = Math.floor(containerWidth / minItemWidth.value)

  if (num > col) {
    return
  }
  maxColumnCount.value = num
}

function handleSetMinItemWidth(num: number | undefined) {
  if (typeof num !== 'number') {
    return
  }
  const containerWidth = document.body.clientWidth
  const col = Math.floor(containerWidth / num)

  if (col < 2) {
    return
  }

  minItemWidth.value = num
}

watchEffect(() => {
  const containerWidth = document.body.clientWidth
  const col = Math.floor(containerWidth / minItemWidth.value)

  if (maxColumnCount.value > col) {
    maxColumnCount.value = col
  }

  if (minColumnCount.value > col) {
    minColumnCount.value = col
  }
})
</script>

<template>
  <div class="bg-gray-200">
    <Transition name="fade">
      <div v-if="!data.length" class="h-screen flex-center w-full">
        <Loading />
      </div>

      <Waterfall
        v-else
        :gap="waterfallConfig.gap"
        :padding="waterfallConfig.padding"
        :min-item-width="waterfallConfig.minItemWidth"
        :min-column-count="waterfallConfig.minColumnCount"
        :max-column-count="waterfallConfig.maxColumnCount"
        :calc-item-height="calcHeight"
        :items="data"
      >
        <template #default="{ item }">
          <Card :data="item.data" />
        </template>
        <template #header>
          <div class="font-bold text-right">
            Header
          </div>
        </template>
      </Waterfall>
    </Transition>

    <div v-if="waterfallConfig.loading" class="flex-center mt-16">
      <span class="text-gray-500 bg-gray-200 rounded-full px-4 py-2"> load more ...</span>
    </div>

    <nav
      class="fixed left-10 top-10 p-14 w-300 space-y-14 bg-gray-500/50 backdrop-blur-3xl rounded-3xl shadow-2xl"
    >
      <div class="sider-item-wrap">
        <p>最小列数</p>
        <ElInputNumber
          :model-value="minColumnCount"
          :min="2"
          :max="10"
          @update:model-value="handleSetMinColumnCount"
        />
      </div>

      <div class="sider-item-wrap">
        <p>最大列数</p>
        <ElInputNumber
          :model-value="maxColumnCount"
          :min="2"
          :max="10"
          @change="handleSetMaxColumnCount"
        />
      </div>

      <div class="sider-item-wrap">
        <p>最小宽度</p>
        <ElInputNumber :model-value="waterfallConfig.minItemWidth" @update:model-value="handleSetMinItemWidth" />
      </div>

      <div class="sider-item-wrap">
        <p>padding</p>
        <ElInputNumber v-model="waterfallConfig.padding" :min="0" />
      </div>

      <div class="sider-item-wrap">
        <p>gap</p>
        <ElInputNumber v-model="waterfallConfig.gap" :min="0" />
      </div>
    </nav>
  </div>
</template>
