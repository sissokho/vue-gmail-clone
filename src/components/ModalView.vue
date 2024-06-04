<script setup>
import useKeydown from '@/composables/keydown.js'

const emit = defineEmits(['closeModal'])

useKeydown([
  {
    key: 'Escape',
    fn: () => {
      emit('closeModal')
    }
  }
])
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="$emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>
