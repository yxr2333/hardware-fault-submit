import axios from "axios";
import {Notify, Toast} from "vant";
import success = Toast.success;
import {router} from "../router";
const NOT_LOGIN_INFO = '未登录或登录已过期,请重新登录!';
const service = axios.create({
    baseURL: '/api', // url = base url + request url
    timeout: 5000 // request timeout
});
service.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if(token) {
        // @ts-ignore
        config.headers.Authorization = token;
    }
    return config;
})
service.interceptors.response.use((success) => {
    if(success.status && success.status === 200) {
        if(success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
            Notify({
                message: success.data.msg,
                type: 'danger',
                duration: 2000
            })
            if(success.data.msg === NOT_LOGIN_INFO) {
                router.replace('/login');
            }
            return;
        }
        if(success.data.code === 200 && success.data.msg) {
            Notify({
                message: success.data.msg,
                type: 'success',
                duration: 2000
            })
        }
    }
    return success.data;
}, (error) => {
    if(error.response.code === 504 || error.response.code === 404) {
        Notify({
            message: '网络请求超时',
            type: 'danger',
            duration: 2000
        })
    } else if(error.response.code === 403) {
        Notify({
            message: '权限不足',
            type: 'danger',
            duration: 2000
        })
    } else if(error.response.code === 401) {
        Notify({
            message: '登录已过期',
            type: 'danger',
            duration: 2000
        })
        router.replace('/login');
    } else {
        if(error.response.data.msg){
            Notify({
                message: error.response.data.msg,
                type: 'danger',
                duration: 2000
            })
        }else {
            Notify({
                message: '未知错误',
                type: 'danger',
                duration: 2000
            })
        }
    }
});
export default service;