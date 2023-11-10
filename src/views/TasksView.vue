<template>
  <section class="text-white">
    <Navbar />

    <div class="flex flex-col mt-10">
      <div
        class="flex flex-col gap-5 justify-between items-center mx-auto sm:flex-row sm:w-[400px] md:w-[750px]"
      >
        <div></div>

        <h1 class="text-4xl text-center">Your Tasks</h1>

        <RouterLink
          :to="`/tasks?add=${true}`"
          @click="openModal"
          class="button bg-blue-700 text-white text-lg px-2 rounded-full text-center"
        >
          <i class="fa-solid fa-plus"></i>
        </RouterLink>
      </div>

      <!-- Loaders -->
      <div v-if="taskStore.loaders.deleteTask" class="text-center text-white mt-8">Deleting...</div>

      <!-- Success -->
      <div v-if="successMsgs.deleteTask.length > 0" class="text-center text-green-400 mt-8">
        {{ successMsgs.deleteTask }}
      </div>

      <!-- Task lists -->
      <div class="flex flex-row gap-5 px-4 py-10 overflow-x-auto md:p-10 lg:justify-center">
        <!-- All tasks: -->
        <!-- Undone -->
        <div class="undone flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-white bg-red-600 rounded-lg p-3 h-[70px] w-[250px] sm:w-[300px]"
          >
            <p class="text-3xl">Undone</p>
            <p>{{ number.undone }}</p>
          </div>
          <TaskList
            status="undone"
            :taskStore="taskStore"
            :fetchTask="fetchTask"
            :tasks="tasks.undone"
            :removeTask="removeTask"
          />
          <LoadMoreTasksBtn
            :tasks="tasks.undone"
            status="undone"
            :fetchMoreTasks="fetchMoreTasks"
            btnColor="bg-red-600 w-[100px]"
          />
        </div>

        <!-- Doing -->
        <div class="doing flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-white bg-orange-600 rounded-lg p-3 h-[70px] w-[250px] sm:w-[300px]"
          >
            <p class="text-3xl">Doing</p>
            <p>{{ number.doing }}</p>
          </div>
          <TaskList
            status="doing"
            :taskStore="taskStore"
            :fetchTask="fetchTask"
            :tasks="tasks.doing"
            :removeTask="removeTask"
          />
          <LoadMoreTasksBtn
            :tasks="tasks.doing"
            status="doing"
            :fetchMoreTasks="fetchMoreTasks"
            btnColor="bg-orange-600 w-[100px]"
          />
        </div>

        <!-- Done -->
        <div class="doing flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-white bg-green-800 rounded-lg p-3 h-[70px] w-[250px] sm:w-[300px]"
          >
            <p class="text-3xl">Done</p>
            <p>{{ number.done }}</p>
          </div>
          <TaskList
            status="done"
            :taskStore="taskStore"
            :fetchTask="fetchTask"
            :tasks="tasks.done"
            :removeTask="removeTask"
          />
          <LoadMoreTasksBtn
            :tasks="tasks.done"
            status="done"
            :fetchMoreTasks="fetchMoreTasks"
            btnColor="bg-green-800 w-[100px]"
          />
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddTaskModal :add="add" />
    <TaskDetailsModal
      :showDetails="showDetails"
      :task="task"
      :taskStore="taskStore"
      :fetchTask="fetchTask"
    />
    <EditTaskModal
      :edit="edit"
      :task="task"
      :taskStore="taskStore"
      :fetchTask="fetchTask"
      :fetchTasks="fetchTasks"
    />
  </section>
</template>

<script lang="ts">
import Navbar from '../components/app/Navbar.vue'
import { useTaskStore } from '../stores/tasks'
import TaskList from '../components/tasks/TaskList.vue'
import { RouterLink } from 'vue-router'
import AddTaskModal from '../components/tasks/AddTaskModal.vue'
import EditTaskModal from '../components/tasks/EditTaskModal.vue'
import TaskDetailsModal from '../components/tasks/TaskDetailsModal.vue'
import LoadMoreTasksBtn from '../components/tasks/LoadMoreTasksBtn.vue'

const taskStore = useTaskStore()

export default {
  name: 'Tasks',
  components: {
    Navbar,
    TaskList,
    RouterLink,
    AddTaskModal,
    EditTaskModal,
    TaskDetailsModal,
    LoadMoreTasksBtn
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
      displayNumbers: {
        undone: 10,
        doing: 10,
        done: 10
      },
      successMsgs: {
        deleteTask: ''
      },
      errorMsg: '',
      add: false,
      edit: false,
      task: {},
      fetchTaskLoading: false,
      taskStore,
      showDetails: false
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
      // const taskStore = useTaskStore()

      const { getUndoneTasks, getDoingTasks, getDoneTasks } = taskStore

      const undoneRes = await getUndoneTasks(this.displayNumbers.undone)
      const doingRes = await getDoingTasks(this.displayNumbers.doing)
      const doneRes = await getDoneTasks(this.displayNumbers.done)

      if (undoneRes === 'success') {
        this.tasks.undone = taskStore?.tasks.undone
        this.number.undone = taskStore.number.undone
      }

      if (doingRes === 'success') {
        this.tasks.doing = taskStore?.tasks.doing
        this.number.doing = taskStore.number.doing
      }

      if (doneRes === 'success') {
        this.tasks.done = taskStore?.tasks.done
        this.number.done = taskStore.number.done
      }
    },
    async fetchMoreTasks(status: string, number: number) {
      // const taskStore = useTaskStore()
      const { getUndoneTasks, getDoingTasks, getDoneTasks } = taskStore

      if (status === 'undone') {
        const res = await getUndoneTasks(this.displayNumbers.undone + number)
        if (res === 'success') {
          this.displayNumbers.undone = this.displayNumbers.undone + number
          this.tasks.undone = taskStore?.tasks.undone
          this.number.undone = taskStore.number.undone
        }
      } else if (status === 'doing') {
        const res = await getDoingTasks(this.displayNumbers.doing + number)
        if (res === 'success') {
          this.displayNumbers.doing = this.displayNumbers.doing + number
          this.tasks.doing = taskStore?.tasks.doing
          this.number.doing = taskStore.number.doing
        }
      } else {
        const res = await getDoneTasks(this.displayNumbers.done + number)
        if (res === 'success') {
          this.displayNumbers.done = this.displayNumbers.done + number
          this.tasks.done = taskStore?.tasks.done
          this.number.done = taskStore.number.done
        }
      }
    },
    async fetchTask(id: string) {
      // const taskStore = useTaskStore()
      const { getTask } = taskStore
      this.task = {}

      // const id = this.$route.query.tid

      const res = await getTask(id)

      if (res === 'success') {
        this.task = taskStore.task
      }
    },
    async removeTask(id: string) {
      const { deleteTask } = taskStore

      const confirm = window.confirm('Do you want to delete this task')

      if (confirm) {
        const res = await deleteTask(id)

        if (res === 'success') {
          this.successMsgs.deleteTask = taskStore.successMsgs.deleteTask
          this.fetchTasks()
          setTimeout(() => (this.successMsgs.deleteTask = ''), 8000)
        }

        if (res === 'fail') {
          this.errorMsg = taskStore.errorMsg
        }
      }
    }
  },
  updated() {
    if (this.$route.query.add && Boolean(this.$route.query.add) === true) {
      this.add = true
    }

    if (!this.$route.query.add || Boolean(this.$route.query.add) !== true) {
      this.add = false
    }

    if (this.$route.query.added && Boolean(this.$route.query.added) === true) {
      // fetch tasks
      this.fetchTasks().then((_) => {
        // setTimeout(() => {
        this.$router.push({
          name: 'tasks'
        })
        // }, 1000)
      })
    }

    if (this.$route.query.details && Boolean(this.$route.query.details) === true) {
      this.showDetails = true
    }

    if (!this.$route.query.details || Boolean(this.$route.query.details) !== true) {
      this.showDetails = false
    }

    if (this.$route.query.edit && Boolean(this.$route.query.edit) === true) {
      this.edit = true
    }

    if (!this.$route.query.edit || Boolean(this.$route.query.edit) !== true) {
      this.edit = false
    }
  }
}
</script>
