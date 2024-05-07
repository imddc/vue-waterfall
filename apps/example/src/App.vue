<template>
  <div bg-gray-2>
    <Transition name="fade">
      <div v-if="!data.list.length" h-screen flex-center w-full>
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
        :items="data.list"
      >
        <template #default="{ item }">
          <Card :data="item.item" />
        </template>
      </Waterfall>
    </Transition>

    <nav v-if="siderShow" fixed left-0 bottom-0 top-0 p-14 w-300>
      <div sider-item-wrap>
        <p>最小列数</p>
        <el-input-number
          :model-value="minColumnCount"
          :min="2"
          :max="10"
          @update:model-value="handleSetMinColumnCount"
        />
      </div>

      <div sider-item-wrap>
        <p>最大列数</p>
        <el-input-number
          :model-value="maxColumnCount"
          :min="2"
          :max="10"
          @change="handleSetMaxColumnCount"
        />
      </div>

      <div sider-item-wrap>
        <p>最小宽度</p>
        <el-input-number
          :model-value="waterfallConfig.minItemWidth"
          @update:model-value="handleSetMinItemWidth"
        />
      </div>

      <div sider-item-wrap>
        <p>padding</p>
        <el-input-number v-model="waterfallConfig.padding" :min="0" />
      </div>

      <div sider-item-wrap>
        <p>gap</p>
        <el-input-number v-model="waterfallConfig.gap" :min="0" />
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import Waterfall from 'vue-waterfall'

const { data, waterfallConfig, calcHeight } = useWaterFall()
const { siderShow, siderWidth } = useSider()

// [x]: 根据col计算 反推配置项
const { minColumnCount, maxColumnCount, minItemWidth } = toRefs(waterfallConfig)

function handleSetMinColumnCount(num: number | undefined) {
  if (typeof num !== 'number') {
    return
  }

  const containerWidth = document.body.clientWidth - siderWidth
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
  const containerWidth = document.body.clientWidth - siderWidth
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
  const containerWidth = document.body.clientWidth - siderWidth
  const col = Math.floor(containerWidth / num)

  if (col < 2) {
    return
  }

  minItemWidth.value = num
}

watchEffect(() => {
  const containerWidth = document.body.clientWidth - siderWidth
  const col = Math.floor(containerWidth / minItemWidth.value)

  if (maxColumnCount.value > col) {
    maxColumnCount.value = col
  }

  if (minColumnCount.value > col) {
    minColumnCount.value = col
  }
})
</script>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
