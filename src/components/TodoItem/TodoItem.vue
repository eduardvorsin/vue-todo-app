<script lang="ts" setup>
import { Button, Checkbox } from 'primevue';
import { ref } from 'vue';
import type { ITodo } from '@/services/api';
import { useTodoStore } from '@/stores/todo';
import useTodoToasts from '@/composables/useTodoToasts';

const { showTodoToast } = useTodoToasts();
const todoStore = useTodoStore();

const isDisabled = ref<boolean>(false);
const props = defineProps<ITodo>();
const checked = ref<boolean>(props.status === 'completed');

async function removeTodoHandler() {
  isDisabled.value = true;
  await todoStore.removeTodo(props.id);
  showTodoToast('remove');
}

async function toggleStatusHandler() {
  isDisabled.value = true;
  const newStatus = props.status === 'completed' ? 'active' : 'completed';
  await todoStore.updateTodoStatus(props.id, newStatus)
  showTodoToast('update')
  isDisabled.value = false;
}
</script>

<template>
  <li class="dark:bg-surface-800 bg-surface-200 p-2 rounded-lg flex items-center" :class="{ 'opacity-30': isDisabled }">
    <Checkbox class="mr-2" value="completed" v-model="checked" @change="toggleStatusHandler"
      :aria-label="status === 'completed' ? 'Отметить активным' : 'Отметить завершенным'" :disabled="isDisabled"
      binary />

    <p class="flex items-center gap-x-2 grow mr-4 wrap-break-word" :class="{ 'line-through': status === 'completed' }">
      <span class="grow text-md line-clamp-1">
        {{ text }}
      </span>

      <span
        class="text-sm dark:bg-surface-700 bg-surface-300 shrink-0 basis-22 p-1 rounded-sm line-clamp-1 text-center">
        {{ props.date }}
      </span>
    </p>

    <Button class="shrink-0" icon="pi pi-trash" @click.once="removeTodoHandler" size="small" aria-label="Удалить"
      :disabled="isDisabled" />
  </li>
</template>
