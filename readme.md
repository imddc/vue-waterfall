## waterfall-vue

vue响应式瀑布流

### DEMO

[vue-waterfall.vercel.app](https://vue-waterfall.vercel.app)

### installation

#### requirements

vue^3.2.0

#### Node

```sh
npm install waterfall-vue
```

### usage

```vue
<template>
  <Waterfall
    :gap="waterfallConfig.gap"
    :padding="waterfallConfig.padding"
    :min-item-width="waterfallConfig.minItemWidth"
    :min-column-count="waterfallConfig.minColumnCount"
    :max-column-count="waterfallConfig.maxColumnCount"
    :items="waterfallConfig.data"
  >
    <!-- items -->
    <template #default="{ item }">
      <div class="item">{{ item }}</div>
    </template>
  </Waterfall>
</template>

<script setup>
import { Waterfall } from 'waterfall-vue'

const waterfallConfig = reactive({
  gap: 10,
  padding: 10,
  minItemWidth: 200,
  minColumnCount: 2,
  maxColumnCount: 4,
  data: [...]
})
</script>
```
