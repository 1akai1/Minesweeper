<script setup>
import { defineEmits } from 'vue'

const props = defineProps({
  level: {
    type: String,
    Default: 'Легкий'
  },
  time: {
    type: Number,
    default: 0
  },
  game: {
    type: Boolean,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  },
  winGame: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['resetData'])
function restData() {
  emit('resetData')
}
</script>

<template>
  <div>Вы проиграли</div>
  <time datetime="">Время</time>
  <p>Уровень сложности</p>
  <div>Вы виграли ваше время уровень сложности</div>
  <div>Введите ник для сохранения результата по умолчанию ананим</div>
  <button @click="restData">Начать занова</button>
</template>

<style scoped></style>
