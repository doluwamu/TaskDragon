<template>
  <section class="text-white">
    <Navbar />

    <div class="flex flex-col mt-10">
      <button class="button p-2 mx-auto bg-blue-700 text-white w-[200px] text-center">
        Add task
      </button>

      <!-- Task lists -->
      <div class="flex flex-row gap-5 px-4 py-10 overflow-x-auto md:p-10 lg:justify-center">
        <!-- All tasks: -->
        <!-- Undone -->
        <div class="undone flex flex-col">
          <div
            class="flex items-center justify-between text-white bg-red-600 rounded-lg p-3 h-[70px] w-[300px] md:w-[350px]"
          >
            <p class="text-3xl">Undone</p>
            <p>{{ number.undone }}</p>
          </div>
          <TaskList :tasks="tasks.undone" />
        </div>

        <!-- Doing -->
        <div class="doing flex flex-col">
          <div
            class="flex items-center justify-between text-white bg-orange-600 rounded-lg p-3 h-[70px] w-[300px] md:w-[350px]"
          >
            <p class="text-3xl">Doing</p>
            <p>{{ number.doing }}</p>
          </div>
          <TaskList :tasks="tasks.doing" />
        </div>

        <!-- Done -->
        <div class="doing flex flex-col">
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
  </section>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import { useTaskStore } from '../stores/tasks'
import TaskList from '../components/tasks/TaskList.vue'

export default {
  name: 'Tasks',
  components: {
    Navbar,
    TaskList
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
      }
    }
  },
  async mounted() {
    const taskStore = useTaskStore()

    const { getUndoneTasks, getDoingTasks, getDoneTasks } = taskStore

    console.log(taskStore.loadingFetch)
    const undoneRes = await getUndoneTasks()
    const doingRes = await getDoingTasks()
    const doneRes = await getDoneTasks()

    if (undoneRes === 'success') {
      console.log(taskStore?.tasks)
      this.tasks.undone = taskStore?.tasks.undone
      this.number.undone = taskStore.number.undone
      console.log(this.tasks.undone)
    }

    if (doingRes === 'success') {
      console.log(taskStore?.tasks.doing)
      this.tasks.done = taskStore?.tasks.doing
      this.number.doing = taskStore.number.doing
      console.log(this.tasks.doing)
    }

    if (doneRes === 'success') {
      console.log(taskStore?.tasks.doing)
      this.tasks.done = taskStore?.tasks.done
      this.number.done = taskStore.number.done
      console.log(this.tasks.done)
    }
  }
}
</script>
