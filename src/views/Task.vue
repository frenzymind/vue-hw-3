<template>
  <div class="card" v-if="task">
    <h2>{{task.title}}</h2>
    <p>
      <strong>Статус</strong>:
      <AppStatus :type="task.status" />
    </p>
    <p>
      <strong>Дэдлайн</strong>
      : {{ new Date(task.date).toLocaleDateString() }}
    </p>
    <p>
      <strong>Описание</strong>
      : {{task.description}}
    </p>
    <div>
      <button class="btn" @click="updateStatus(TASK_STATUS.EXEC)">Взять в работу</button>
      <button class="btn primary" @click="updateStatus(TASK_STATUS.DONE)">Завершить</button>
      <button class="btn danger" @click="updateStatus(TASK_STATUS.CANCEL)">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id =
    <strong>{{id}}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { TASK_STATUS } from "../constants/taskStatus";

export default {
  components: { AppStatus },
  setup() {
    const route = useRoute();
    const store = useStore();

    const id = route.params.id;

    const task = store.getters.taskById(id);

    const updateStatus = status => {
      store.commit("setStatus", {
        taskId: id,
        status
      });
    };

    return {
      task,
      id,
      updateStatus,
      TASK_STATUS
    };
  }
};
</script>

<style>
</style>