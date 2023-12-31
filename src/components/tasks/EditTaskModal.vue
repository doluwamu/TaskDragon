<template>
  <div
    v-if="edit === true"
    class="add-task-modal flex justify-center items-center z-40 text-black fixed top-0 left-0 h-full w-full"
  >
    <RouterLink to="/tasks" class="absolute top-0 left-0 bg-[#0007] h-full w-full"></RouterLink>
    <div
      class="modal-form bg-gray-800 text-white py-5 px-3 z-40 w-11/12 overflow-y-auto max-h-[500px] md:w-2/3 md:px-5"
    >
      <div class="flex justify-between items-center md:gap-4">
        <div></div>
        <h1 class="text-4xl font-semibold">Edit Task</h1>

        <RouterLink to="/tasks">
          <i class="fa-solid fa-times text-xl p-3 text-white font-thin"></i>
        </RouterLink>
      </div>

      <!-- Error message -->
      <p class="text-red-700 text-lg text-center">
        {{ errMsg }}
      </p>

      <div v-if="taskStore.loaders.getTask" class="text-lg text-center py-4">Loading...</div>

      <!-- <p class="text-red-600 text-center" v-if="errMsg.length > 0">{{ errMsg }}</p>
      <p class="text-green-700 text-center" v-if="successMsg.length > 0">{{ successMsg }}</p> -->

      <div class="flex flex-col justify-evenly md:flex-row">
        <form @submit.prevent="editTask(task?._id)" class="md:w-3/4">
          <!-- Title -->
          <div class="flex flex-col py-5">
            <label
              >Title:
              <span :class="`${title?.length <= 200 ? 'text-green-400' : 'text-red-600'}`">
                ({{ title?.length }}/200)</span
              ></label
            >
            <input type="text" v-model="title" class="text-3xl w-full text-white" />
          </div>

          <!-- Description -->
          <div class="flex flex-col py-5">
            <label>Description:</label>
            <textarea
              name="description"
              v-model="description"
              class="p-2 max-w-4/5 resize-none w-full my-4"
              cols="30"
              rows="6"
            ></textarea>
          </div>

          <div class="details p-2 flex flex-col gap-4">
            <div class="flex flex-col justify-evenly gap-5 sm:gap-1 md:flex-row">
              <div class="flex flex-wrap justify-center gap-5 flex-row sm:justify-center">
                <!-- Priority -->
                <div class="flex flex-col gap-1 text-lg">
                  <p>Priority:</p>
                  <select name="priority" v-model="priority">
                    <!-- <option class="text-gray-600" value="">{{ priority }}</option> -->
                    <option value="normal" class="text-gray-800">Normal</option>
                    <option value="important" class="text-gray-800">Important</option>
                    <option value="very-important" class="text-gray-800">Very important</option>
                  </select>
                </div>

                <!-- Status -->
                <div class="flex flex-col gap-1 text-lg">
                  <p class="text-white">Status:</p>
                  <select name="priority" v-model="status">
                    <!-- <option class="text-gray-600" value="">{{ priority }}</option> -->
                    <option value="undone" class="text-red-600">Undone</option>
                    <option value="doing" class="text-orange-400">Doing</option>
                    <option value="done" class="text-green-500">Done</option>
                  </select>
                  <button
                    v-if="taskStore.loaders.updateStatus"
                    class="button p-2 text-sm bg-green-400"
                  >
                    Loading...
                  </button>
                  <button
                    v-else
                    type="button"
                    @click="editTaskStatus(task?._id)"
                    class="button p-2 text-sm bg-green-600"
                  >
                    Update status
                  </button>
                </div>
              </div>
            </div>

            <div class="p-2 flex items-center justify-center">
              <button
                v-if="taskStore.loaders.updateTask"
                type="button"
                class="button bg-gray-600 text-white w-[150px] px-3 py-2"
              >
                Loading...
              </button>
              <button
                v-else
                type="submit"
                class="button bg-black text-white text-center w-[150px] px-3 py-2"
              >
                Update
              </button>
            </div>
          </div>
        </form>

        <!-- timestamps -->
        <div
          class="flex gap-5 justify-center flex-wrap md:flex-col md:justify-start md:mt-5 md:border-l md:border-[#fff2] md:p-5 md:w-1/5"
        >
          <!-- Start time -->
          <div class="flex flex-col text-xs gap-1 sm:flex-row md:flex-col">
            <p>Started on:</p>
            <p>{{ !task.startTime ? 'null' : moment(task?.startTime).format('MMM Do, YYYY') }}</p>
          </div>

          <!-- End time -->
          <div class="flex flex-col text-xs gap-1 sm:flex-row md:flex-col">
            <p>Completed on:</p>
            <p>{{ !task.endTime ? 'null' : moment(task?.endTime).format('MMM Do, YYYY') }}</p>
          </div>

          <!-- Created time -->
          <div class="flex flex-col text-xs gap-1 sm:flex-row md:flex-col">
            <p>Created on:</p>
            <p v-if="task?.createdAt">{{ moment(task?.createdAt).format('MMM Do, YYYY') }}</p>
            <p v-else>null</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { RouterLink } from 'vue-router'
// import { useTaskStore } from '../../stores/tasks'

// const taskStore = useTaskStore()

export default {
  name: 'EditTaskModal',
  props: ['edit', 'task', 'taskStore', 'fetchTask', 'fetchTasks'],
  components: {
    RouterLink
  },
  data() {
    return {
      moment,
      taskStore: this.taskStore,
      title: this.$props.task?.title,
      description: this.$props.task?.description,
      priority: this.$props.task?.priority,
      status: this.$props.task?.status,
      favorite: this.$props.task?.favorite,
      successMsgs: {
        updateTask: '',
        updateStats: '',
        updateFavorite: ''
      },
      errMsg: ''
    }
  },
  async mounted() {
    await this.fetchTask(this.$route.query.tid)

    this.title = this.taskStore.task.title
    this.description = this.taskStore.task.description
    this.priority = this.taskStore.task.priority
    this.status = this.taskStore.task.status
    this.favorite = this.taskStore.task.favorite
  },
  methods: {
    async editTask(taskId: string) {
      const { updateTask } = this.taskStore

      const taskDetails = {
        title: this.title,
        description: this.description,
        priority: this.priority
      }

      const res = await updateTask(taskId, taskDetails)

      if (res === 'success') {
        this.successMsgs.updateTask = this.taskStore.successMsgs.updateTask
        this.fetchTask(taskId)
        this.fetchTasks()
      }

      if (res === 'fail') {
        this.errMsg = this.taskStore.errorMsg
      }
    },
    async editTaskStatus(taskId: string) {
      const status = this.status
      // console.log(status)

      const { updateTaskStatus } = this.taskStore

      const res = await updateTaskStatus(taskId, status)
      if (res === 'success') {
        this.successMsgs.updateStats = this.taskStore.successMsgs.updateStatus
        this.fetchTask(taskId)
        this.fetchTasks()
      }

      if (res === 'fail') {
        this.errMsg = this.taskStore.errorMsg
      }
    }
  }
}
</script>

<style scoped>
input,
textarea,
option,
select {
  background-color: inherit;
}
</style>
