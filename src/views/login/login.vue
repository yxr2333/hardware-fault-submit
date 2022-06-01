<script setup lang="ts">
import {Notify} from "vant";
import {onBeforeMount, reactive, ref} from "vue";
import {UserLoginParam} from "./data";
import {checkLogin, doLogin} from "../../api/user";
import {useRoute,useRouter} from "vue-router";
import {AxiosResponse} from "axios";

let captchaUrl = ref('/api/captcha');
let param :UserLoginParam = reactive<UserLoginParam>({
  code : null,
  password : null,
  id: null,
});
const router = useRouter();

onBeforeMount(() => {
  const token = sessionStorage.getItem('token');
  if(token){
    checkLogin().then((res :AxiosResponse) => {
      if(res){
        router.push('/home');
      }
    })
  }
});

const handleReloadCaptcha = () => {
  captchaUrl.value += '?t=' + Date.now();
}

const handleLogin = () => {
  if(!param.code){
    Notify({
      type: 'danger',
      message: '请输入验证码'
    })
    return;
  }
  if(!param.password){
    Notify({
      type: 'danger',
      message: '请输入密码'
    })
    return;
  }
  if(!param.id){
    Notify({
      type: 'danger',
      message: '请输入工号'
    })
    return;
  }
  doLogin(param).then((resp :AxiosResponse) => {
    // @ts-ignore
    if(resp && resp.code === 200){
      Notify({
        type: 'success',
        message: '登录成功'
      })
      sessionStorage.setItem('token',resp.data.token);
      sessionStorage.setItem('user',JSON.stringify(resp.data.user));
      setTimeout(() => {
        router.push({
          name: 'home'
        })
      },1100);

    }
  })
}
</script>

<template>
  <div class="login-container">
    <van-notify />
    <div class="form-wrapper">
      <div class="header-title">系统登录</div>
      <div class="main-container">
        <van-cell-group inset style="margin: 0;padding: 10px;">
          <van-field
              v-model="param.id"
              label="工号"
              left-icon="manager"
              required
              placeholder="请输入工号"
              type="digit" />
          <van-field
              v-model="param.password"
              label="密码"
              type="password"
              left-icon="lock"
              required
              placeholder="请输入密码"/>
          <van-cell style="display: flex;align-items: flex-end;justify-content: center">
            <div style="flex: 2;">
              <van-field
                  style="padding: 0;width: 100%"
                  v-model="param.code"
                  label="验证码"
                  left-icon="qr"
                  placeholder="请输入验证码"
                  maxlength="4"
                  required
                  clearable
              />
            </div>
            <div style="flex: 1;text-align: right">
              <div style="color: #000;font-size: 12px">看不清?点击刷新</div>
              <img :src="captchaUrl" alt="验证码" @click="handleReloadCaptcha"/>
            </div>
          </van-cell>
        </van-cell-group>
        <van-button
            style="margin-top: 20px"
            block
            type="primary"
            @click="handleLogin">登录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container{
  width: 100vw;
  height: 100vh;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-wrapper{
    width: 80%;
    height: 50%;
    .header-title{
      text-align: center;
      font-weight: 700;
      color: #fff;
      font-size: 25px;
    }
    .main-container{
      margin-top: 20px;
    }
  }
}
</style>
