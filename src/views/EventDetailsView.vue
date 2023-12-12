<template>
  <div class="text-white"></div>
</template>

<script lang="ts">
import { useEventStore } from '../stores/events'

const eventStore = useEventStore()

export default {
  name: 'EventDetails',
  data() {
    return {
      eventData: {}
    }
  },
  async mounted() {
    await this.fetchEvents(String(this.$route.params.eventId))
  },
  methods: {
    async fetchEvents(eventId: string) {
      const { getEvent } = eventStore
      const req = await getEvent(eventId)

      if (req === 'success') {
        this.eventData = eventStore.$state.event
        console.log(this.eventData)
      }
    }
  }
}
</script>
