import axios from 'axios'
import { reactive } from 'vue'

const emails = reactive(new Set())

export default function useEmailSelection() {
  function toggle(email) {
    if (emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }

  function clear() {
    emails.clear()
  }

  function addMultiple(newEmails) {
    newEmails.forEach((email) => emails.add(email))
  }

  function forSelected(fn) {
    emails.forEach((email) => {
      fn(email)

      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
  }

  function markRead() {
    forSelected((e) => (e.read = true))
  }

  function markUnread() {
    forSelected((e) => (e.read = false))
  }

  function markArchive() {
    forSelected((e) => (e.archived = true))

    clear()
  }

  return { emails, toggle, clear, addMultiple, markRead, markUnread, markArchive }
}
