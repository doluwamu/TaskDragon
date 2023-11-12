<template>
  <div v-if="taskStore.loaders.tasks" class="text-center">Loading...</div>
  <div class="flex flex-col gap-2" v-else-if="tasks.length > 0">
    <div class="tasks-list" v-for="(task, i) in tasks" :key="i">
      <div
        @click="fetchTask(task._id)"
        class="flex justify-between items-center p-3 border rounded-lg hover:bg-[#fff2]"
      >
        <RouterLink :to="`/tasks?details=${true}&tid=${task._id}`" class="task-name h-full w-full">
          {{ task?.title.length > 20 ? task?.title.substring(0, 20) + '...' : task?.title }}
        </RouterLink>
        <div class="flex items-center gap-3">
          <button v-if="task.favorite === true" @click="likeTask(task._id, task.favorite)">
            <i class="fa-solid fa-heart text-red-600"></i>
          </button>
          <button v-else @click="likeTask(task._id, task.favorite)">
            <i class="fa-solid fa-heart text-white"></i>
          </button>
          <!-- <i
            v-if="taskStore.loaders.deleteTask"
            class="fa-solid fa-trash text-red-600 cursor-not-allowed"
          ></i> -->
          <button v-if="taskStore.loaders.deleteTask">
            <i class="fa-solid fa-trash text-gray-200"></i>
          </button>
          <button v-else @click="removeTask(task._id)">
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
import { useTaskStore, fav } from '../../stores/tasks'

const taskStore = useTaskStore()

export default {
  name: 'TaskList',
  props: ['tasks', 'fetchTask', 'fetchTasks', 'taskStore', 'status', 'removeTask'],
  components: {
    RouterLink
  },
  data() {
    return {
      taskStore
    }
  },
  methods: {
    async likeTask(taskId: string, fav: boolean) {
      const { updateTaskLike } = taskStore

      const res = await updateTaskLike(taskId, !fav)

      if (res === 'success') {
        this.fetchTasks()
      }
    }
  }
}
</script>
