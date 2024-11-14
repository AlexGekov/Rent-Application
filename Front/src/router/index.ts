import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Catalog from '../views/Catalog.vue'
import Create from '../views/Create.vue'
import Details from '../views/Details.vue'
import Edit from '../views/Edit.vue'
import * as userService from '../services/userService'
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
      },
      {
        path: '/catalog',
        children: [
          {
            path: "",
            name: 'Catalog',
            component: Catalog,
            beforeEnter: authGuard
          },
          {
            path: '/create',
            name: 'Create',
            component: Create,
            beforeEnter: authGuard
          },
          {
            path: '/:id',
            name: 'Details',
            component: Details,
            beforeEnter: authGuard
          },
          {
            path: '/:id/edit',
            name: 'EditApartment',
            component: Edit,
            beforeEnter: authGuard
          }
        ]
      },
    ]
})

async function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  await waitForAuth()

  if(!userService.isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
}


async function waitForAuth() {
  if (!userService.isLoggedIn.value && document.cookie.includes('userId=')) {
    return await userService.getUser()
  }
}

export default router