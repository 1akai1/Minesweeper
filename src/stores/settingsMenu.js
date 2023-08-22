import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsMenuStore = defineStore('settingsMenu', () => {
  const settingsMenu = ref(false)
  function toSetSettingMenu(set) {
    settingsMenu.value = set
  }
  return { toSetSettingMenu, settingsMenu }
})
