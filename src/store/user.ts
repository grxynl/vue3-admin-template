import {defineStore} from 'pinia'
import * as loginApi from '@/api/login'
import cache from '@/utils/cache'
import {ACCESS_TOKEN_KEY} from '@/constants/cacheKeys'
import {resetRoutes, setRoutes} from "@/router/processRouter";
import {router} from '@/router'
import {RouteRecordRaw} from "vue-router";

export const useUserStore = defineStore('user', {
    state() {
        return {
            userName:'',
            captchaId:'',
            roles:<Array<number>>[],
            routes:<Array<RouteRecordRaw>>[]
        }
    },
    getters: {},
    actions: {
        async getCaptcha(width,height){
            const res = await loginApi.getImageCaptcha({width,height})
            this.captchaId = res.data.id
            return res.data.img
        },
        async login(username:string, password:string,verifyCode:string) {
            const captchaId = this.captchaId
            const {data} = await loginApi.login ({username, password,captchaId,verifyCode})
            if(data?.token){
                await this.setToken(data.token)
                await this.getUserInfo()
                return true
            }
            return false

        },
        async getUserInfo(){
            const {data } =  await loginApi.getUserInfo()
            const {userName,roles} = data
            this.userName = userName
            this.setRoles(roles)
            // console.log('roles',roles)
            // 配置路由
            this.routes =  setRoutes()
        },
        async setToken(token:string){
            await cache.setCookie(ACCESS_TOKEN_KEY, token, 7 * 24 * 60 * 60 )
        },
        setRoles(roles){
            this.roles = roles
        },
        logout(){
            this.$reset()
            cache.removeCookie(ACCESS_TOKEN_KEY)
            cache.clear()
            resetRoutes()
            router.push({name:'login'})
        }
    }
})
