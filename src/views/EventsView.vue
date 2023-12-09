<template>
  <div class="text-white">
    <Navbar />

    <div>
      <p class="text-white">events</p>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'

export default {
  name: 'Events',
  components: {
    Navbar
  }
}
</script>
