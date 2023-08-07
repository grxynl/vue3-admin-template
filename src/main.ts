import { createApp } from 'vue'
import App from './App.vue'
// router
import {initRouter} from '@/router'
// pinia
import {createPinia} from 'pinia'
// elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// directive
import {initDirective} from '@/directives'
// mockjs
import "./mock/index"
// style
import "@/assets/style/index.less"
import 'nprogress/nprogress.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// plugins
import {useSvg} from '@/assets/svg'
import 'default-passive-events'

const app = createApp(App)
export const pinia = createPinia()


app.use(ElementPlus)
app.use(pinia)
useSvg(app)
initRouter(app)
initDirective(app)


app.mount('#app')

/**
 * fix
 * 验证码验证自动全部转换大写
 * 登录失败自动刷新验证码
 *
 * */
