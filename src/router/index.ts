import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, notAuthGuard, userSecretGuard, userVerifiedGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      beforeEnter: notAuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: notAuthGuard
    },
    {
      path: '/user/secret/:userId',
      name: 'secret',
      component: () => import('../views/UserSecretsView.vue'),
      beforeEnter: userSecretGuard
    },
    {
      path: '/user/verify/:userId',
      name: 'verify',
      component: () => import('../views/VerifyUserView.vue'),
      beforeEnter: userVerifiedGuard
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/event/:eventId',
      name: 'eventDetails',
      component: () => import('../views/EventDetailsView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/user/profile',
      name: 'userProfile',
      component: () => import('../views/UserProfileView.vue'),
      beforeEnter: authGuard
    }
  ]
})

export default router
