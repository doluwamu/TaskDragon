<template>
  <section id="verify-user">
    <Navbar />

    <div class="h-screen flex justify-center items-center">
      <button
        v-if="userStore.loaders.loading"
        class="p-2 max-h-[50px] bg-blue-400 rounded-md text-white"
      >
        Verifying...
      </button>
      <button
        v-else
        @click="verifyAccount"
        class="p-2 max-h-[50px] bg-blue-700 rounded-md text-white"
      >
        Verify your account
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import { useUserStore } from '../stores/users'

const userStore = useUserStore()

export default {
  name: 'VerifyUser',
  components: {
    Navbar
  },
  data() {
    return {
      userStore
    }
  },
  methods: {
    async verifyAccount() {
      const { verifyUserAccount, userInfo } = userStore

      const userId: string = this.$route.params.userId.toString()
      console.log(userId)

      const res: string = await verifyUserAccount(userId)
      if (res === 'success') {
        return this.$router.push({
          name: 'tasks'
        })
      }
    }
  }
}
</script>
