import { createApp } from 'vue';
import elementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import Elm from '../lib'
import '../lib/style.scss'

createApp(App).use(Elm).use(elementPlus).mount('#app');
