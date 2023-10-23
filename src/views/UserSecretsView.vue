<template>
  <section>
    <Navbar />

    <div class="text-white max-w-[600px] mx-auto p-2">
      <h1 class="text-center py-5 text-xl sm:text-3xl md:text-4xl">Set your secrets</h1>
      <p class="text-center font-light">
        You will be asked for these things in the events that you forget your password. Please enter
        each data carefully and always remember what you set here as you will only be able to set it
        once :)
      </p>

      <p class="text-red-700 text-center font-bold text-xl pb-6">{{ errMsg }}</p>

      <form @submit.prevent="handleSubmit" class="flex flex-col py-10 gap-8">
        <div class="flex flex-col gap-2">
          <label>What is your favorite color?*</label>
          <input type="text" placeholder="Write here" v-model="color" />
        </div>

        <div class="flex flex-col gap-2">
          <label>Your Data Of Birth (DOB)*</label>
          <input type="date" v-model="DOB" />
        </div>

        <div class="flex flex-col gap-2">
          <label>What is your favorite food?*</label>
          <input type="text" placeholder="Write here" v-model="food" />
        </div>

        <button type="submit" class="bg-blue-700 text-lg py-2 px-4 mx-auto rounded-lg">
          Submit
        </button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { useUserStore } from '../stores/users'
import Navbar from '../components/app/Navbar.vue'

export default {
  name: 'UserSecrets',
  components: {
    Navbar
  },
  data() {
    return {
      color: '',
      DOB: '',
      food: '',
      errMsg: ''
    }
  },
  methods: {
    async handleSubmit() {
      const userStore = useUserStore()
      const { setUserSecrets } = userStore

      const userId: string = this.$route.params.userId.toString()

      const secrets = {
        color: this.color,
        DOB: this.DOB,
        food: this.food
      }

      try {
        const res = await setUserSecrets(secrets, userId)
        // debugger
        if (res === 'success') {
          this.$router.push({
            name: 'verify-user',
            params: {
              userId
            }
          })
        }
        // })
        if (res === 'fail') this.errMsg = userStore.errorMsg
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.month input,
.day input,
.year input {
  max-width: 100px;
}

input {
  color: #000;
  border-radius: 10px;
}
</style>
