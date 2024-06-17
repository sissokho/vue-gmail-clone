<script setup>
import { ref, computed, reactive } from 'vue'
import { format } from 'date-fns'
import axios from 'axios'
import MailView from '@/components/MailView.vue'
import ModalView from '@/components/ModalView.vue'

const { data } = await axios.get('http://localhost:3000/emails')
const emails = ref(data)

const selected = reactive(new Set())
const emailSelection = {
  emails: selected,
  toggle(email) {
    if (selected.has(email)) {
      selected.delete(email)
    } else {
      selected.add(email)
    }
  }
}

const openedEmail = ref(null)

const sortedEmails = computed(() => {
  return [...emails.value].sort((e1, e2) => (e1.sentAt < e2.sentAt ? 1 : -1))
})

const unarchivedEmails = computed(() => {
  return sortedEmails.value.filter((e) => !e.archived)
})

function openEmail(email) {
  openedEmail.value = email

  if (email) {
    email.read = true
    updateEmail(email)
  }
}

function archiveEmail(email) {
  email.archived = true

  updateEmail(email)
}

function updateEmail(email) {
  axios.put(`http://localhost:3000/emails/${email.id}`, email)
}

function changeEmail({ toggleRead, toggleArchive, save, closeModal, changeIndex }) {
  let email = openedEmail.value

  if (toggleRead) {
    email.read = !email.read
  }

  if (toggleArchive) {
    email.archived = !email.archived
  }

  if (save) {
    updateEmail(email)
  }

  if (closeModal) {
    openedEmail.value = null
  }

  if (changeIndex) {
    const emails = unarchivedEmails.value
    const currentIndex = emails.indexOf(openedEmail.value)
    const newEmail = emails[currentIndex + changeIndex]

    openEmail(newEmail)
  }
}
</script>

<template>
  <h1>{{ emailSelection.emails.size }} emails selected</h1>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="['clickable', { read: email.read }]"
      >
        <td>
          <input
            type="checkbox"
            @click="emailSelection.toggle(email)"
            :selected="emailSelection.emails.has(email)"
          />
        </td>
        <td @click="openEmail(email)">{{ email.from }}</td>
        <td @click="openEmail(email)">
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td @click="openEmail(email)" class="date">
          {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
        </td>
        <td><button @click="archiveEmail(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>

  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>

<style scoped></style>
