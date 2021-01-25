<template>
  <h1 class="text-white center" v-if="tasks.length === 0">Задач пока нет</h1>

  <h3 class="text-white" v-if="tasks.length">Всего активных задач: {{activeTaskCount}}</h3>
  <div class="card" v-for="(t, i) in tasks" :key="t.id">
    <h2 class="card-title">
      {{ t.title }}
      <AppStatus :type="t.status" />
    </h2>
    <p>
      <strong>
        <small>{{ new Date(t.date).toLocaleDateString() }}</small>
      </strong>
    </p>
    <router-link :to="`/task/${t.id}`">
      <button class="btn primary">Посмотреть</button>
    </router-link>
  </div>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { useStore } from "vuex";

export default {
  components: { AppStatus },
  setup() {
    const store = useStore();

    return {
      tasks: store.getters.allTasks,
      activeTaskCount: store.getters.activeCount
    };
  }
};
</script>
