<template>
  <div class="text-white">
    <Navbar />

    <!-- Toast notifications -->
    <div v-if="userStore.sucessMsg.length > 0">
      <ToastNotification :message="userStore.sucessMsg" messageType="success" />
    </div>

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
        <p>
          {{
            userInfo?._id && userInfo?._id.substring(0, 8) + '.....' + userInfo?._id.substring(18)
          }}
        </p>
      </div>

      <!-- Edit button -->
      <div v-if="userStore.loaders.userProfile">
        <button class="button px-4 py-2 rounded-md bg-blue-400">Loading...</button>
      </div>
      <RouterLink v-else :to="`/user/profile?edit=${true}`">
        <button class="button px-4 py-2 rounded-md bg-blue-700">Edit profile</button>
      </RouterLink>
    </div>

    <EditUserModal v-if="edit" :edit="edit" :fetchProfile="fetchProfile" />
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/users'
import Navbar from '../components/app/Navbar.vue'
import EditUserModal from '../components/user/EditUserModal.vue'
import { RouterLink } from 'vue-router'
import ToastNotification from '../components/toast/ToastNotification.vue'

const userStore = useUserStore()

export default {
  name: 'UserProfile',
  components: {
    Navbar,
    EditUserModal,
    RouterLink,
    ToastNotification
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
