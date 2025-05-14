

import { fetchTodos, type ITodo } from "@/services/api";
import { formatErrorForUser } from "@/utils";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

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


  return {
    filterCategory,
    sortOption,
    error,
    getTodos
  };
});

