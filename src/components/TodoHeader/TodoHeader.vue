<script lang="ts" setup>
import useTodoNotifications from '@/composables/useTodoToasts';
import { useTodoStore } from '@/stores/todo';
import { InputText, InputGroup, Button } from 'primevue';
import { ref } from 'vue';

const text = ref<string>('');
const todoStore = useTodoStore();
const { showTodoToast } = useTodoNotifications();

function addTodoHandler() {
  if (!text.value.trim().length) return;

  todoStore.addTodo(text.value);
  showTodoToast('add');
  text.value = '';
}
</script>

<template>
  <InputGroup class="mb-4">
    <InputText type="text" name="todo-input" id="todo-input" variant="filled" v-model="text"
      @keyup.enter="addTodoHandler" placeholder="Добавить задачу" fluid />
    <Button icon="pi pi-plus" aria-label="Добавить задачу" @click="addTodoHandler" />
  </InputGroup>
</template>
