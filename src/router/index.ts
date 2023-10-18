import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@views/HomeView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@views/LoginView.vue'),
      props: true
    },
    {
      path: '/user/secret/:userId',
      name: 'secret',
      component: () => import('@views/UserSecretsView.vue')
    },
    {
      path: '/user/verify/:userId',
      name: 'verify-user',
      component: () => import('@views/VerifyUserView.vue'),
      props: true
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@views/TasksView.vue'),
      props: true
    }
  ]
})

export default router
