<script setup>
import { computed, ref, watch } from 'vue'
import { useLevelStore } from '../stores/level'
import TimerBox from './TimerBox.vue'
import CountFlag from './CountFlag.vue'
import DialogWindow from './DialogWindow.vue'

// const data = ref({
//   width: 0,
//   height: 0,
//   mines: 0,
//   time: 0
// })
const levelStore = useLevelStore()
const data = computed(() => levelStore.changeLevel)
const cells = ref(dataAndRest())

const ifMine = ref(false)
const ifStopGame = ref(true)

let mines = ref(data.value.mines)
const pointWinGame = ref(0)
const sumFlag = ref(0)
const winGame = ref(null)

function dataAndRest() {
  return Array.from({ length: data.value.width }, () =>
    Array.from({ length: data.value.height }, () => ({
      mine: false,
      countMine: 0,
      open: false,
      flag: 0,
      question: 0,
      countShow: false,
      light: false
    }))
  )
}

function start(row, column) {
  if (data.value.height * data.value.width <= mines.value) return
  if (!ifStopGame.value) return
  if (cells.value[row][column].question > 0) return
  if (!ifMine.value) {
    toMine(row, column)
    ifMine.value = true
  }
  openZeroCell(row, column)
  if (data.value.height * data.value.width - data.value.mines === pointWinGame.value) {
    // restData()
    ifStopGame.value = false
    winGame.value = true
    return
  }
  if (cells.value[row][column].mine && cells.value[row][column].flag === 0) {
    // restData()
    ifStopGame.value = false
    winGame.value = false
    return
  }
}

function restData() {
  ifMine.value = false
  pointWinGame.value = 0
  winGame.value = null
  ifStopGame.value = true
  mines = ref(data.value.mines)
  cells.value = dataAndRest()
}

function toMine(r, c) {
  while (mines.value > 0) {
    const row = Math.floor(Math.random() * data.value.width)
    const column = Math.floor(Math.random() * data.value.height)
    if (row === r && column === c) continue
    if (cells.value[row][column].mine) continue
    cells.value[row][column].mine = true
    cells.value[row][column].countMine = 0
    mines.value--
    search(row, column, (r, c) => {
      if (cells.value[r][c].mine) {
        cells.value[r][c].countMine = 0
      } else {
        cells.value[r][c].countMine++
      }
    })
  }
}

function search(row, column, callback) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue
      if (row + i < 0) continue
      if (row + i >= data.value.width) continue
      if (column + j < 0) continue
      if (column + j >= data.value.height) continue
      callback(row + i, column + j)
    }
  }
}

function openZeroCell(row, column) {
  if (cells.value[row][column].open) return
  cells.value[row][column].flag = 0
  if (cells.value[row][column].countMine > 0) cells.value[row][column].open = true
  if (cells.value[row][column].countMine === 0) {
    cells.value[row][column].open = true
    pointWinGame.value++

    search(row, column, (r, c) => openZeroCell(r, c))
  }
}

watch(
  () => data,
  () => {
    console.log('watch startsapper')
    restData()
  }
)

watch(
  cells,
  (cells) => {
    console.log('watch')
    sumFlag.value = 0
    for (const x of cells) {
      for (const y of x) {
        sumFlag.value += y.flag
      }
    }
  },
  { deep: true }
)

function flag(row, column) {
  if (data.value.height * data.value.width <= mines.value) return
  if (cells.value[row][column].open) return
  cells.value[row][column].question = (cells.value[row][column].question + 1) % 3
  if (cells.value[row][column].question === 1) cells.value[row][column].flag = 1
  else cells.value[row][column].flag = 0
}
function countShowMine(row, column, show) {
  if (!ifMine.value) return
  cells.value[row][column].countShow = show
  search(row, column, (r, c) => {
    cells.value[r][c].light = show
  })
}
</script>

<template>
  <div class="flex flex-col gap-2 p-5" @contextmenu.prevent>
    <div class="flex gap-2 mx-auto" v-for="(cell, row) in cells" :key="row">
      <div
        class="flex justify-center items-center w-10 h-10 cursor-pointer cell"
        :class="[{ active: x.open, mine: x.mine, activeMine: x.countShow, light: x.light }]"
        v-for="(x, column) in cell"
        :key="column"
        @click="start(row, column)"
        @click.right="flag(row, column)"
        @mousedown.middle="countShowMine(row, column, true)"
        @mouseup.middle="countShowMine(row, column, false)"
      >
        <p v-if="x.countMine > 0 && x.open" class="text-3xl" :class="`mines-${x.countMine}`">
          {{ x.countMine }}
        </p>
        <div v-else>
          <p v-if="x.flag == 1" class="">🚩</p>
          <p v-if="x.flag == 2" class="">❔</p>
        </div>
      </div>
    </div>
  </div>
  <TimerBox :start="ifStopGame" :time="data.time"></TimerBox>
  <CountFlag :count="data.mines - sumFlag"></CountFlag>
  <button @click="restData">ddd</button>
  <DialogWindow @resetData="restData"></DialogWindow>
</template>

<style scoped>
.cell {
  background-color: rgb(201, 201, 201);
}

.active {
  background-color: rgb(161, 161, 161);
}
.mine {
  background-color: black;
}
.mines-1 {
  color: blue;
}
.mines-2 {
  color: green;
}
.mines- {
  color: red;
}
.mines-4 {
  color: rgb(29, 29, 114);
}
.mines-5 {
  color: brown;
}
.mines-6 {
  color: aquamarine;
}
.mines-7 {
  color: black;
}
.mines-8 {
  color: white;
}

.light {
  background-color: aquamarine;
}
</style>
