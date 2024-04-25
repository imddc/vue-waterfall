<template>
  <div bg-gray-2>
    <Waterfall
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

    <nav v-if="siderShow" fixed left-0 bottom-0 top-0 p-14 w-300>
      <div flex-between p-10 b="1 gray-200 solid" rounded-10 mt-14>
        <p>最小列数</p>
        <el-input-number v-model="waterfallConfig.minColumnCount" />
      </div>
      <div flex-between p-10 b="1 gray-200 solid" rounded-10 mt-14>
        <p>最大列数</p>
        <el-input-number v-model="waterfallConfig.maxColumnCount" :max="1" />
      </div>

      <div flex-between p-10 b="1 gray-200 solid" rounded-10 mt-14>
        <p>最小宽度</p>
        <el-input-number v-model="waterfallConfig.minItemWidth" />
      </div>

      <div flex-between p-10 b="1 gray-200 solid" rounded-10 mt-14>
        <p>padding</p>
        <el-input-number v-model="waterfallConfig.padding" />
      </div>

      <div flex-between p-10 b="1 gray-200 solid" rounded-10 mt-14>
        <p>gap</p>
        <el-input-number v-model="waterfallConfig.gap" />
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { data, waterfallConfig, calcHeight } = useWaterFall()
const { siderShow } = useSider()
</script>
