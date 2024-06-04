<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['closeModal'])

function onKeydown(event) {
  if (event.key === 'Escape') {
    emit('closeModal')
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="$emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>
