import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import {routes} from "./routes/routes.js"
import {Quasar} from 'quasar'
import{createPinia} from 'pinia'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const pinia = createPinia()

const myApp = createApp(App)

myApp.use(Quasar,{
    plugins: {},
})

myApp.use(router)
myApp.use(pinia)
myApp.mount('#app')
