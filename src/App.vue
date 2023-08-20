<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconMine from './components/icons/IconMine.vue'
import SettingsMenu from './components/SettingsMenu.vue'
</script>

<template>
  <header class="w-[800px] mt-7 mx-auto flex flex-col gap-6">
    <div class="flex gap-10 justify-center items-center">
      <IconMine class="w-16 h-16" />
      <h1 class="text-7xl text-gray-800 font-handjet">Сапер</h1>
    </div>
    <nav class="flex flex-row gap-5 justify-center text-xl text-gray-800 font-roboto">
      <RouterLink to="/">Игра</RouterLink>
      <RouterLink to="/lider">Таблица лидеров</RouterLink>
      <SettingsMenu>Настройки игры</SettingsMenu>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
/* .logo {
  height: 200px;
  width: 200px;
} */
</style>
