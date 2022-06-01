import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from "vue-axios";
import {router} from "./router";
import Vant from 'vant';
import 'vant/lib/index.css';
import QrReader from 'vue3-qr-reader';
const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(Vant)
app.use(QrReader);
app.mount('#app')
router.beforeEach((to, from, next) => {
    if(sessionStorage.getItem('token')){
        next();
    }else{
        if(to.path === '/login'){
            next();
        }else{
            next(`/?redirect=${to.path}`);
        }
    }
});
export default app;
