<script setup lang="ts">
import Todo from './components/Todo/Todo.vue';
import ToggleDarkModeButton from './components/ToggleDarkModeButton/ToggleDarkModeButton.vue';
import { Skeleton } from 'primevue';
</script>

<template>
  <header class="flex justify-end p-4">
    <ToggleDarkModeButton />
  </header>

  <main class="px-4 h-dvh flex flex-col justify-start items-center min-h-[300px]">
    <Suspense>
      <Todo />
      <template #fallback>
        <div class="flex flex-col max-w-[632px] p-4 w-full">
          <Skeleton class="mb-8 mx-auto" width="300px" height="60px" />
          <Skeleton class="mb-4" width="100%" height="42px" />

          <ul class="mb-6">
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
            <li class="mb-2">
              <Skeleton width="100%" height="51px" />
            </li>
          </ul>

          <div class="flex justify-between items-center gap-6">
            <Skeleton width="96px" height="24px" />
            <ul class="flex gap-2">
              <li>
                <Skeleton width="47px" height="35px" />
              </li>
              <li>
                <Skeleton width="88px" height="35px" />
              </li>
              <li>
                <Skeleton width="117px" height="35px" />
              </li>
            </ul>
            <Skeleton width="160px" height="35px" />
          </div>
        </div>
      </template>
    </Suspense>
  </main>
</template>
