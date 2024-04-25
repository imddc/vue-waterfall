<template>
  <div>
    card
    <div>
      <img v-if="loaded" src="" alt="" />
      <Loading v-else />
    </div>

    <div>description</div>
  </div>
</template>

<script setup lang="ts">
// TODO: 完成卡片
const loaded = ref(false)
</script>

<style></style>
