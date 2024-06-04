import { onMounted, onUnmounted } from 'vue'

function useKeydown(keyCombos) {
  function onKeydown(event) {
    const keyCombo = keyCombos.find((kc) => kc.key === event.key)

    if (keyCombo) {
      keyCombo.fn()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))

  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
}

export default useKeydown
