import "vue-router"
import {RolesEnum} from '@/enum/rolesEnum'

declare module "vue-router" {
    interface RouteMeta {
        /**
         * 路由名字，用于侧边栏、面包屑等展示名字地方
         */
        title?: string
        /**
         * 该路由对应图标
         */
        svgIcon?: string

        /**
         * 设置 true 的时候该路由不会在侧边栏展示
         */
        sidebarHide?: boolean
        /**
         * 路由权限角色，只限于动态路由中
         */
        roles?: number|RolesEnum[]
        /**
         * 外部路径
         * */
        isExt?:boolean
        /**
         * 是否keepalive
         * */
        isKeepAlive?:boolean
    }
}
