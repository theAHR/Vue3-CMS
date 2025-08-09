import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/homePage.vue'),
        name: 'Home'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
