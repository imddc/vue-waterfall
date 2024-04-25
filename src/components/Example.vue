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

    <Sider v-if="siderShow" />
  </div>
</template>

<script setup lang="ts">
const { data, waterfallConfig, calcHeight } = useWaterFall()
const { siderShow } = useSider()
</script>
