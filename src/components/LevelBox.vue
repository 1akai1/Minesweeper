<script setup>
import { ref } from 'vue'
import { useLevelStore } from '../stores/level'

const levelStore = useLevelStore()

const level = ref([
  { width: 8, height: 8, mines: 10, time: 10 },
  { width: 16, height: 16, mines: 30, time: 40 },
  { width: 32, height: 16, mines: 70, time: 100 },
  { width: null, height: null, mines: null, time: null }
])
const setLevel = ref(0)
function toSetLevel(event) {
  if (event) setLevel.value = (setLevel.value + 1) % 4
  levelStore.tochangeLevel(level.value[setLevel.value])
}
</script>

<template>
  <div class="relative">
    <div class="flex absolute flex-col justify-start py-2 w-max">
      <div class="flex">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 items-center">
            <div>Сложность:</div>
            <ul @click="toSetLevel(true)" class="flex flex-col px-2 py-1 border-2 cursor-pointer">
              <li v-if="0 === setLevel">Легкая</li>
              <li v-if="1 === setLevel">Средняя</li>
              <li v-if="2 === setLevel">Сложная</li>
              <li v-if="3 === setLevel">Своя</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="setLevel !== 3" class="grid gap-1 grid-cols">
        <p>Полe:</p>
        <p>{{ level[setLevel].width }} x {{ level[setLevel].height }}</p>
        <p>Мины:</p>
        <p>{{ level[setLevel].mines }}</p>
        <p>Минут:</p>
        <p>{{ level[setLevel].time }}</p>
      </div>
      <div v-else class="grid gap-1 grid-cols">
        <p>X:</p>
        <input
          @input="toSetLevel(false)"
          type="text"
          v-model="level[setLevel].width"
          placeholder="8"
        />
        <p>Y:</p>
        <input
          @input="toSetLevel(false)"
          type="text"
          v-model="level[setLevel].height"
          placeholder="8"
        />
        <p>Мины:</p>
        <input
          @input="toSetLevel(false)"
          type="text"
          v-model="level[setLevel].mines"
          placeholder="10"
        />
        <p>Минут:</p>
        <input
          @input="toSetLevel(false)"
          type="text"
          v-model="level[setLevel].time"
          placeholder="10"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-cols {
  grid-template-columns: min-content max-content;
}
</style>
