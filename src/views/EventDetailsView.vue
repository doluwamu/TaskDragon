<template>
  <div class="text-white">
    <Navbar />

    <!-- Toast Notifications start -->
    <div v-if="eventStore.successMsgs.setReminder.length > 0">
      <ToastNotification :message="eventStore.successMsgs.setReminder" messageType="success" />
    </div>

    <div v-if="eventStore.successMsgs.stopReminder.length > 0">
      <ToastNotification :message="eventStore.successMsgs.stopReminder" messageType="success" />
    </div>

    <div v-if="eventStore.errorMsg.length > 0">
      <ToastNotification :message="eventStore.errorMsg" messageType="error" />
    </div>
    <!-- Toast Notifications end -->

    <!-- Back button -->
    <RouterLink to="/events" class="absolute top-28 left-4 z-40">
      <i class="fa-solid fa-arrow-left"></i>
    </RouterLink>

    <!-- <div v-if="eventData?.status === 'ended'" class="bg-red-600 px-4 py-2 text-lg text-center">
      This event has ended
    </div>
    <div
      v-else-if="eventData?.status === 'ongoing'"
      class="bg-red-600 px-4 py-2 text-lg text-center"
    >
      This event is currently ongoing
    </div> -->

    <!-- <div
      class="flex justify-center items-center max-w-[1440px] max-h-[50px] bg-blue-900 py-6 px-3 text-center"
    ></div> -->

    <div class="flex justify-center items-center max-w-[1440px] min-h-[150px] bg-banner py-5 px-3">
      <!-- <h1 class="text-2xl">Event name:</h1> -->
      <p v-if="eventStore.$state.loaders.getEvent" class="text-center">Loading...</p>
      <p v-else class="text-xl text-center md:text-5xl max-w-[400px]">{{ eventData?.name }}</p>
    </div>

    <div
      class="flex flex-col gap-8 justify-center items-center py-8 px-2 max-w-[700px] mx-auto md:px-4"
    >
      <!-- <h1 class="text-5xl px-2 py-10 text-center">Event Details</h1> -->
      <div class="flex flex-col">
        <!-- <h1 class="text-2xl">Event Description:</h1> -->
        <p class="text-xl font-light text-justify">{{ eventData?.description }}</p>
      </div>

      <div class="flex flex-col justify-center items-center text-sm font-medium sm:flex-row">
        <button
          v-if="eventData?.reminder && !eventStore.$state.loaders.reminder"
          class="p-2 rounded-xl bg-red-700"
          @click="endReminder(eventData?._id)"
        >
          Stop reminder
        </button>
        <button
          v-else-if="!eventData?.reminder && !eventStore.$state.loaders.reminder"
          class="p-2 rounded-xl bg-green-700"
          @click="startReminder(eventData?._id)"
        >
          Set reminder
        </button>
        <button
          v-if="eventStore.$state.loaders.reminder"
          class="p-2 rounded-xl bg-[#fff3] cursor-not-allowed"
        >
          Loading...
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
        Status:
        <span>{{
          new Date(eventData?.startDate).getTime() <= Date.now() &&
          new Date(eventData?.endDate).getTime() >= Date.now()
            ? 'ongoing'
            : new Date(eventData?.startDate).getTime() > Date.now()
            ? 'upcoming'
            : 'ended'
        }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useEventStore } from '../stores/events'
import Navbar from '../components/app/Navbar.vue'
import moment from 'moment'
import { RouterLink } from 'vue-router'
import ToastNotification from '../components/toast/ToastNotification.vue'

const eventStore = useEventStore()

export default {
  name: 'EventDetails',
  components: {
    Navbar,
    RouterLink,
    ToastNotification
  },
  data() {
    return {
      eventData: {},
      eventStore,
      moment
    }
  },
  async mounted() {
    await this.fetchEvent(String(this.$route.params.eventId))
  },
  methods: {
    async fetchEvent(eventId: string) {
      const { getEvent } = eventStore
      const res = await getEvent(eventId)

      if (res === 'success') {
        this.eventData = eventStore.$state.event
      }
    },
    async startReminder(eventId: string) {
      const { setReminder } = eventStore
      const res = await setReminder(eventId)

      if (res === 'success') {
        await this.fetchEvent(eventId)
      }
    },
    async endReminder(eventId: string) {
      const { stopReminder } = eventStore
      const res = await stopReminder(eventId)

      if (res === 'success') {
        await this.fetchEvent(eventId)
      }
    }
  }
}
</script>
