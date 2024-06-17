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

  return { emails, toggle, clear, addMultiple }
}
