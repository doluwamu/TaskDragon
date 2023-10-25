<template>
  <section class="text-white">
    <Navbar />

    <div class="flex flex-col mt-10">
      <div
        class="flex flex-col-reverse gap-5 justify-between items-center mx-auto md:flex-row md:w-[750px]"
      >
        <div></div>

        <h1 class="text-4xl text-center">Your Tasks</h1>

        <RouterLink
          :to="`/tasks?add=${true}`"
          @click="openModal"
          class="button p-2 bg-blue-700 text-white w-[200px] text-center"
        >
          Add task
        </RouterLink>
      </div>

      <!-- Task lists -->
      <div class="flex flex-row gap-5 px-4 py-10 overflow-x-auto md:p-10 lg:justify-center">
        <!-- All tasks: -->
        <!-- Undone -->
        <div class="undone flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-white bg-red-600 rounded-lg p-3 h-[70px] w-[300px] md:w-[350px]"
          >
            <p class="text-3xl">Undone</p>
            <p>{{ number.undone }}</p>
          </div>
          <TaskList :tasks="tasks.undone" />
        </div>

        <!-- Doing -->
        <div class="doing flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-white bg-orange-600 rounded-lg p-3 h-[70px] w-[300px] md:w-[350px]"
          >
            <p class="text-3xl">Doing</p>
            <p>{{ number.doing }}</p>
          </div>
          <TaskList :tasks="tasks.doing" />
        </div>

        <!-- Done -->
        <div class="doing flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-white bg-green-800 rounded-lg p-3 h-[70px] w-[300px] md:w-[350px]"
          >
            <p class="text-3xl">Done</p>
            <p>{{ number.done }}</p>
          </div>
          <TaskList :tasks="tasks.done" />
        </div>
      </div>
    </div>

    <AddTaskModal :add="add" />
  </section>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import { useTaskStore } from '../stores/tasks'
import TaskList from '../components/tasks/TaskList.vue'
import { RouterLink } from 'vue-router'
import AddTaskModal from '../components/tasks/AddTaskModal.vue'

export default {
  name: 'Tasks',
  components: {
    Navbar,
    TaskList,
    RouterLink,
    AddTaskModal
  },
  data() {
    return {
      tasks: {
        undone: [],
        doing: [],
        done: []
      },
      number: {
        undone: 0,
        doing: 0,
        done: 0
      },
      add: false
    }
  },
  async mounted() {
    if (this.$route.query.add && Boolean(this.$route.query.add) === true) {
      this.add = true
    }

    // fetch tasks
    this.fetchTasks()
  },
  methods: {
    openModal() {
      this.add = true
    },
    async fetchTasks() {
      const taskStore = useTaskStore()

      const { getUndoneTasks, getDoingTasks, getDoneTasks } = taskStore

      const undoneRes = await getUndoneTasks()
      const doingRes = await getDoingTasks()
      const doneRes = await getDoneTasks()

      if (undoneRes === 'success') {
        this.tasks.undone = taskStore?.tasks.undone
        this.number.undone = taskStore.number.undone
      }

      if (doingRes === 'success') {
        this.tasks.done = taskStore?.tasks.doing
        this.number.doing = taskStore.number.doing
      }

      if (doneRes === 'success') {
        this.tasks.done = taskStore?.tasks.done
        this.number.done = taskStore.number.done
      }
    }
  },
  updated() {
    if (this.$route.query.add && Boolean(this.$route.query.add) === true) {
      console.log(true)

      this.add = true
    }

    if (!this.$route.query.add && Boolean(this.$route.query.add) !== true) {
      this.add = false
    }

    // fetch tasks
    this.fetchTasks()
  }
}
</script>
