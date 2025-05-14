<script lang="ts" setup>
import { Button } from 'primevue';
import { ref } from 'vue';
const isDarkMode = ref<boolean>(false);

const clickHandler = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

</script>
<template>
  <Button :icon="`pi ${isDarkMode ? 'pi-sun' : 'pi-moon'}`" aria-label="Переключение темной темы"
    @click="clickHandler" />
</template>
