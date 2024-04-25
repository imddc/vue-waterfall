<template>
  <div>
    example
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

    <nav>this is a nav</nav>
  </div>
</template>

<script setup lang="ts">
// TODO: use component

const { data, waterfallConfig, calcHeight } = useWaterFall()
watchEffect(() => {
  console.log(data)
})
</script>

<style></style>
