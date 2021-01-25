import { createStore } from 'vuex';
import { TASK_STATUS } from '../constants/taskStatus';

const LS_KEY = 'FB_DATA';

export default createStore({
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {
    getFromLocalStorage(state) {
      const rawData = localStorage.getItem(LS_KEY);

      if (rawData) {
        state.tasks = JSON.parse(rawData);
      }
    },
    add(state, payload) {
      state.tasks.push({
        ...payload,
      });

      localStorage.setItem(LS_KEY, JSON.stringify(state.tasks));
    },
    setStatus(state, { taskId, status }) {
      const updateTask = state.tasks.find(t => t.id === taskId);

      if (updateTask) {
        const updateIndex = state.tasks.indexOf(updateTask);

        state.tasks[updateIndex].status = status;
        localStorage.setItem(LS_KEY, JSON.stringify(state.tasks));
      }
    },
  },
  getters: {
    allTasks: state => state.tasks,
    taskById: state => id => {
      return state.tasks.find(t => t.id === id);
    },
    activeCount: state => {
      return state.tasks.reduce(
        (actives, t) =>
          t.status === TASK_STATUS.ACTIVE ? actives + 1 : actives,
        0
      );
    },
  },
  actions: {},
  modules: {},
});
