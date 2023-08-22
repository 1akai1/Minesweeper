<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconMine from './components/icons/IconMine.vue'
import SettingsMenu from './components/SettingsMenu.vue'
</script>

<template>
  <header class="w-[600px] mx-auto flex flex-col gap-6">
    <div class="flex gap-10 justify-center items-center mt-9">
      <IconMine class="w-16 h-16" />
      <h1 class="text-7xl text-gray-800 font-handjet">Сапёр</h1>
    </div>
    <nav
      class="grid grid-cols-3 gap-5 justify-items-stretch text-xl text-center text-stone-800 font-roboto"
    >
      <RouterLink class="px-4 py-2 rounded shadow bg-myGreen-100 hover:bg-myGreen-200" to="/"
        >Играть</RouterLink
      >
      <RouterLink class="px-4 py-2 rounded shadow bg-myGreen-100 hover:bg-myGreen-200" to="/lider"
        >Таблица лидеров</RouterLink
      >
      <SettingsMenu class="px-4 py-2 rounded shadow bg-myGreen-100 hover:bg-myGreen-200"
        >Настройки игры</SettingsMenu
      >
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
