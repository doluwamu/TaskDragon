<template>
  <section class="text-white">
    <Navbar />

    <div>tasks</div>
  </section>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'

export default {
  name: 'Tasks',
  components: {
    Navbar
  }
}
</script>
