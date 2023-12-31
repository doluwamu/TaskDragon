<template>
  <div>
    <!-- Toast notifications start  -->
    <div v-if="eventStore.successMsgs.removeEvent.length > 0">
      <ToastNotification :message="eventStore.successMsgs.removeEvent" messageType="success" />
    </div>

    <div v-if="eventStore.successMsgs.clearEvents.length > 0">
      <ToastNotification :message="eventStore.successMsgs.clearEvents" messageType="success" />
    </div>

    <div v-if="eventStore.errorMsg.length > 0">
      <ToastNotification :message="eventStore.errorMsg" messageType="error" />
    </div>
    <!-- Toast notifications ends  -->

    <div>
      <!-- Section title -->
      <p class="text-white text-4xl text-center py-5">Your Events</p>
      <!-- Event search and filter -->
      <div class="flex justify-center items-center gap-1">
        <form @submit.prevent="fetchEvents({ search, status: filterOption })" class="relative">
          <input
            type="text"
            placeholder="Search event..."
            v-model="search"
            class="rounded-xl bg-inherit outline-none border border-white w-[200px] sm:w-[300px]"
          />
          <button type="submit" class="absolute right-3 top-2 cursor-pointer">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div
          class="flex-col justify-center items-center relative"
          @mouseover="openFilter()"
          @mouseout="closeFilter()"
        >
          <button
            class="icon cursor-pointer bg-blue-700 w-[35px] h-[35px] rounded-md z-30 transition hover:bg-blue-900"
            title="filter events"
          >
            <i class="fa-solid fa-list-ul text-white text-md"></i>
          </button>

          <div
            :class="`flex flex-col absolute px-6 bg-gray-800 ${
              filterOpened ? 'block' : 'hidden'
            } left-[-110px] z-30 md:left-0`"
          >
            <button class="py-2 px-4 text-center" @click="filterEvents('')">All</button>
            <button class="py-2 px-4 text-center" @click="filterEvents('upcoming')">
              Upcoming
            </button>
            <button class="py-2 px-4 text-center" @click="filterEvents('ongoing')">Ongoing</button>
            <button class="py-2 px-4 text-center" @click="filterEvents('ended')">Ended</button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-3 pt-8">
      <RouterLink
        to="/event/add"
        class="button bg-blue-700 text-white text-sm p-2 w-[35px] h-[35px] rounded-full text-center transition hover:bg-blue-900"
      >
        <i class="fa-solid fa-plus"></i>
      </RouterLink>
      <button
        class="button bg-red-700 text-white text-sm p-2 w-[35px] h-[35px] rounded-full text-center cursor-pointer transition hover:bg-red-900"
        title="Clear all events"
        @click="removeAllEvents"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>

    <!-- Loaders -->
    <div v-if="eventStore.loaders.getEvents" class="text-center py-10 px-2">Loading...</div>
    <div v-if="eventStore.loaders.removeEvent" class="text-center py-10 px-2">Deleting...</div>
    <div v-if="eventStore.loaders.clearEvents" class="text-center py-10 px-2">
      Deleting all events...
    </div>

    <!-- Events -->
    <div
      v-if="!eventStore.loaders.getEvents && events && events.length > 0"
      class="event-container flex flex-col justify-center flex-wrap pt-8 pb-5 px-5 sm:flex-row"
    >
      <div
        v-for="(event, i) in events"
        :key="i"
        class="p-2 w-full relative sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <RouterLink
          :to="`/event/${event._id}`"
          class="event-card flex flex-col gap-1 border p-3 rounded-lg hover:bg-[#fff1] cursor-pointer"
        >
          <p class="font-medium text-2xl" :title="event?.name">
            {{ event?.name.length > 8 ? event.name.substring(0, 8) + '...' : event?.name }}
          </p>
          <p class="text-lg">
            {{
              event?.description.length > 20
                ? event.description.substring(0, 20) + '...'
                : event?.description
            }}
          </p>
          <p class="text-sm">
            {{
              new Date(event?.startDate).getTime() <= Date.now() &&
              new Date(event?.endDate).getTime() >= Date.now()
                ? 'ongoing'
                : new Date(event?.startDate).getTime() > Date.now()
                ? 'upcoming'
                : 'ended'
            }}
          </p>
          <br />
          <p class="text-xs">{{ moment(event?.startDate).format('MMM Do, YYYY') }}</p>
        </RouterLink>

        <div
          class="flex flex-row-reverse justify-center items-center gap-3 absolute right-5 bottom-5"
        >
          <RouterLink :to="`/event/edit/${event._id}`">
            <i class="fa-solid fa-pen text-white"></i>
          </RouterLink>

          <button @click="deleteEvent(event._id)">
            <i class="fa-solid fa-trash text-red-400"></i>
          </button>
        </div>
      </div>

      <!-- extra cards -->
      <div class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-0"></div>
      <div class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-0"></div>
      <div class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-0"></div>
    </div>

    <div
      v-else-if="events && events.length < 1 && !eventStore.loaders.getEvents"
      class="text-center py-10 px-2"
    >
      No events found
    </div>

    <div class="flex items-center justify-center pb-5">
      <button
        v-if="events.length >= 20"
        @click="fetchEvents({ number: events.length + number, search, status: filterOption })"
        class="button bg-red-700 px-3 py-2 rounded-md"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { RouterLink } from 'vue-router'
import { useEventStore } from '../../stores/events'
import ToastNotification from '../toast/ToastNotification.vue'

const eventStore = useEventStore()

export default {
  name: 'EventsList',
  components: {
    RouterLink,
    ToastNotification
  },
  props: ['events', 'eventStore', 'fetchEvents', 'searchEvent'],
  data() {
    return {
      search: '',
      filterOpened: false,
      filterOption: '',
      moment,
      eventStore,
      number: 10
    }
  },
  methods: {
    openFilter() {
      this.filterOpened = true
    },
    closeFilter() {
      this.filterOpened = false
    },
    async filterEvents(status: string) {
      await this.fetchEvents({ status, search: this.search })
      this.filterOption = status
    },
    async deleteEvent(eventId: string) {
      const confirm = window.confirm('Do you want to delete this event')

      if (!confirm) return

      const { removeEvent } = eventStore

      const res = await removeEvent(eventId)
      if (res === 'success') {
        this.fetchEvents({})
      }
    },
    async removeAllEvents() {
      const confirm = window.confirm(
        'This will clear all your events. Are you sure you want to do this?'
      )

      if (!confirm) return

      const { clearEvents } = eventStore

      const res = await clearEvents()
      if (res === 'success') {
        this.fetchEvents({})
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
