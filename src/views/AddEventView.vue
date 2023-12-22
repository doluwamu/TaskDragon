<template>
  <div>
    <Navbar />

    <div class="flex">
      <AddEventForm />
      <!-- <AdsBar /> -->
    </div>
  </div>
</template>

<script lang="ts">
import AdsBar from '../components/adds/AdsBar.vue'
import Navbar from '../components/app/Navbar.vue'
import AddEventForm from '../components/events/AddEventForm.vue'

export default {
  name: 'AddEvent',
  components: {
    Navbar,
    AddEventForm,
    AdsBar
  }
}
</script>
