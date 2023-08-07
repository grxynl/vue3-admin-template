import {RouteRecordRaw} from "vue-router";
import {RolesEnum} from '@/enum/rolesEnum'

const Layout = () => import('@/layout/index.vue')

export const asyncRoutes: RouteRecordRaw[] = [
    {
        path:'/:pathMatch(.*)*',
        redirect:'/error/404',
        component:Layout,
        children:[],
        meta: {
            roles: [RolesEnum.Administrator, RolesEnum.Editor, RolesEnum.Visitor],
            sidebarHide: true
        },
    },
    {
        path: '/error',
        name: 'error',
        redirect:'/error/404',
        component:Layout,
        meta: {
            roles: [RolesEnum.Administrator, RolesEnum.Editor, RolesEnum.Visitor],
            sidebarHide: true
        },
        children:[
            {
                path: '/error/404',
                name: '404',
                alias:'/:pathMatch(.*)*',
                component: () => import('@/views/error/index.vue'),
            }
        ],
    },
    {
        path:'/permission',
        name:'permission',
        redirect:'/permission/index',
        component:Layout,
        meta: {
            title:'权限展示',
            svgIcon:'permission',
            roles: [ RolesEnum.Administrator, RolesEnum.Editor, RolesEnum.Visitor],
        },
        children:[
            {
                path:'/permission/index',
                name:'permission',
                component:()=>import('@/views/permission/index.vue')
            }
        ]
    },
]
