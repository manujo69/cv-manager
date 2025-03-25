import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import { localeEs } from './models/locale-es'

import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  locale: {
    ...localeEs,
  },
})

// Registrar un filtro global para formatear fechas
app.config.globalProperties.$filters = {
  formatDate(value: string) {
    if (!value) return ''

    const date = new Date(value)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  },
}

app.mount('#app')
