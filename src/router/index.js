import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
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
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        name: 'داشبورد'
      },
      {
        path: '/news/list',
        component: () => import('@/pages/news/index.vue'),
        name: 'خبر'
      },
      {
        path: '/news/categories',
        component: () => import('@/pages/newsCategory/index.vue'),
        name: 'دسته‌بندی اخبار'
      },
      {
        path: '/announcements/list',
        component: () => import('@/pages/announcement/index.vue'),
        name: 'اطلاعیه‌ها'
      },
      {
        path: '/announcements/categories',
        component: () => import('@/pages/announcementCategory/index.vue'),
        name: 'دسته‌بندی اطلاعیه‌ها'
      },
      {
        path: '/circulars/list',
        component: () => import('@/pages/circular/index.vue'),
        name: 'بخشنامه‌ها'
      },
      {
        path: '/circulars/categories',
        component: () => import('@/pages/circularCategory/index.vue'),
        name: 'دسته‌بندی بخشنامه‌ها'
      },
      {
        path: '/instructions/list',
        component: () => import('@/pages/instruction/index.vue'),
        name: 'دستورالعمل‌ها'
      },
      {
        path: '/instructions/categories',
        component: () => import('@/pages/instructionCategory/index.vue'),
        name: 'دسته‌بندی دستورالعمل‌ها'
      },
      {
        path: '/faq',
        component: () => import('@/pages/faq/index.vue'),
        name: 'لیست سوالات'
      },
      {
        path: '/faq-group',
        component: () => import('@/pages/faqCategory/index.vue'),
        name: 'دسته‌بندی'
      },
      {
        path: '/job',
        component: () => import('@/pages/job/index.vue'),
        name: 'بخش سازمانی'
      },
      {
        path: '/job-sections',
        component: () => import('@/pages/jobSection/index.vue'),
        name: 'مشاغل'
      },
      {
        path: '/job-requests',
        component: () => import('@/pages/jobRequest/index.vue'),
        name: 'درخواست‌ها'
      },
      {
        path: '/multimedia',
        component: () => import('@/pages/multimedia/index.vue'),
        name: 'ویدئوهای آموزشی'
      },
      {
        path: '/guide',
        component: () => import('@/pages/guide/index.vue'),
        name: 'راهنما'
      },
      {
        path: '/contact-requests',
        component: () => import('@/pages/contactRequest/index.vue'),
        name: 'درخواست‌های تماس'
      },
      {
        path: '/rate-and-review',
        component: () => import('@/pages/rateAndReview/index.vue'),
        name: 'نظرات کاربران'
      },
      {
        path: '/social-networks',
        component: () => import('@/pages/socialNetwork/index.vue'),
        name: 'SocialNetwork'
      },
      {
        path: '/users',
        component: () => import('@/pages/user/index.vue'),
        name: 'کاربران'
      },
      {
        path: '/roles',
        component: () => import('@/pages/role/index.vue'),
        name: 'نقش'
      },
      {
        path: '/account/profile',
        component: () => import('@/pages/account/profile.vue'),
        name: 'AccountProfile'
      },

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

router.beforeEach((to, from, next) => {
  const publicPages = ['/account/auth', '/account/logout']
  const authRequired = !publicPages.includes(to.path)
  
  if (authRequired) {
    const token = document.cookie.includes('tspadmin.token=')
    if (!token) {
      next('/account/auth')
      return
    }
  }
  
  if (to.path === '/account/auth') {
    const token = document.cookie.includes('tspadmin.token=')
    if (token) {
      next('/dashboard')
      return
    }
  }
  
  next()
})

export default router
