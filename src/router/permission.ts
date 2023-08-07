import {Router} from 'vue-router'
import nProgress from 'nprogress'
import {ElMessage} from 'element-plus'
import {ACCESS_TOKEN_KEY} from '@/constants/cacheKeys'
import cache from '@/utils/cache'
import {whiteRouteList} from '@/constants/router'
import {useUserStore} from "@/store/user";

// 进度条设置
nProgress.configure({speed:400, showSpinner:false })

export function setPermission (router:Router){
    router.beforeEach(async(to,from,next)=>{
        const token = cache.getCookie(ACCESS_TOKEN_KEY)
        const userStore = useUserStore()
        nProgress.start()

        try{
            if(token){
                if(to.path === "/login"){
                    next({name:'home',replace:true})
                }else{
                    if(userStore.roles.length === 0){
                        // 当无角色信息重新请求，store没有做永久性存储，所以需要进行重新请求，也能保证数据准确性。
                        await userStore.getUserInfo()
                        if(userStore.roles.length === 0){
                            userStore.logout()
                        }
                    }
                    if(router.hasRoute(to.name!)){
                        next()
                    }else{
                        next({...to,replace:true})
                    }
                }
            }else{
                if(whiteRouteList.some(e=>{
                    return e===to.name
                })){
                    // 白名单
                    next()
                }else{
                    next({name:'login',query:{redirect: to.fullPath},replace:true})
                }
            }
        }catch (ex){
            console.log(ex)
            cache.removeCookie(ACCESS_TOKEN_KEY)
            ElMessage.error((ex as Error).message  ?? '未知错误，请重新登录')
            return next ({path:'login'})
        }finally {
            nProgress.done(true)
        }
    })
    router.afterEach(()=>{
        nProgress.done()
    })
}
