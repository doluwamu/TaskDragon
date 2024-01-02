<template>
  <div
    v-if="showDetails === true"
    class="add-task-modal flex justify-center items-center z-50 text-black fixed top-0 left-0 h-full w-full"
  >
    <RouterLink to="/tasks" class="absolute top-0 left-0 bg-[#0007] h-full w-full"></RouterLink>
    <div
      class="modal-form bg-gray-800 text-white py-5 px-3 z-50 w-11/12 overflow-y-auto max-h-[500px] md:w-2/3 md:px-5"
    >
      <div class="flex justify-between items-center md:gap-4">
        <div></div>
        <h1 class="text-center text-3xl">{{ task?.title }}</h1>
        <!-- <i v-if="task.favorite === true" class="fa-solid fa-heart text-pink-500"></i>
        <i v-else class="fa-solid fa-heart text-white"></i> -->
        <RouterLink to="/tasks">
          <i class="fa-solid fa-times text-xl p-3 text-white font-thin"></i>
        </RouterLink>
      </div>

      <!-- <p class="text-red-600 text-center" v-if="errMsg.length > 0">{{ errMsg }}</p>
      <p class="text-green-700 text-center" v-if="successMsg.length > 0">{{ successMsg }}</p> -->

      <p class="text-center py-5 px-2 max-w-4/5">{{ task?.description }}</p>

      <div class="details p-2 flex flex-col gap-4">
        <div class="flex flex-col flex-wrap justify-evenly gap-5 sm:gap-1 md:flex-row">
          <div class="flex flex-wrap justify-center gap-5 flex-row sm:justify-center">
            <!-- Priority -->
            <div class="flex flex-col gap-1 text-xs sm:flex-row">
              <p>Priority:</p>
              <p>{{ task?.priority }}</p>
            </div>

            <!-- Status -->
            <div
              :class="`flex flex-col gap-1 text-xs sm:flex-row ${
                task?.status === 'undone'
                  ? 'text-red-600'
                  : task?.status === 'doing'
                  ? 'text-orange-400'
                  : 'text-green-300'
              }`"
            >
              <p>Status:</p>
              <p>{{ task?.status }}</p>
            </div>
          </div>
        </div>
        <div class="foot flex flex-wrap justify-center gap-5 sm:justify-center">
          <!-- Start time -->
          <div class="flex flex-col text-xs gap-1 sm:flex-row">
            <p>Started on:</p>
            <p>{{ !task.startTime ? 'null' : moment(task?.startTime).format('MMM Do, YYYY') }}</p>
          </div>

          <!-- End time -->
          <div class="flex flex-col text-xs gap-1 sm:flex-row">
            <p>Ended on:</p>
            <p>{{ !task.endTime ? 'null' : moment(task?.endTime).format('MMM Do, YYYY') }}</p>
          </div>
        </div>

        <div class="flex justify-center gap-5 pt-5">
          <!-- Start time -->
          <div v-if="task?.createdAt" class="flex text-xs gap-1">
            <p>Created on:</p>
            <p>{{ moment(task?.createdAt).format('MMM Do, YYYY') }}</p>
          </div>
        </div>

        <div class="p-2 flex items-center justify-center">
          <button
            v-if="taskStore.loaders.getTask"
            type="button"
            class="button bg-gray-600 text-white w-[150px] px-3 py-2"
          >
            Loading...
          </button>
          <a
            :href="`/tasks?edit=${true}&tid=${task?._id}`"
            @click="fetchTask(task?._id)"
            v-else
            type="button"
            class="button bg-black text-white text-center w-[150px] px-3 py-2"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { RouterLink } from 'vue-router'

export default {
  name: 'TaskDetailsModal',
  props: ['showDetails', 'task', 'taskStore', 'fetchTask'],
  components: {
    RouterLink
  },
  data() {
    return {
      moment
    }
  },
  async mounted() {
    await this.fetchTask(this.$route.query.tid)
  }
}
</script>

<style scoped>
.modal-form {
  animation-fill-mode: forwards;
  animation: modalOpen 0.2s linear;
}

@keyframes modalOpen {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

input,
select,
textarea {
  background-color: rgb(31 41 55);
}

input::placeholder,
textarea::placeholder {
  color: #cdcdcd;
}
</style>
