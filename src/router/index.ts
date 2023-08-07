import {createRouter, createWebHashHistory} from 'vue-router'
import {App} from 'vue'
import {setPermission} from "@/router/permission";
import {whiteRouteList} from '@/constants/router'
import {baseRoutes} from './baseRoutes'
import {asyncRoutes} from "@/router/asyncRoutes";







export const router = createRouter({
    history: createWebHashHistory(),
    routes: baseRoutes
})

export function initRouter(app: App) {
    setPermission(router)
    app.use(router)
}
