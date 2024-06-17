<script setup>
import useKeydown from '@/composables/keydown'
import { format } from 'date-fns'
import { marked } from 'marked'

const props = defineProps({
  email: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['changeEmail'])

useKeydown([
  { key: 'r', fn: toggleRead },
  { key: 'e', fn: toggleArchive },
  { key: 'k', fn: goNewer },
  { key: 'j', fn: goOlder },
  { key: '[', fn: goNewerAndArchive },
  { key: ']', fn: goOlderAndArchive }
])

function toggleRead() {
  emit('changeEmail', { toggleRead: true, save: true })
}

function toggleArchive() {
  emit('changeEmail', { toggleArchive: true, save: true, closeModal: true })
}

function goNewer() {
  emit('changeEmail', { changeIndex: -1 })
}

function goOlder() {
  emit('changeEmail', { changeIndex: 1 })
}

function goNewerAndArchive() {
  emit('changeEmail', { changeIndex: -1, toggleArchive: true, save: true })
}

function goOlderAndArchive() {
  emit('changeEmail', { changeIndex: 1, toggleArchive: true, save: true })
}
</script>

<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}
      </button>
      <button @click="toggleRead">{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>

    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em>
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>
