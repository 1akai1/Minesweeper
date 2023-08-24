import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_GET = 'https://mines1weeper.netlify.app/api/get'
const API_ADD = 'https://mines1weeper.netlify.app/api/add'

export const useGetAddDataStore = defineStore('getAddData', () => {
  const data = ref()
  const error = ref()

  const level = ref()
  const time = ref()
  async function toGetData() {
    try {
      const response = await axios.get(API_GET)
      data.value = response.data
    } catch (error) {
      error.value = error
    }
  }

  async function toAddData() {
    try {
      return await axios.post(API_ADD, {
        level: level.value,
        time: time
      })
    } catch (error) {
      error.value = error
    }
  }

  function toSetTime(data) {
    time.value = data
  }
  function toSetLevel(data) {
    level.value = data
  }
  return { toGetData, toAddData, toSetTime, toSetLevel, data, error }
})
