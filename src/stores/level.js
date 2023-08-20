import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLevelStore = defineStore('level', () => {
  const changeLevel = ref({ width: 8, height: 8, mines: 10, time: 10 })
  function tochangeLevel(level) {
    changeLevel.value = level
  }
  return { tochangeLevel, changeLevel }
})
