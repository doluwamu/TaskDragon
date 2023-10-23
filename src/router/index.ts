import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

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
      component: () => import('../views/SignupView.vue')
      // meta: { requiredAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/user/secret/:userId',
      name: 'secret',
      component: () => import('../views/UserSecretsView.vue')
    },
    {
      path: '/user/verify/:userId',
      name: 'verify',
      // meta: { requiredAuth: true },
      component: () => import('../views/VerifyUserView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      // meta: { requiredAuth: true },
      component: () => import('../views/TasksView.vue')
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiredAuth) {
//     // if (userProfile.id === 0) {
//     //   return next({ path: "/login" });
//     // }
//   } else {
//     // if (userProfile.id !== 0) {
//     //   return next({ path: "/dashboard" });
//     // }
//   }
//   return next()
// })

export default router
