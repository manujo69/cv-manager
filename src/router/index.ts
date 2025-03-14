// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import PersonalInfoView from '@/views/PersonalInfoView.vue'
import ExperienceView from '@/views/ExperienceView.vue'
import EducationView from '@/views/EducationView.vue'
import ResumeView from '@/views/ResumeView.vue'
import JobsView from '@/views/JobsView.vue'

// Simulated authentication guard
const isAuthenticated = (): boolean => {
  return localStorage.getItem('user') !== null
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'personal',
        name: 'PersonalInfo',
        component: PersonalInfoView
      },
      {
        path: 'experience',
        name: 'Experience',
        component: ExperienceView
      },
      {
        path: 'education',
        name: 'Education',
        component: EducationView
      },
      {
        path: 'resume',
        name: 'Resume',
        component: ResumeView
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: JobsView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated()) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router