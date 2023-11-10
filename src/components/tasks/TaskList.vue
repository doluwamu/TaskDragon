<template>
  <div v-if="taskStore.loaders.tasks" class="text-center">Loading...</div>
  <div class="flex flex-col gap-2" v-else-if="tasks.length > 0">
    <div class="tasks-list" v-for="(task, i) in tasks" :key="i">
      <div
        @click="fetchTask(task._id)"
        class="flex justify-between items-center p-3 border rounded-lg hover:bg-[#fff2]"
      >
        <RouterLink :to="`/tasks?details=${true}&tid=${task._id}`" class="task-name text-center">
          {{ task?.title.length > 20 ? task?.title.substring(0, 20) + '...' : task?.title }}
        </RouterLink>
        <div class="flex items-center gap-3">
          <i
            :class="`fa-solid fa-heart ${task?.favorite === true ? 'text-red-600' : 'text-white'}`"
          ></i>
          <!-- <i
            v-if="taskStore.loaders.deleteTask"
            class="fa-solid fa-trash text-red-600 cursor-not-allowed"
          ></i> -->
          <button @click="removeTask(task._id)">
            <i class="fa-solid fa-trash cursor-pointer"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-white text-center">No tasks</div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { useTaskStore } from '../../stores/tasks'

const taskStore = useTaskStore()

export default {
  name: 'TaskList',
  props: ['tasks', 'fetchTask', 'taskStore', 'status', 'removeTask'],
  components: {
    RouterLink
  },
  data() {
    return {
      taskStore
    }
  }
}
</script>
