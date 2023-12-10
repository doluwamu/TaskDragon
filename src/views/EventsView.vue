<template>
  <div class="text-white">
    <Navbar />

    <EventsList />
  </div>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import events from '../assets/data'
import moment from 'moment'
import EventsList from '../components/events/EventsList.vue'

export default {
  name: 'Events',
  components: {
    Navbar,
    EventsList
  },
  data() {
    return {
      search: '',
      filterOpened: false,
      events,
      moment
    }
  },
  methods: {
    openFilter() {
      this.filterOpened = true
    },
    closeFilter() {
      this.filterOpened = false
    }
  }
}
</script>

<style scoped>
.event-card {
  transition: 0.5s;
}
</style>
