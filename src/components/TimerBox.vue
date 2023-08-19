<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  start: {
    type: Boolean,
    default: false
  },
  time: {
    type: Number,
    default: 1
  }
})
watch(
  () => props.time,
  (newTime) => {
    lookTime.value = newTime * 60
  }
)
const lookTime = ref(props.time * 60)
setInterval(() => {
  if (!props.start) return
  if (lookTime.value < 0) return
  lookTime.value--
}, 1000)
</script>

<template>
  <div>{{ Math.floor(lookTime / 60) }} : {{ lookTime % 60 }}</div>
</template>

<style scoped></style>
