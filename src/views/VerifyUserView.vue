<template>
  <section id="verify-user">
    <Navbar />

    <div class="h-screen flex justify-center items-center">
      <button @click="verifyAccount" class="p-2 max-h-[50px] bg-blue-700 rounded-md">
        Verify your account
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import { useUserStore } from '../stores/users'

export default {
  name: 'VerifyUser',
  components: {
    Navbar
  },
  methods: {
    async verifyAccount() {
      const userStore = useUserStore()
      const { verifyUserAccount, userInfo } = userStore

      const userId: string = this.$route.params.userId.toString()
      console.log(userId)

      const res = await verifyUserAccount(userId)
      if (res === 'success') {
        this.$router.push({
          name: 'tasks'
        })
      }
    }
  }
}
</script>
