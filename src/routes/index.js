import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/components/Login'
import Home from '@/components/Home'
import Course from '@/components/Course/Course'

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
                }
            ]
        }
    ]
})

export default router;