import './assets/styles.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple';

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      }
    }
  },
  ripple: true
});

app.directive('ripple', Ripple);

app.use(ToastService);
app.use(pinia);

app.mount('#app');
