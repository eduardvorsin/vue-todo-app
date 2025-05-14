<script lang="ts" setup>
import type { ITodo } from '@/services/api';
import TodoItem from '../TodoItem/TodoItem.vue';

defineProps<{ todos: ITodo[] }>();
</script>

<template>
  <ul v-if="todos.length" class="mb-6">
    <TodoItem v-for="todo in todos" :key="todo.id" :text="todo.text" :id="todo.id" :status="todo.status"
      :date="todo.date" class="not-last:mb-2" />
  </ul>
  <div v-else class="text-center text-2xl dark:text-slate-200 text-slate-800 mb-8">
    <p>Список задач пуст</p>
  </div>
</template>
