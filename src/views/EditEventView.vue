<template>
  <div class="text-white">
    <Navbar />

    <!-- Toast notifications start  -->
    <div v-if="eventStore.successMsgs.updateEvent.length > 0">
      <ToastNotification :message="eventStore.successMsgs.updateEvent" messageType="success" />
    </div>

    <div v-if="eventStore.$state.errorMsg.length > 0">
      <ToastNotification :message="eventStore.$state.errorMsg" messageType="error" />
    </div>
    <!-- Toast notifications ends  -->

    <EditEventForm :eventDetails="eventDetails" :fetchEvent="fetchEvent" />
  </div>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import EditEventForm from '../components/events/EditEventForm.vue'
import { useEventStore } from '../stores/events'
import ToastNotification from '../components/toast/ToastNotification.vue'

const eventStore = useEventStore()

export default {
  name: 'EditEvent',
  components: {
    Navbar,
    EditEventForm,
    ToastNotification
  },
  data() {
    return {
      eventDetails: {},
      eventStore
    }
  },
  async mounted() {
    await this.fetchEvent()
  },
  methods: {
    async fetchEvent() {
      const eventId = String(this.$route.params.eventId)
      const { getEvent } = eventStore

      const res = await getEvent(eventId)

      if (res === 'success') {
        this.eventDetails = eventStore.$state.event
        // console.log(this.eventDetails)
      }
    }
  }
}
</script>
