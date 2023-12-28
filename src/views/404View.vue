<template>
  <div class="text-black min-h-screen flex justify-center items-center p-3">
    <div
      class="flex flex-col gap-5 justify-center items-center border bg-white border-white text-lg p-4 max-w-[500px] shadow-minDark sm:p-6 sm:text-2xl"
    >
      <p class="text-center font-bold">
        <span class="text-red-600">(404)</span>
        Page not found
      </p>
      <p class="text-center">Oooops! It seems the page you're looking for doesn't exist :(</p>

      <RouterLink to="/" class="text-lg text-sky-500">Go home</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import Navbar from '../components/app/Navbar.vue'

export default {
  name: '404',
  components: {
    Navbar
  }
}
</script>
