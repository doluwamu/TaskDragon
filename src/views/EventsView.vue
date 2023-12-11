<template>
  <div class="text-white">
    <Navbar />
    <EventsList :events="events" :eventStore="eventStore" />
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
      events: [],
      eventStore
    }
  },
  async mounted() {
    const { getEvents } = eventStore

    const req = await getEvents({ status: 'ended' })

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
