import { createRouter, createWebHistory } from 'vue-router';
import Tasks from '../views/Tasks.vue';
import NewTask from '../views/New.vue';
import Task from '../views/Task.vue';

const routes = [
  {
    path: '/',
    component: Tasks,
  },
  {
    path: '/new',
    component: NewTask,
  },
  {
    path: '/task/:id',
    component: Task,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

export default router;
