// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { MotionPlugin } from '@vueuse/motion'

import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.scss';
import 'bootstrap/dist/js/bootstrap.js';


const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(MotionPlugin);

app.mount('#app');
