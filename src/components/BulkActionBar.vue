<script setup>
import useEmailSelection from '@/composables/email-selection.js'
import { computed } from 'vue'

const props = defineProps({
  emails: {
    type: Array,
    required: true
  }
})

const emailSelection = useEmailSelection()
const numberOfEmails = props.emails.length

const numberOfEmailSelected = computed(() => emailSelection.emails.size)
const allEmailsSelected = computed(() => numberOfEmailSelected.value === numberOfEmails)
const someEmailsSelected = computed(
  () => numberOfEmailSelected.value > 0 && numberOfEmailSelected.value < numberOfEmails
)

function bulkSelect() {
  if (allEmailsSelected.value) {
    emailSelection.clear()
  } else {
    emailSelection.addMultiple(props.emails)
  }
}
</script>

<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>

    <span class="buttons">
      <button
        @click="emailSelection.markRead()"
        :disabled="[...emailSelection.emails].every((e) => e.read)"
      >
        Mark Read
      </button>
      <button
        @click="emailSelection.markUnread()"
        :disabled="[...emailSelection.emails].every((e) => !e.read)"
      >
        Mark Unread
      </button>
      <button @click="emailSelection.archive()" :disabled="numberOfEmailSelected === 0">
        Mark Archive
      </button>
    </span>
  </div>
</template>
