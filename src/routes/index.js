import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/components/Login'
import Home from '@/components/Home'
import Course from '@/components/Course/Course'
import Users from '@/components/User/Users'
import Folder from '@/components/Folder/Folders'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: '/cursos',
                    component: Course
                },
                {
                    path: '/usuarios',
                    component: Users
                },
                {
                    path: '/listas',
                    component: Folder
                }
            ]
        }
    ]
})

export default router;