import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import Swal from 'sweetalert2';
import VueApexCharts from 'vue3-apexcharts'


const app = createApp(App)


const pinia = createPinia()


app.use(pinia)


import { useAuthStore } from './stores/auth'
const auth = useAuthStore()
auth.loadFromStorage()


app.use(router)
app.use(VueApexCharts)

app.config.globalProperties.$swal = Swal;

app.mount('#app')
