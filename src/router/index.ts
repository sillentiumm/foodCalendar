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


// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   console.log(to.meta.requiresAuth, authStore.isLoggedIn)
//   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
//     console.log(1)
//     next('/auth');
//   } else if((!to.meta.requiresAuth && authStore.isLoggedIn)) {
//     console.log(2)
//     next('/calendar');
//   } else {
//     console.log(3)
//     next();
//   }
// });

export default router
