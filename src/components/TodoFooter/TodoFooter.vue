<script lang="ts" setup>
import useTodoNotifications from '@/composables/useTodoToasts';
import { useTodoStore } from '@/stores/todo';
import { Button, Menu } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';

const { showTodoToast } = useTodoNotifications()
const todoStore = useTodoStore();

const { setFilterCategory, setSortOption, removeCompleted } = todoStore;

function removeCompletedHandler() {
  removeCompleted();
  showTodoToast('removeCompleted');
}

const filtersMenu = ref<InstanceType<typeof Menu>>();
const sortMenu = ref<InstanceType<typeof Menu>>();
const activeFilterKey = ref<string>('all');
const activeSortKey = ref<string>('name');
const filters = ref<MenuItem[]>([
  {
    label: 'Показать задачи',
    items: [
      {
        key: 'all',
        label: 'Все',
        command: () => setFilterCategory('all'),
      },
      {
        key: 'completed',
        label: 'Выполненные',
        command: () => setFilterCategory('completed'),
      },
      {
        key: 'active',
        label: 'Активные',
        command: () => setFilterCategory('active'),
      }
    ]
  }
]);
const sort = ref<MenuItem[]>([
  {
    label: 'Сортировать по',
    items: [
      {
        key: 'name',
        label: 'Названию',
        command: () => setSortOption('name'),
      },
      {
        key: 'date',
        label: 'Дате',
        command: () => setSortOption('date'),
      },
    ]
  }
]);

function selectFilterKey(item: MenuItem) {
  if (item.key) activeFilterKey.value = item.key;
}
function selectSortKey(item: MenuItem) {
  if (item.key) activeSortKey.value = item.key;
}

const toggleFiltersMenu = (e: Event) => filtersMenu.value?.toggle(e);
const toggleSortMenu = (e: Event) => sortMenu.value?.toggle(e);
</script>

<template>
  <div class="flex gap-6 justify-between items-center">
    <span class="basis-24 line-clamp-1 dark:text-slate-100 text-slate-900">
      {{ todoStore.visibleTodos.length }} задач
    </span>

    <div class="flex gap-x-2">
      <Button icon="pi pi-filter" aria-label="Фильтрация задач" aria-haspopup="true" aria-controls="filters-menu"
        @click="toggleFiltersMenu" variant="outlined" />
      <Menu class="mt-2" id="filters-menu" ref="filtersMenu" :model="filters" :popup="true">
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center" v-bind="props.action" @click="selectFilterKey(item)">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <span :class="activeFilterKey === item.key ? 'pi pi-check' : ''" />
          </a>
        </template>
      </Menu>

      <Button icon="pi pi-sort-alt" aria-label="Сортировка задач" aria-haspopup="true" aria-controls="sort-menu"
        @click="toggleSortMenu" variant="outlined" />
      <Menu class="mt-2" id="sort-menu" ref="sortMenu" :model="sort" :popup="true">
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center" v-bind="props.action" @click="selectSortKey(item)">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <span :class="activeSortKey === item.key ? 'pi pi-check' : ''" />
          </a>
        </template>
      </Menu>
    </div>

    <Button severity="danger" @click="removeCompletedHandler" size="small">
      Убрать выполненые
    </Button>
  </div>

</template>
