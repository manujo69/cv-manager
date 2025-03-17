import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import './assets/scss/custom-prime-theme.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.mount('#app')
