import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Global CSS has to be imported first
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Import your custom styles AFTER Vuetify styles
import './style.css'

// Create vuetify instance
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// Create Vue app
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify) // Add Vuetify after app is created

app.mount('#app')