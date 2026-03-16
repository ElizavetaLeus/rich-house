import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { clickOutsideDirective } from './directives/click-outside';

import './assets/styles/index.css';

const app = createApp(App);

app.use(router);
app.directive('click-outside', clickOutsideDirective);
app.mount('#app');
