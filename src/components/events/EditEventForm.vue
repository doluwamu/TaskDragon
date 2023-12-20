<template>
  <div class="text-white px-7 py-3 w-full md:w-3/4">
    <!-- Back button -->
    <RouterLink to="/events">
      <div class="my-7">
        <i class="fa-solid fa-arrow-left text-xl"></i>
      </div>
    </RouterLink>

    <form class="flex flex-col gap-7 w-11/12" @submit.prevent="handleEventUpdate(eventId)">
      <h1 class="text-4xl">Edit event</h1>

      <p v-if="eventStore.loaders.getEvent">Loading...</p>

      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="text-md font-medium">Event name:</label>
          <input type="text" name="name" v-model="name" placeholder="Write here" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-md font-medium">Event description:</label>
          <textarea
            name="description"
            placeholder="Write here"
            cols="30"
            rows="10"
            class="resize-none"
            v-model="description"
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-md font-medium">Event start date:</label>
          <input type="datetime-local" name="startDate" v-model="startDate" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-md font-medium">Event end date:</label>
          <input type="datetime-local" name="endDate" v-model="endDate" />
        </div>

        <div class="flex gap-2 items-center">
          <label class="box-label"
            >Set reminder for this event
            <input type="checkbox" v-model="reminder" />
            <span class="checkmark"></span>
          </label>
        </div>

        <div class="mx-auto w-1/2">
          <button
            v-if="!eventStore.loaders.getEvent && !eventStore.loaders.updateEvent"
            type="submit"
            class="button w-full bg-blue-600 p-3 text-lg font-medium"
          >
            Update
          </button>
          <button
            v-else-if="eventStore.loaders.updateEvent"
            type="submit"
            class="button w-full bg-blue-300 p-3 text-lg font-medium cursor-not-allowed"
          >
            Updating...
          </button>
          <button
            v-else-if="eventStore.loaders.getEvent"
            type="submit"
            class="button w-full bg-blue-300 p-3 text-lg font-medium cursor-not-allowed"
          >
            Loading...
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useEventStore } from '../../stores/events'
import { RouterLink } from 'vue-router'
import moment from 'moment'

const eventStore = useEventStore()

export default {
  name: 'EditEventForm',
  components: {
    RouterLink
  },
  props: ['eventDetails', 'fetchEvent'],
  data() {
    return {
      name: this.eventDetails.name,
      description: this.eventDetails.description,
      startDate: moment(this.eventDetails.startDate).format('YYYY-MM-DDTHH:MM'),
      endDate: moment(this.eventDetails.endDate).format('YYYY-MM-DDTHH:MM'),
      reminder: this.eventDetails.reminder,
      eventId: this.eventDetails._id,
      eventStore
    }
  },
  async mounted() {
    await this.fetchEvent()

    this.name = eventStore.$state.event?.name
    this.description = eventStore.$state.event?.description
    this.startDate = moment(eventStore.$state.event?.startDate).format('YYYY-MM-DDThh:mm')
    this.endDate = moment(eventStore.$state.event?.endDate).format('YYYY-MM-DDThh:mm')
    this.reminder = eventStore.$state.event?.reminder
    this.eventId = eventStore.$state.event?._id
  },
  methods: {
    async handleEventUpdate(eventId: string) {
      const { updateEventDetails } = eventStore

      const eventInfo = {
        name: this.name,
        description: this.description,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        reminder: this.reminder
      }

      console.log(eventInfo)

      const res = await updateEventDetails(eventId, eventInfo)

      if (res === 'success') {
        console.log(eventStore.event)
      }
    }
  }
}
</script>

<style>
input,
textarea {
  background: inherit !important;
  color: #fff;
}

input[type='datetime-local']::-webkit-calendar-picker-indicator {
  cursor: pointer;
  border-radius: 4px;
  margin-right: 2px;
  filter: invert(1);
}

/* Customize the label (the box-label) */
.box-label {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.box-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.box-label:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.box-label input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.box-label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.box-label .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
