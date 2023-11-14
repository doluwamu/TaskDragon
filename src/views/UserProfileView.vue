<template>
  <div class="text-white">
    <Navbar />

    <div
      class="my-8 py-3 px-4 flex flex-col flex-wrap justify-center items-center mx-auto gap-8 md:w-1/2"
    >
      <h1 class="text-5xl font-normal text-center">Your profile</h1>

      <!-- Username -->
      <div class="flex flex-col justify-center items-center w-1/3">
        <p>Username:</p>
        <p>{{ userInfo?.username }}</p>
      </div>

      <!-- Email -->
      <div class="flex flex-col justify-center items-center w-1/3">
        <p>Email:</p>
        <p>{{ userInfo?.email }}</p>
      </div>

      <!-- Role -->
      <div class="flex flex-col justify-center items-center w-1/3">
        <p>Role:</p>
        <p>{{ userInfo?.role }}</p>
      </div>

      <!-- User id -->
      <div class="flex flex-col justify-center items-center w-1/3">
        <p>UserID:</p>
        <p>{{ userInfo?._id && userInfo?._id.substring(0, 15) + '...' }}</p>
      </div>

      <!-- Edit button -->
      <div>
        <button class="button px-4 py-2 rounded-md bg-blue-700">Edit profile</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/users'
import Navbar from '../components/app/Navbar.vue'

const userStore = useUserStore()

export default {
  name: 'UserProfile',
  components: {
    Navbar
  },
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this.fetchProfile()
  },
  methods: {
    async fetchProfile() {
      const { getUserProfile } = userStore

      const res = await getUserProfile()

      if (res === 'success') {
        this.userInfo = userStore.$state.userInfo
        // console.log(this.userInfo)
      }
    }
  }
}
</script>
