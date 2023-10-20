<template>
  <section class="flex items-center justify-center">
    <div id="signin" class="text-white w-full my-4 p-5 rounded-3xl max-w-[600px] md:p-10">
      <h1 class="text-4xl pb-8 text-center">Login to TaskDragon</h1>

      <p class="text-green-400 text-center font-bold text-xl pb-6" v-if="signupRes.length > 0">
        {{ signupRes }}
      </p>

      <!-- Errors -->
      <p class="text-red-700 text-center font-bold text-xl pb-6">{{ errMsg }}</p>

      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-2">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            v-model="username"
            class="rounded-lg text-gray-900"
            placeholder="Write here"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            v-model="password"
            class="rounded-lg text-gray-900"
            placeholder="Write here"
          />
        </div>

        <button type="submit" class="bg-blue-700 text-lg py-2 px-4 mx-auto rounded-lg">
          Login
        </button>

        <p class="text-center">
          Don't have an account?
          <span>
            <RouterLink to="/signup">Signup</RouterLink>
          </span>
        </p>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Signup',
  components: {
    RouterLink
  },
  data() {
    return {
      username: '',
      password: '',
      signupRes: '',
      errMsg: ''
    }
  },
  // mounted() {
  //   const authStore = useAuthStore()
  //   const { signupRes } = authStore
  //   this.signupRes = signupRes
  // },
  methods: {
    async handleSubmit() {
      const authStore = useAuthStore()

      const loginData = {
        username: this.username,
        password: this.password
      }

      const { login } = authStore

      const res = await login(loginData)
      if (
        res === 'success' &&
        authStore.userInfo?.verified &&
        authStore.userInfo.verified === true &&
        authStore.userInfo?.setSecret &&
        authStore.userInfo.setSecret === true
      ) {
        this.$router.push({
          name: 'tasks'
        })
      } else if (
        res === 'success' &&
        (!authStore.userInfo?.setSecret || authStore.userInfo.setSecret === false)
      ) {
        this.$router.push({
          name: 'secret',
          path: `/user/secret/`,
          params: {
            userId: authStore.userInfo?.id
          }
        })
      } else if (
        (authStore.userInfo.setSecret === true && !authStore.userInfo?.verified) ||
        authStore.userInfo.verified === false
      ) {
        this.$router.push({
          name: 'verify-user',
          params: {
            userId: authStore.userInfo?.id
          }
        })
      }
      if (res === 'fail') {
        this.errMsg = authStore.errorMsg
      }
    }
  }
}
</script>

<style scoped>
#signin {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

input,
button {
  outline: none;
}
</style>
