<template>
  <div class="text-white">
    <Navbar />

    <div
      class="my-8 py-3 px-4 flex flex-col flex-wrap justify-center items-center mx-auto gap-8 md:w-1/2"
    >
      <p v-if="userStore.loaders.userProfile">Loading...</p>

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
      <div v-if="userStore.loaders.userProfile">
        <button class="button px-4 py-2 rounded-md bg-blue-400">Loading...</button>
      </div>
      <RouterLink v-else :to="`/user/profile?edit=${true}`">
        <button class="button px-4 py-2 rounded-md bg-blue-700">Edit profile</button>
      </RouterLink>
    </div>

    <EditUserModal :edit="edit" :fetchProfile="fetchProfile" :editUserProfile="editUserProfile" />
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/users'
import Navbar from '../components/app/Navbar.vue'
import EditUserModal from '../components/user/EditUserModal.vue'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()

export default {
  name: 'UserProfile',
  components: {
    Navbar,
    EditUserModal,
    RouterLink
  },
  data() {
    return {
      userInfo: {},
      edit: false,
      userStore
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
    },
    async editUserProfile(userDetails: { username?: string; email?: string }) {
      const { updateUserProfile } = userStore

      const userData = {
        username: userDetails.username,
        email: userDetails.email
      }

      const res = await updateUserProfile(userData)

      if (res === 'success') {
        this.fetchProfile()
        // window.location.reload()
      }
    }
  },
  updated() {
    const editQuery = Boolean(this.$route.query.edit)

    if (editQuery && editQuery === true) {
      this.edit = true
    }

    if (!editQuery || editQuery !== true) {
      this.edit = false
    }
  }
}
</script>
