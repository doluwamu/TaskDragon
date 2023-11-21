<template>
  <div
    v-if="edit === true"
    class="add-task-modal flex justify-center items-center z-40 text-black fixed top-0 left-0 h-full w-full"
  >
    <RouterLink
      :to="`/user/profile?uid=${userStore.userInfo._id}`"
      class="absolute top-0 left-0 bg-[#0007] h-full w-full"
    ></RouterLink>
    <div
      class="modal-form bg-gray-800 text-white py-5 px-3 z-40 w-11/12 overflow-y-auto max-h-[500px] md:w-2/3 md:px-5"
    >
      <div class="flex justify-between items-center md:gap-4">
        <div></div>
        <h1 class="text-4xl font-semibold">Edit Task</h1>

        <RouterLink :to="`/user/profile?uid=${userStore.userInfo._id}`">
          <i class="fa-solid fa-times text-xl p-3 text-white font-thin"></i>
        </RouterLink>
      </div>

      <form @submit.prevent="editUserProfile()" class="flex flex-col gap-8">
        <div class="flex flex-col">
          <label>Username:</label>
          <input type="text" class="text-lg font-normal text-white w-full" v-model="username" />
        </div>

        <div class="flex flex-col">
          <label>Email:</label>
          <input type="text" class="text-lg font-normal text-white w-full" v-model="email" />
        </div>

        <div class="buttons flex justify-center text-white">
          <button v-if="userStore.loaders.updateProfile" class="button px-3 py-2 bg-gray-600">
            Loading...
          </button>
          <button v-else class="button px-3 py-2 bg-black">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../../stores/users'

const userStore = useUserStore()

export default {
  name: 'EditUserModal',
  props: ['edit', 'fetchProfile'],
  data() {
    return {
      userStore,
      username: userStore.$state.username,
      email: userStore.$state.email
    }
  },
  async mounted() {
    await this.fetchProfile()
    this.username = userStore.$state.username
    this.email = userStore.$state.email
  },
  methods: {
    async editUserProfile() {
      const { updateUserProfile } = userStore

      const userData = {
        username: this.username,
        email: this.email
      }

      const res = await updateUserProfile(userData)

      if (res === 'success') {
        this.fetchProfile()
        // window.location.reload()
      }
    }
  }
}
</script>

<style scoped>
input,
textarea {
  background-color: inherit;
}
</style>
