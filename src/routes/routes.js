import Main from "../components/Main.vue"
import Info from "../components/Info.vue"
import juego from "../components/juego.vue"

export const routes = [
    { path: "/", component: Main },
    { path: "/Info/:name", component: Info },
    { path: "/juego", component: juego }
]
