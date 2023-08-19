<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['level'])
const level = ref({
  Easy: { width: 8, height: 8, mines: 10, time: 10 },
  Normal: { width: 16, height: 16, mines: 30, time: 40 },
  Hard: { width: 32, height: 16, mines: 70, time: 100 },
  NA: { width: 0, height: 0, mines: 0, time: 100 }
})
const selectedItem = ref(level.value.Easy)

function Start() {
  emit('level', selectedItem.value)
}
</script>

<template>
  <div>
    <!-- добавить кнопку старта и выбранный уровень по умолчанию и уже отталкиваться от этого -->
    <label for="my-select">Выберите элемент:</label>
    <select id="my-select" v-model="selectedItem">
      <option v-for="(value, key) in level" :key="key" :value="value">{{ key }}</option>
    </select>
    <p v-if="selectedItem">Выбранный элемент: {{ selectedItem }}</p>
    <div v-if="selectedItem === level.NA">
      <input type="text" v-model="selectedItem.width" />
      <input type="text" v-model="selectedItem.height" />
      <input type="text" v-model="selectedItem.mines" />
      <input type="text" v-model="selectedItem.time" />
    </div>
    <button @click="Start">Start</button>
  </div>
</template>

<style scoped></style>
