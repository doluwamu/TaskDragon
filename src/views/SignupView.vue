<template>
  <section class="flex items-center justify-center min-h-screen">
    <div id="signup" class="text-white w-full my-4 p-5 rounded-3xl max-w-[600px] md:p-10">
      <h1 class="text-4xl pb-8 text-center">Signup to TaskDragon</h1>

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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            v-model="email"
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

        <div class="flex flex-col gap-2">
          <label>Confirm password:</label>
          <input
            type="password"
            name="confirm-password"
            v-model="confirmPassword"
            class="rounded-lg text-gray-900"
            placeholder="Write here"
          />
        </div>

        <button
          v-if="authStore.loaders.loading"
          type="button"
          class="bg-blue-400 text-lg py-2 px-4 mx-auto rounded-lg cursor-not-allowed"
        >
          Signup
        </button>
        <button v-else type="submit" class="bg-blue-700 text-lg py-2 px-4 mx-auto rounded-lg">
          Signup
        </button>

        <p class="text-center">
          Already have an account?
          <span>
            <RouterLink to="/login">Login</RouterLink>
          </span>
        </p>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
// import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()

export default {
  name: 'Signup',
  components: {
    RouterLink
  },
  data() {
    return { username: '', email: '', password: '', confirmPassword: '', errMsg: '', authStore }
  },
  setup() {
    // const username = ref('')
    // const email = ref('')
    // const password = ref('')
    // const confirmPassword = ref('')
  },
  methods: {
    async handleSubmit() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      const { signup } = authStore

      const res: string = await signup(data)
      console.log(res)
      if (res === 'success') {
        this.$router.push({
          name: 'login',
          params: {
            message: authStore.signupRes
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
#signup {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

input,
button {
  outline: none;
}
</style>
