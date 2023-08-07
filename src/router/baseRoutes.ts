import {RouteRecordRaw} from "vue-router";

const Layout = () => import('@/layout/index.vue')

export const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta:{
            title:'登录',
            sidebarHide:true
        }
    }, {
        path: '/',
        name: 'home',
        redirect:'dashboard',
        component: Layout,
        meta:{
            title:'首页',
            svgIcon:'dashboard'
        },
        children:[
            {
                path:'/dashboard',
                name:'dashboard',
                component:()=>import('@/views/dashboard/index.vue'),
                meta:{
                    title:'仪表盘',
                    isKeepAlive:true
                },
            },
        ]
    },
    {
        path:'/table1',
        name:'table',
        component:Layout,
        meta:{
            title:'表格',
            svgIcon:'table',
        },
        children:[
            {
                path:'/table1/table1',
                name:'table',
                component:()=>import('@/views/table/table1/index.vue'),
                meta:{
                    title:'table'
                }
            },
            {
                path:'/table1/table2',
                name:'table2',
                component:()=>import('@/views/table/table2/index.vue'),
                meta:{
                    title:'table2'
                }
            }
        ]
    },
    {
        path:'/items',
        name:'items',
        component:Layout,
        meta:{
            title:'多级列表',
            svgIcon: 'list'
        },
        children:[
            {
                path:'/items/item1',
                name:'item1',
                meta:{
                    title:'item1'
                },
                children:[
                    {
                        path:'/items/item1/item1-1',
                        name:'item1-1',
                        component:()=>import('@/views/Items/Item-1/Item-1-1/index.vue'),
                        meta:{
                            title:'item1-1'
                        },
                    },
                    {
                        path:'/items/item1/item1-2',
                        name:'item1-2',
                        component:()=>import('@/views/Items/Item-1/Item-1-2/index.vue'),
                        meta:{
                            title:'item1-2'
                        },
                    }
                ]
            },
            {
                path:'/items/item2',
                name:'item2',
                meta:{
                    title:'item2'
                },
                children:[
                    {
                        path:'/items/item2/item2-1',
                        name:'item2-1',
                        component:()=>import('@/views/Items/Item-2/Item-2-1/index.vue'),
                        meta:{
                            title:'item2-1'
                        },
                    },

                ]
            }
        ]
    },
    {
        path: '/link',
        name: 'aihanrui',
        component:Layout,
        meta:{
            title:'外链',
            svgIcon: "external"
        },
        children:[
            {
                path:'http://www.baidu.com/',
                component:()=>{},
                meta:{
                    title:'test',
                    isExt:true
                },
            }
        ],

    }
]


// export const baseRoutes: RouteRecordRaw[] = [
//     {
//         path: '/login',
//         name: 'login',
//         component: () => import('@/views/login/index.vue'),
//         meta:{
//             title:'登录',
//             sidebarHide:true
//         }
//     }, {
//         path: '/',
//         name: 'home',
//         redirect:'dashboard',
//         component: Layout,
//         meta:{
//             title:'首页',
//             svgIcon:'dashboard'
//         },
//         children:[
//             {
//                 path:'dashboard',
//                 name:'dashboard',
//                 component:()=>import('@/views/dashboard/index.vue'),
//                 meta:{
//                     title:'仪表盘'
//                 },
//                 children:[
//                     {
//                         path:'dashboard',
//                         name:'dashboard',
//                         component:()=>import('@/views/dashboard/index.vue'),
//                         meta:{
//                             title:'测试'
//                         }
//                     }
//                 ]
//             },
//         ]
//     },
//     {
//         path: '/link',
//         name: 'aihanrui',
//         component:Layout,
//         meta:{
//             title:'外链',
//             svgIcon: "external"
//         },
//         children:[
//             {
//                 path:'http://www.aihanrui.cn/',
//                 component:()=>{},
//                 meta:{
//                     title:'test',
//                     isExt:true
//                 },
//             }
//         ],
//
//     }
// ]
