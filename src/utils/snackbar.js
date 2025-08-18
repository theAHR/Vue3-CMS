import { ref } from 'vue'

const messages = ref([])
const timeout = ref(5000)

export function useSnackbar() {
  const show = (message, type = 'info') => {
    const id = Date.now()
    const newMessage = {
      id,
      message,
      type,
      visible: true
    }
    
    messages.value.push(newMessage)
    
    setTimeout(() => {
      hide(id)
    }, timeout.value)
  }
  
  const hide = (id) => {
    const index = messages.value.findIndex(msg => msg.id === id)
    if (index > -1) {
      messages.value[index].visible = false
      setTimeout(() => {
        messages.value.splice(index, 1)
      }, 300)
    }
  }
  
  const success = (message) => show(message, 'success')
  const error = (message) => show(message, 'error')
  const warning = (message) => show(message, 'warning')
  const info = (message) => show(message, 'info')
  
  return {
    messages,
    show,
    hide,
    success,
    error,
    warning,
    info
  }
}

export { messages as snackbarMessages }
