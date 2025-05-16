import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './firebase'

// Import custom fonts
import '@fontsource/playfair-display'
import '@fontsource/playfair-display/700.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
