<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import LevelBox from './LevelBox.vue'
import { useSettingsMenuStore } from '../stores/settingsMenu'

const settingsMenuStore = useSettingsMenuStore()
const showSettings = computed(() => settingsMenuStore.settingsMenu)

function toSetSettingMenu() {
  if (showSettings.value) {
    settingsMenuStore.toSetSettingMenu(false)
  } else settingsMenuStore.toSetSettingMenu(true)
}

const divtest = ref()
function handleClickOutside(event) {
  if (!divtest.value || divtest.value.contains(event.target)) return
  settingsMenuStore.toSetSettingMenu(false)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="divtest" class="flex flex-col" :class="{ 'bg-myGreen-200': showSettings }">
    <button class="justify-self-center" @click="toSetSettingMenu()">
      <slot></slot>
    </button>
    <LevelBox @click.stop v-show="showSettings" />
  </div>
</template>

<style scoped></style>
