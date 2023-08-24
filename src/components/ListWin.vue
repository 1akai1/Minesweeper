<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useGetAddDataStore } from '../stores/getAddData'

const getAddDataStore = useGetAddDataStore()

const data = computed(() => getAddDataStore.data)

onMounted(() => getAddDataStore.toGetData())
onUnmounted(() => getAddDataStore.toGetData())
</script>

<template>
  <article class="w-[600px] mx-auto">
    {{ data }}
    <div v-for="item in data" :key="item.id">{{ item }}</div>
  </article>
</template>

<style scoped></style>
