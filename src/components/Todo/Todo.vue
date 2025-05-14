<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import TodoHeader from '../TodoHeader/TodoHeader.vue';
import TodoFooter from '../TodoFooter/TodoFooter.vue';
import { Toast, Message } from 'primevue';
import TodoList from '../TodoList/TodoList.vue';

const todoStore = useTodoStore();
await todoStore.getTodos();

</script>
<template>
  <section class="bg-surface-100 dark:bg-surface-900 max-w-[632px] w-full my-0 mx-auto p-4 rounded-lg">
    <h1 class="dark:text-primary-400 text-primary-600 text-6xl text-center mb-8 font-normal">Задачи</h1>

    <template v-if="todoStore.error.length > 0">
      <Message severity="error">{{ todoStore.error }}</Message>
    </template>
    <template v-else>
      <TodoHeader />
      <TodoList :todos="todoStore.visibleTodos" />
      <TodoFooter />
    </template>
  </section>

  <Toast position="bottom-right" />
</template>
