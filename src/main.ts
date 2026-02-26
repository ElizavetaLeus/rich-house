import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/styles/index.css';
import '@/assets/fonts/fonts.css';

const app = createApp(App);

app.use(router);
app.mount('#app');
