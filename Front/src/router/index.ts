import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Catalog from '../views/Catalog.vue'
import Create from '../views/Create.vue'
import Details from '../views/Details.vue'

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
        name: 'Catalog',
        component: Catalog,
      },
      {
        path: '/create',
        name: 'Create',
        component: Create
      },
      {
        path: '/:id',
        name: 'Details',
        component: Details
      }
    ]
})

export default router