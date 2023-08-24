<script setup>
import { ref } from 'vue'
import { useLevelStore } from '../stores/level'
import { useGetAddDataStore } from '../stores/getAddData'

const levelStore = useLevelStore()
const getAddDataStore = useGetAddDataStore()
const level = ref([
  { width: 8, height: 8, mines: 10, time: 10 },
  { width: 16, height: 16, mines: 30, time: 40 },
  { width: 16, height: 32, mines: 70, time: 100 },
  { width: NaN, height: NaN, mines: NaN, time: NaN }
])

const setLevel = ref(0)
function toSetLevel(event) {
  if (!event) {
    for (const item in level.value[setLevel.value]) {
      if (typeof level.value[setLevel.value][item] !== 'number') {
        level.value[setLevel.value][item] = NaN
      }
    }
  }
  if (event === true) setLevel.value = (setLevel.value + 1) % 4
  if (
    level.value[setLevel.value].width * level.value[setLevel.value].height <=
    level.value[setLevel.value].mines
  )
    return
  levelStore.tochangeLevel(level.value[setLevel.value])
  getAddDataStore.toSetLevel(setLevel.value)
}
</script>

<template>
  <div class="relative">
    <div
      class="flex absolute flex-col justify-start px-7 py-2 pb-6 mt-6 w-max rounded shadow-sm bg-myGreen-200"
    >
      <div class="flex m-2">
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
      <div v-else class="grid gap-1 items-center grid-cols">
        <p>X:</p>
        <input
          type="number"
          class="px-1 py-1 w-[60px] placeholder-gray-600 bg-white rounded border appearance-none"
          v-model="level[setLevel].width"
          placeholder="<50"
        />
        <p>Y:</p>
        <input
          type="number"
          class="px-1 py-1 w-[60px] placeholder-gray-600 bg-white rounded border appearance-none"
          v-model="level[setLevel].height"
          placeholder="<50"
        />
        <p>Мины:</p>
        <input
          type="number"
          class="px-1 py-1 w-[60px] placeholder-gray-600 bg-white rounded border appearance-none"
          v-model="level[setLevel].mines"
          placeholder="<2499"
        />
        <p>Минут:</p>
        <input
          type="number"
          class="px-1 py-1 w-[60px] placeholder-gray-600 bg-white rounded border appearance-none"
          v-model="level[setLevel].time"
          placeholder="10"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: rgb(184, 184, 184);
  box-shadow: inset 1px 2px 3px 1px #525252;
  border-radius: 5px;
}
.grid-cols {
  grid-template-columns: min-content max-content;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input[type='number']:hover,
input[type='number']:focus {
  -moz-appearance: number-input;
}
</style>
