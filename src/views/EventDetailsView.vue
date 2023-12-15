<template>
  <div class="text-white">
    <Navbar />

    <!-- Back button -->
    <RouterLink to="/events" class="absolute top-28 left-4 z-40">
      <i class="fa-solid fa-arrow-left"></i>
    </RouterLink>

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
      class="flex justify-center items-center max-w-[1440px] max-h-[50px] bg-blue-900 py-6 px-3 text-center"
    ></div>

    <div class="flex justify-center items-center max-w-[1440px] min-h-[150px] bg-blue-900 p-3">
      <!-- <h1 class="text-2xl">Event name:</h1> -->
      <p v-if="eventStore.$state.loaders.getEvent" class="text-center">Loading...</p>
      <p v-else class="text-5xl text-center">{{ eventData?.name }}</p>
    </div>

    <div class="flex flex-col gap-8 justify-center items-center py-8 px-2 md:px-4">
      <!-- <h1 class="text-5xl px-2 py-10 text-center">Event Details</h1> -->
      <div class="flex flex-col">
        <!-- <h1 class="text-2xl">Event Description:</h1> -->
        <p class="text-xl font-light text-justify">{{ eventData?.description }}</p>
      </div>

      <div class="flex flex-col justify-center items-center text-sm font-medium sm:flex-row">
        <button v-if="eventData?.reminder" class="p-2 rounded-xl bg-red-700">Stop reminder</button>
        <button v-if="!eventData?.reminder" class="p-2 rounded-xl bg-green-700">
          Set reminder
        </button>
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

    <div
      class="fixed bottom-0 flex flex-col left-0 justify-center items-center text-center gap-4 bg-blue-950 w-full p-3 sm:flex-row sm:gap-10"
    >
      <p class="text-xs">
        Starts on: <span>{{ moment(eventData?.startDate).format('Do MMM, YYYY h:mm a') }}</span>
      </p>
      <p class="text-xs">
        Ends on: <span>{{ moment(eventData?.endDate).format('Do MMM, YYYY h:mm a') }}</span>
      </p>
      <p class="text-xs">
        Status: <span>{{ eventData?.status }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useEventStore } from '../stores/events'
import Navbar from '../components/app/Navbar.vue'
import moment from 'moment'
import { RouterLink } from 'vue-router'

const eventStore = useEventStore()

export default {
  name: 'EventDetails',
  components: {
    Navbar,
    RouterLink
  },
  data() {
    return {
      eventData: {},
      eventStore,
      moment
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
      }
    }
  }
}
</script>
