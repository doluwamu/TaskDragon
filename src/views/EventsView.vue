<template>
  <div class="text-white">
    <Navbar />
    <EventsList :events="events" />
  </div>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import EventsList from '../components/events/EventsList.vue'
import { useEventStore } from '../stores/events'

const eventStore = useEventStore()

export default {
  name: 'Events',
  components: {
    Navbar,
    EventsList
  },

  data() {
    return {
      events: []
    }
  },
  async mounted() {
    const { getEvents } = eventStore

    const req = await getEvents()

    if (req === 'success') {
      this.events = eventStore.$state.events
    }
  },
  methods: {}
}
</script>

<style scoped>
.event-card {
  transition: 0.5s;
}
</style>
