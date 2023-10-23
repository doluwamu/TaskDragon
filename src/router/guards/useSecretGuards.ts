import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const userSecretGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuth = Cookies.get('auth-stat')
  const userInfo = Cookies.get('auth_info') && JSON.parse(Cookies.get('auth_info'))
  if (isAuth !== 'logged-in' && (!userInfo || userInfo._id.length < 1)) {
    return next({
      path: '/login'
    })
  }

  if (
    isAuth === 'logged-in' &&
    userInfo &&
    userInfo.secretSet === true &&
    userInfo.verified === false
  ) {
    return next({
      name: 'verify',
      params: {
        userId: userInfo._id
      }
    })
  }

  if (
    isAuth === 'logged-in' &&
    userInfo &&
    userInfo.secretSet === true &&
    userInfo.verified === true
  ) {
    return next({
      name: 'tasks'
    })
  }

  return next()
}

export default userSecretGuard
