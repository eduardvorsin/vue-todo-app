

import { createTodo, deleteCompletedTodos, deleteTodo, fetchTodos, updateTodo, type ITodo } from "@/services/api";
import { compareByDate, compareByText, formatErrorForUser } from "@/utils";
import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type FilterCategories = 'all' | 'active' | 'completed';
type SortOptions = 'date' | 'name';

const FILTERS: Record<Uppercase<FilterCategories>, FilterCategories> = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const SORT_OPTIONS: Record<Uppercase<SortOptions>, SortOptions> = {
  DATE: 'date',
  NAME: 'name',
};

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<ITodo[]>([]);
  const error = ref<string>('');
  const filterCategory = ref<FilterCategories>(FILTERS.ALL);
  const sortOption = ref<SortOptions>(SORT_OPTIONS.NAME);

  async function getTodos() {
    try {
      const data = await fetchTodos();
      todos.value = data;
      error.value = '';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = formatErrorForUser<ITodo>(err);
      }
    }
  }

  async function addTodo(text: string) {
    try {
      const newTodo = await createTodo(text);
      todos.value.push(newTodo);
      error.value = '';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = formatErrorForUser<ITodo>(err);
      }
    }
  }

  async function removeTodo(id: string) {
    try {
      await deleteTodo(id);
      todos.value = todos.value.filter(todo => todo.id !== id);
      error.value = '';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = formatErrorForUser<ITodo>(err);
      }
    }
  }

  async function removeCompleted() {
    try {
      await deleteCompletedTodos();
      todos.value = todos.value.filter(todo => todo.status !== FILTERS.COMPLETED);
      error.value = '';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = formatErrorForUser<ITodo>(err);
      }
    }
  }

  async function updateTodoStatus(id: string, newStatus: ITodo['status']) {
    try {
      await updateTodo(id, { status: newStatus });
      todos.value = todos.value.map((todo) => {
        return todo.id === id ? { ...todo, status: newStatus } : todo;
      });
      error.value = '';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = formatErrorForUser<ITodo>(err);
      }
    }
  }

  function setFilterCategory(category: FilterCategories) {
    filterCategory.value = category;
  }

  function setSortOption(option: SortOptions) {
    sortOption.value = option;
  }

  function $reset() {
    todos.value = [];
    filterCategory.value = FILTERS.ALL;
    sortOption.value = SORT_OPTIONS.NAME;
    error.value = '';
  }

  const visibleTodos = computed(() => {
    let resultTodos = [...todos.value];
    if (filterCategory.value !== FILTERS.ALL) {
      resultTodos = todos.value.filter(todo => todo.status === filterCategory.value);
    }

    const sortMethod = sortOption.value === 'name' ? compareByText : compareByDate;
    return resultTodos.sort(sortMethod);
  });

  return {
    filterCategory,
    sortOption,
    error,
    getTodos,
    addTodo,
    removeTodo,
    removeCompleted,
    updateTodoStatus,
    setFilterCategory,
    setSortOption,
    $reset,
    visibleTodos,
  };
});

