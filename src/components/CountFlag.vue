<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div>
    {{ props.count }}
  </div>
</template>

<style scoped></style>
