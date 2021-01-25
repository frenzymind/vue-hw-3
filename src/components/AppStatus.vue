<template>
  <span :class="['badge', statusClass]">{{ statusText }}</span>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { TASK_STATUS } from "../constants/taskStatus";

export default {
  props: {
    type: String,
  },
  setup(props) {
    const statusClass = computed(() => {
      let className = "";

      switch (props.type) {
        case TASK_STATUS.ACTIVE:
        case TASK_STATUS.DONE:
          className = "primary";
          break;
        case TASK_STATUS.EXEC:
          className = "warning";
          break;
        case TASK_STATUS.CANCEL:
          className = "danger";
          break;
      }

      return className;
    });

    const statusText = computed(() => {
      let text = "";

      switch (props.type) {
        case TASK_STATUS.ACTIVE:
          text = "Активен";
          break;
        case TASK_STATUS.EXEC:
          text = "Выполняется";
          break;
        case TASK_STATUS.CANCEL:
          text = "Отменён";
          break;
        case TASK_STATUS.DONE:
          text = "Завершён";
          break;
      }

      return text;
    });

    return {
      statusClass,
      statusText,
    };
  },
};
</script>