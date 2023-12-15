<template>
  <div>
    <div>
      <!-- Section title -->
      <p class="text-white text-4xl text-center py-5">Your Events</p>
      <!-- Event search and filter -->
      <div class="flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Search event..."
          v-model="search"
          class="rounded-xl bg-inherit outline-none border border-white w-[300px]"
        />
        <div
          class="flex-col justify-center items-center relative"
          @mouseover="openFilter()"
          @mouseout="closeFilter()"
        >
          <button class="icon cursor-pointer z-30" title="filter events">
            <i class="fa-solid fa-filter text-white text-xl"></i>
          </button>

          <div
            :class="`flex flex-col absolute px-6 bg-gray-800 ${
              filterOpened ? 'block' : 'hidden'
            } left-[-110px] md:left-0`"
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

    <!-- Loader -->
    <div v-if="eventStore.loaders.getEvents" class="text-center py-10 px-2">Loading...</div>

    <!-- Events -->
    <div
      v-if="events && events.length > 0"
      class="event-container flex flex-col justify-center flex-wrap py-10 px-5 sm:flex-row"
    >
      <div v-for="(event, i) in events" :key="i" class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <RouterLink
          :to="`/event/${event._id}`"
          class="event-card flex flex-col gap-1 border p-3 rounded-lg hover:bg-[#fff1] cursor-pointer"
        >
          <p class="font-medium text-2xl">{{ event.name }}</p>
          <p class="text-lg">
            {{
              event?.description.length > 0
                ? event.description.substring(0, 20) + '...'
                : event?.description
            }}
          </p>
          <p class="text-sm">{{ event.status }}</p>
          <br />
          <p class="text-xs">{{ moment(event?.startDate).format('MMM Do, YYYY') }}</p>
        </RouterLink>
      </div>

      <!-- extra cards -->
      <div class="p-2 w-1/4 h-0"></div>
      <div class="p-2 w-1/4 h-0"></div>
      <div class="p-2 w-1/4 h-0"></div>
    </div>

    <div
      v-else-if="events && events.length < 1 && !eventStore.loaders.getEvents"
      class="text-center py-10 px-2"
    >
      No events found
    </div>

    <div class="flex justify-center items-center">
      <RouterLink
        to="/event/add"
        class="button bg-blue-700 text-white text-lg px-2 rounded-full text-center"
      >
        <i class="fa-solid fa-plus"></i>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { RouterLink } from 'vue-router'

export default {
  name: 'EventsList',
  components: {
    RouterLink
  },
  props: ['events', 'eventStore', 'fetchEvents'],
  data() {
    return {
      search: '',
      filterOpened: false,
      moment
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
      await this.fetchEvents({ status })
    }
  }
}
</script>

<style scoped>
.event-card {
  transition: 0.5s;
}
</style>
