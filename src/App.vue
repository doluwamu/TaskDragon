<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import jwt from 'jsonwebtoken'
</script>

<script lang="ts">
import Cookies from 'js-cookie'
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',
  mounted() {
    // const refresh = async () => {
    const authStore = useAuthStore()

    const { refreshSession } = authStore
    const authStatus = Cookies.get('auth-stat')
    let { token } = authStore

    if (authStatus && authStatus === 'logged-in' && token === '') {
      // console.log('true')
      // const jwt = await refreshSession()
      // authStore.token = jwt
      // console.log(authStore.token)

      setTimeout(async () => {
        await refreshSession()
        // console.log(authStore.token)
      }, 1000)
    }
  }

  // const isTokenExpired = (jwt: string) => Date.now() >= JSON.parse(atob(jwt.split('.')[1])).exp * 1000

  // console.log(isTokenExpired(token))
}
</script>

<!-- <script lang="ts">
export default {
  mounted(){

  }
}
</script> -->

<template>
  <RouterView :token="token" />
</template>
