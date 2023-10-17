<template>
  <section class="flex items-center justify-center">
    <div id="signin" class="text-white w-full my-4 p-5 rounded-3xl max-w-[600px] md:p-10">
      <h1 class="text-4xl pb-8 text-center">Login to TaskDragon</h1>
      <form class="flex flex-col gap-6">
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

        <button
          type="submit"
          @click.prevent="handleSubmit"
          class="bg-blue-700 text-lg py-2 px-4 mx-auto rounded-lg"
        >
          Signin
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'Signup',
  components: {
    RouterLink
  },
  data() {},
  props: ['message'],
  mounted() {
    console.log(this.message)
  },
  methods: {
    handleSubmit() {
      console.log('clicked')
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
