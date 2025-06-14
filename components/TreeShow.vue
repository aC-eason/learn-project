<template>
  <div  style="margin-left: 20px;">
    <div v-for="(value, key) in data" :key="key" class="mb-1">
      <div @click="toggle(key)" class="cursor-pointer font-semibold">
        <span v-if="isObjectOrArray(value)">
          <strong class="font-style">{{ isExpanded(key) ? '▼' : '►' }} {{ key }}</strong>
        </span>
        <span v-else>
          <strong class="font-style">{{ key }}:</strong> <a class="font-style">{{ value }}</a>
        </span>
      </div>
      <!-- 递归渲染 -->
      <div v-if="isExpanded(key) && isObjectOrArray(value)" class="ml-4 border-l border-gray-300 pl-2">
        <TreeShow :data="value" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  data: {
    type: [Object, Array],
    required: true
  }
})

const expanded = ref({})

function isObjectOrArray(val) {
  return typeof val === 'object' && val !== null
}

function toggle(key) {
  expanded.value[key] = !expanded.value[key]
}

function isExpanded(key) {
  return expanded.value[key]
}
</script>

<style scoped>
.cursor-pointer:hover {
  color: #3b82f6;
}

.font-style{
    font-size: 18px;
    line-height: 28px;
    cursor: pointer;
}
</style>
