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
          class="flex-col justify-center items-center"
          @mouseover="openFilter()"
          @mouseout="closeFilter()"
        >
          <button class="icon cursor-pointer z-30" title="filter events">
            <i class="fa-solid fa-filter text-white text-xl"></i>
          </button>

          <div
            :class="`flex flex-col absolute px-6 bg-gray-800 ${filterOpened ? 'block' : 'hidden'}`"
          >
            <button class="py-2 px-4 text-center">All</button>
            <button class="py-2 px-4 text-center">Upcoming</button>
            <button class="py-2 px-4 text-center">Ongoing</button>
            <button class="py-2 px-4 text-center">Ended</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Events -->
    <div class="event-container flex flex-col justify-center flex-wrap py-10 px-5 sm:flex-row">
      <div v-for="(event, i) in events" :key="i" class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div
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
        </div>
      </div>

      <!-- extra cards -->
      <div class="p-2 w-1/4 h-0"></div>
      <div class="p-2 w-1/4 h-0"></div>
      <div class="p-2 w-1/4 h-0"></div>
    </div>
  </div>
</template>

<script lang="ts">
import events from '../../assets/data'
import moment from 'moment'

export default {
  name: 'EventsList',
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
