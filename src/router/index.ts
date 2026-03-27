import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: { requiresAuth: true },
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'calendar',
        meta: { requiresAuth: true },
        component: () => import('@/views/Calendar.vue'),
      },
      {
        path: 'foods',
        name: 'foods',
        meta: { requiresAuth: true },
        component: () => import('@/views/Foods.vue')
      },
      {
        path: 'food',
        name: 'active-food',
        meta: { requiresAuth: true },
        component: () => import('@/views/ActiveFood.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    meta: { requiresAuth: false },
    component: () => import('@/views/Auth.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
