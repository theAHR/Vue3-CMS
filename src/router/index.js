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
      },
      {
        path: 'mission-and-vision',
        component: () => import('@/pages/missionAndVisionPage.vue'),
        name: 'MissionAndVision'
      },
      {
        path: 'ceo',
        component: () => import('@/pages/ceoPage.vue'),
        name: 'CEO'
      },
      {
        path: 'board-members',
        component: () => import('@/pages/boardMemberPage.vue'),
        name: 'BoardMembers'
      },
      {
        path: 'shareholders',
        component: () => import('@/pages/shareholdersPage.vue'),
        name: 'Shareholders'
      },
      {
        path: 'about-us',
        component: () => import('@/pages/aboutPage.vue'),
        name: 'AboutUs'
      },
      {
        path: 'services',
        redirect: 'services/web-application'
      },
      {
        path: 'services/web-application',
        component: () => import('@/pages/services/ServicesPage.vue'),
        name: 'WebApplication'
      },
      {
        path: 'services/pos',
        component: () => import('@/pages/services/ServicesPage.vue'),
        name: 'POS'
      },
      {
        path: 'services/web-service',
        component: () => import('@/pages/services/ServicesPage.vue'),
        name: 'WebService'
      },
      {
        path: 'services/mobile-application',
        component: () => import('@/pages/services/ServicesPage.vue'),
        name: 'MobileApplication'
      },
      {
        path: '/announcements',
        component: () => import('@/pages/announcementsPage.vue'),
        name: 'Announcements'
      },
      {
        path: '/news',
        component: () => import('@/pages/newsPage.vue'),
        name: 'newsPage',
      },
      {
        path: '/circulars',
        component: () => import('@/pages/circularsPage.vue'),
        name: 'Circulars'
      },
      {
        path: '/instructions',
        component: () => import('@/pages/instructionsPage.vue'),
        name: 'instructions'
      },
      {
        path: '/tutorials',
        component: () => import('@/pages/tutorialsPage.vue'),
        name: 'Tutorials'
      },
      {
        path: 'faq',
        component: () => import('@/pages/faqPage.vue'),
        name: 'FAQ'
      },
      {
        path: '/help',
        component: () => import('@/pages/helpPage.vue'),
        name: 'Help'
      },
      {
        path: '/contact-us',
        component: () => import('@/pages/contactUsPage.vue'),
        name: 'ContactUs'
      },
      {
        path: '/cooperation-request',
        component: () => import('@/pages/cooperationRequestPage.vue'),
        name: 'CooperationRequest'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
