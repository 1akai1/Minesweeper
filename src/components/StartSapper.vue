<script setup>
import { computed, ref, watch } from 'vue'
import { useLevelStore } from '../stores/level'
import TimerBox from './TimerBox.vue'
import CountFlag from './CountFlag.vue'

const levelStore = useLevelStore()

const data = computed(() => levelStore.changeLevel)

const ifToMine = ref(false)
const ifStartGame = ref(false)
const ifStopGame = ref(false)
const ifWinGame = ref(null)

const cells = ref(dataAndRest())
const openCell = ref(0)
const sumFlag = ref(0)
let mines = ref(data.value.mines)

function dataAndRest() {
  if (data.value.width > 50) return
  if (data.value.height > 50) return
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

function toStart(row, column) {
  if (ifStopGame.value) return
  if (!ifStartGame.value) ifStartGame.value = true
  if (cells.value[row][column].question > 0) return

  if (!ifToMine.value) {
    toMine(row, column)
    ifToMine.value = true
  }
  toOpenCell(row, column)

  if (data.value.height * data.value.width - data.value.mines === openCell.value) {
    console.log('win')
    ifStartGame.value = false
    ifStopGame.value = true
    ifWinGame.value = true
    return
  }
  if (cells.value[row][column].mine && cells.value[row][column].flag === 0) {
    console.log('lost')
    ifStartGame.value = false
    ifStopGame.value = true
    ifWinGame.value = false
    iter((item) => {
      if (item.mine) {
        item.open = true
      }
    })
    return
  }
}

function restData() {
  ifToMine.value = false
  openCell.value = 0
  ifWinGame.value = null
  ifStopGame.value = false
  ifStartGame.value = false
  mines.value = data.value.mines
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

function toOpenCell(row, column) {
  if (cells.value[row][column].open) return
  if (cells.value[row][column].mine) return
  openCell.value++
  cells.value[row][column].flag = 0
  cells.value[row][column].question = 0
  cells.value[row][column].open = true
  if (cells.value[row][column].countMine === 0) {
    search(row, column, (r, c) => toOpenCell(r, c))
  }
}

function iter(fun) {
  for (const rowCell of cells.value) {
    for (const columnCell of rowCell) {
      fun(columnCell)
    }
  }
}

function flag(row, column) {
  if (cells.value[row][column].open) return
  cells.value[row][column].question = (cells.value[row][column].question + 1) % 3
  if (cells.value[row][column].question === 1) cells.value[row][column].flag = 1
  else cells.value[row][column].flag = 0
  sumFlag.value = 0
  iter((item) => {
    sumFlag.value += item.flag
  })
}
function countShowMine(row, column, show) {
  if (!ifToMine.value) return
  cells.value[row][column].countShow = show
  search(row, column, (r, c) => {
    cells.value[r][c].light = show
  })
}

watch(
  () => data,
  () => {
    restData()
  },
  { deep: true }
)
</script>
<template>
  <div class="grid grid-cols-2 gap-6 mt-5 mb-4 text-xl font-roboto text-stone-800">
    <button
      class="px-4 py-2 rounded shadow hover:bg-myGreen-200 bg-myGreen-100"
      @click="restData()"
    >
      Рестарт
    </button>
    <div class="flex gap-3 justify-self-end">
      <div class="flex gap-2 px-4 py-2 rounded shadow bg-myGreen-100">
        <p>⌛</p>
        <TimerBox
          @ifSendStop="
            (e) => {
              ifStopGame = e
            }
          "
          :ifStartTimer="ifStartGame"
          :ifStopTimer="ifStopGame"
          :time="data.time"
        />
      </div>
      <div class="flex gap-2 px-4 py-2 rounded shadow bg-myGreen-100">
        <p>🚩 =</p>
        <CountFlag :count="data.mines - sumFlag"></CountFlag>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-1 items-center" @contextmenu.prevent>
    <div v-for="(cellRow, row) in cells" :key="row" class="flex gap-1">
      <div
        v-for="(cellColumn, column) in cellRow"
        :key="column"
        class="flex justify-center items-center w-4 h-4 rounded-sm cursor-pointer md:w-5 md:h-5 lg:w-6 lg:h-6 cell hover:bg-myGreen-200 bg-myGreen-100"
        :class="[
          {
            active: cellColumn.open,
            mine: cellColumn.mine,
            activeMine: cellColumn.countShow,
            light: cellColumn.light
          }
        ]"
        @click="toStart(row, column)"
        @click.right="flag(row, column)"
        @mousedown.middle="countShowMine(row, column, true)"
        @mouseup.middle="countShowMine(row, column, false)"
      >
        <p
          v-if="cellColumn.countMine > 0 && cellColumn.open"
          class="text-2xl font-medium"
          :class="`mines-${cellColumn.countMine}`"
        >
          {{ cellColumn.countMine }}
        </p>
        <div v-else>
          <p v-if="cellColumn.flag == 1" class="">🚩</p>
          <p v-if="cellColumn.question == 2" class="">❔</p>
        </div>
      </div>
    </div>
  </div>

  <!-- <DialogWindow @resetData="restData"></DialogWindow> -->
</template>

<style scoped>
.cell {
  box-shadow:
    2px 1px 2px 0px #cacaca,
    inset 2px 1px 3px 0px #96f88d75;
}

.active {
  background-color: rgb(197, 197, 197);
  box-shadow: inset 1px 1px 2px 1px #a0a0a0;
}
.mine.active {
  background-image: url(../assets/IconMine.svg);
  background-position: center;
  background-size: 70%;
  background-repeat: no-repeat;
}
.mines-1 {
  color: blue;
}
.mines-2 {
  color: green;
}
.mines-3 {
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
