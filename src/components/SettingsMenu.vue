<script setup>
import { ref } from 'vue'
import LevelBox from './LevelBox.vue'

const showSettings = ref(false)
</script>

<template>
  <div class="flex flex-col">
    <button
      class="justify-self-center"
      @click="showSettings ? (showSettings = false) : (showSettings = true)"
    >
      <slot></slot>
    </button>
    <LevelBox v-if="showSettings" />
  </div>
</template>

<style scoped></style>
