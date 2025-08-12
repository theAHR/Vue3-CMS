import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        name: 'Dashboard'
      },
      {
        path: '/users',
        component: () => import('@/pages/user/index.vue'),
        name: 'User'
      },
      {
        path: '/roles',
        component: () => import('@/pages/role/index.vue'),
        name: 'Role'
      },
      {
        path: '/faq-group',
        component: () => import('@/pages/faqCategory/index.vue'),
        name: 'FaqCategory'
      },
      {
        path: '/faq',
        component: () => import('@/pages/faq/index.vue'),
        name: 'Faq'
      },
      {
        path: '/job-sections',
        component: () => import('@/pages/jobSection/index.vue'),
        name: 'JobSection'
      },
      {
        path: '/jobs',
        component: () => import('@/pages/job/index.vue'),
        name: 'Job'
      },
      {
        path: '/job-requests',
        component: () => import('@/pages/jobRequest/index.vue'),
        name: 'JobRequest'
      },
      {
        path: '/social-networks',
        component: () => import('@/pages/socialNetwork/index.vue'),
        name: 'SocialNetwork'
      },
      {
        path: '/contact-requests',
        component: () => import('@/pages/contactRequest/index.vue'),
        name: 'ContactRequest'
      },
      {
        path: '/guides',
        component: () => import('@/pages/guide/index.vue'),
        name: 'Guide'
      },
      {
        path: '/multimedia',
        component: () => import('@/pages/multimedia/index.vue'),
        name: 'Multimedia'
      },
      {
        path: '/rate-and-review',
        component: () => import('@/pages/rateAndReview/index.vue'),
        name: 'RateAndReview'
      },
      {
        path: '/news/categories',
        component: () => import('@/pages/newsCategory/index.vue'),
        name: 'NewsCategory'
      },
      {
        path: '/news/list',
        component: () => import('@/pages/news/index.vue'),
        name: 'News'
      },
      {
        path: '/announcements/categories',
        component: () => import('@/pages/announcementCategory/index.vue'),
        name: 'AnnouncementCategory'
      },
      {
        path: '/announcements/list',
        component: () => import('@/pages/announcement/index.vue'),
        name: 'Announcement'
      },
      {
        path: '/circulars/categories',
        component: () => import('@/pages/circularCategory/index.vue'),
        name: 'CircularCategory'
      },
      {
        path: '/circulars/list',
        component: () => import('@/pages/circular/index.vue'),
        name: 'Circular'
      },
      {
        path: '/account/auth',
        component: () => import('@/pages/account/auth.vue'),
        name: 'AccountAuth'
      },
      {
        path: '/account/logout',
        component: () => import('@/pages/account/logout.vue'),
        name: 'AccountLogout'
      },
      {
        path: '/account/profile',
        component: () => import('@/pages/account/profile.vue'),
        name: 'AccountProfile'
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active-exact',
  routes
})

export default router
