<template>
  <div>
    example
    <Waterfall />

    <div>
      <div v-for="item of data.list" :key="item.id">
        {{ item.url }}
        <img :src="item.url" alt="" />
      </div>
    </div>

    <nav>this is a nav</nav>
  </div>
</template>

<script setup lang="ts">
// TODO: use component

const { data } = useWaterFall()
watchEffect(() => {
  console.log(data)
})
</script>

<style></style>
