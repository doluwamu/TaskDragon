import * as router from 'vue-router'
import Cookies from 'js-cookie'

const userVerifiedGuard = (
  to: router.RouteLocationNormalized,
  from: router.RouteLocationNormalized,
  next: router.NavigationGuardNext
) => {
  const isAuth = Cookies.get('auth-stat')
  const userInfo = Cookies.get('auth_info') && JSON.parse(Cookies.get('auth_info'))

  if (isAuth !== 'logged-in' && (!userInfo || userInfo._id.length < 1)) {
    return next({
      path: '/login'
    })
  }

  if (isAuth === 'logged-in' && userInfo?.secretSet === false) {
    return next({
      name: 'secret',
      params: {
        userId: userInfo._id
      }
    })
  }

  if (isAuth === 'logged-in' && userInfo?.secretSet === true && userInfo?.verified === true) {
    return next({
      name: 'tasks'
    })
  }

  return next()
}

export default userVerifiedGuard
