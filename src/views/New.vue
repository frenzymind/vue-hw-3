<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" @click.prevent="createTask" :disabled="!formValid">Создать</button>
  </form>
</template>


<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { TASK_STATUS } from "../constants/taskStatus";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const title = ref("");
    const date = ref("");
    const description = ref("");

    const createTask = () => {
      const taskDate = new Date(date.value);
      const currentDate = new Date().setHours(0, 0, 0, 0);

      const status =
        taskDate < currentDate ? TASK_STATUS.CANCEL : TASK_STATUS.ACTIVE;

      store.commit("add", {
        id: Date.now().toString(),
        title,
        date,
        description,
        status
      });
      router.push("/");
    };

    const formValid = computed(() => {
      return (
        title.value.length && date.value.length && description.value.length
      );
    });

    return {
      title,
      date,
      description,
      createTask,
      formValid
    };
  }
};
</script>