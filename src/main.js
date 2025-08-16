import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import './style.css'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  rtl: true,
  theme: {
    defaultTheme: 'light',
  },
  defaults: {
    global: {
      ripple: false,
    },
  },
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')