<template>
  <div class="text-white">
    <Navbar />

    <div v-if="eventData?.status === 'ended'" class="bg-red-600 px-4 py-2 text-lg text-center">
      This event has ended
    </div>
    <div
      v-else-if="eventData?.status === 'ongoing'"
      class="bg-red-600 px-4 py-2 text-lg text-center"
    >
      This event is currently ongoing
    </div>

    <div
      class="flex justify-center items-center max-w-[1440px] min-h-[150px] bg-blue-900 py-6 px-3"
    >
      <!-- <h1 class="text-2xl">Event name:</h1> -->
      <p class="text-5xl">{{ eventData?.name }}</p>
    </div>

    <div class="flex flex-col gap-5 justify-center items-center py-8 px-2 md:px-4">
      <!-- <h1 class="text-5xl px-2 py-10 text-center">Event Details</h1> -->
      <div class="flex flex-col">
        <!-- <h1 class="text-2xl">Event Description:</h1> -->
        <p class="text-xl font-light">{{ eventData?.description }}</p>
      </div>

      <!-- <div class="flex flex-col">
        <h1 class="text-2xl">Event Status:</h1>
        <p class="text-xl">{{ eventData?.status }}</p>
      </div> -->

      <!-- <div class="flex flex-col">
        <h1 class="text-2xl">Event name:</h1>
        <p class="text-xl">{{ eventData?.name }}</p>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { useEventStore } from '../stores/events'
import Navbar from '../components/app/Navbar.vue'

const eventStore = useEventStore()

export default {
  name: 'EventDetails',
  components: {
    Navbar
  },
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
