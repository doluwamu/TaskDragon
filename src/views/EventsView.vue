<template>
  <div class="text-white">
    <Navbar />
    <EventsList :events="events" :eventStore="eventStore" :fetchEvents="fetchEvents" />
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
    await this.fetchEvents()
  },
  methods: {
    async fetchEvents(params?: { status?: string; search?: string; number?: number }) {
      const { getEvents } = eventStore

      const args = params ? params : {}

      const req = await getEvents(args)

      if (req === 'success') {
        this.events = eventStore.$state.events
      }
    }
  }
}
</script>

<style scoped>
.event-card {
  transition: 0.5s;
}
</style>
