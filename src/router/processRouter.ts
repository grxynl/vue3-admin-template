import {router} from '@/router'
import { RouteRecordRaw} from "vue-router";
import {useUserStore} from '@/store/user'
import {baseRoutes} from '@/router/baseRoutes'
import {asyncRoutes} from '@/router/asyncRoutes'
import {RolesEnum} from '@/enum/rolesEnum'
import {OPEN_ASYNC_ROUTER} from '@/constants/setting'
import {whiteRouteList} from "@/constants/router";
/**
 * @description 过滤动态路由
 * @param {RouteRecordRaw[]} routes 动态路由路由列表
 * @param {RolesEnum[]} roles 权限角色
 * @return {RouteRecordRaw[]} 过滤后的动态路由
 */
export const filterAsyncRoutes = (routes:RouteRecordRaw[],roles:RolesEnum[])=>{
    const acrossedRoutes:RouteRecordRaw[] = []
    function filterRoutes(routes:RouteRecordRaw[],roles:RolesEnum[]){
        routes.forEach((route)=>{
            const metaRoles = route.meta?.roles
            if( metaRoles && roles.some(role=>(metaRoles as  Array<number>).includes(role))){
                if(route.children){
                    filterRoutes(route.children,roles)
                }
                acrossedRoutes.push(route)
            }
        })
    }
    filterRoutes(routes,roles)
    return acrossedRoutes
}

export const setRoutes=():Array<RouteRecordRaw>=>{
    try{
    const roles = useUserStore().roles
    let asyncRoute:RouteRecordRaw[]
    if(OPEN_ASYNC_ROUTER){
        asyncRoute = filterAsyncRoutes(asyncRoutes,roles)
    }else{
        asyncRoute = asyncRoutes
    }
    asyncRoute.forEach(route=>{
        router.addRoute(route)
    })
        return [...baseRoutes,...asyncRoute]
    }catch (ex){
        console.error(ex)
        return baseRoutes
    }
}

/** 删除路由 */
export const resetRoutes = () => {
    asyncRoutes.forEach(route => {
        const {name} = route
        if (name && router.hasRoute(name) && !whiteRouteList.some(e => e === name)) {
            router.removeRoute(name)
        }
    })
}