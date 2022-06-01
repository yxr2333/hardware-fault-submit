import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes :RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            'index': 2
        }
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            'index': 1
        },
        component: () => import('@/views/home/home.vue'),
        children: [
            {
              path: 'upload',
              name: 'upload',
              component: () => import('@/views/home/upload.vue'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/views/home/about.vue'),
            }
        ]
    },
    {
        path: '/history',
        name: 'history',
        meta: {
            'index': 0
        },
        component: () => import('@/views/history/history.vue'),
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})