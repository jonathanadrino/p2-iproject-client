import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import MyEvent from '../views/MyEvent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to,from,next) => {
        if (localStorage.getItem('access_token')) {
          next({name:'home'})
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to,from,next) => {
        if (localStorage.getItem('access_token')) {
          next({name:'home'})
        } else {
          next()
        }
      }
    },
    {
      path: '/myevent',
      name: 'myevent',
      component: MyEvent,
      beforeEnter: (to,from,next) => {
        if (!localStorage.getItem('access_token')) {
          next({name:'login'})
        } else {
          next()
        }
      }
    },
  ]
})

export default router
