<script setup>
import { ref, watch, defineEmits } from 'vue'

const props = defineProps({
  ifStartTimer: {
    type: Boolean,
    default: false
  },
  ifStopTimer: {
    type: Boolean,
    default: true
  },
  time: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['ifSendStop'])
const lookTime = ref(props.time * 60)
const stop = ref(props.ifStartTimer)
const ifSendStop = ref(true)

function toSendStop(par) {
  ifSendStop.value = par
  emit('ifSendStop', !par)
}

setInterval(() => {
  if (!stop.value) return
  if (ifSendStop.value && lookTime.value === 0) toSendStop(false)
  if (lookTime.value === 0) return
  lookTime.value -= 1
}, 1000)

watch(
  () => props.ifStartTimer,
  () => {
    stop.value = props.ifStartTimer
    if (!props.ifStartTimer && !props.ifStopTimer) {
      lookTime.value = props.time * 60
      ifSendStop.value = true
    }
  }
)
watch(
  () => props.ifStopTimer,
  () => {
    stop.value = props.ifStopTimer
    if (!props.ifStartTimer && !props.ifStopTimer) {
      lookTime.value = props.time * 60
      ifSendStop.value = true
    }
  }
)
watch(
  () => props.time,
  () => {
    lookTime.value = props.time * 60
  }
)
</script>

<template>
  <div>{{ Math.floor(lookTime / 60) }} : {{ lookTime % 60 }}</div>
</template>

<style scoped></style>
