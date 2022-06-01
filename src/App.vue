<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";
let route = useRoute();
let transitionName = ref('');
watch(() :Number => Number(route.meta.index),(newVal :Number, oldVal :Number) => {
  console.log(newVal, oldVal);
  if (newVal === oldVal) {
    return;
  }
  if (newVal > oldVal) {
    transitionName.value = 'slide-right';
  } else {
    transitionName.value = 'slide-left';
  }
});
</script>

<template>
  <van-notify />
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>

</template>

<style lang="less">
body{
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
}
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
  will-change: transform;
  transition: all 600ms;
  position: absolute;
}
// 右滑初始装状态
   .slide-right-enter {
   // opacity: 0;
     transform: translate3d(-100%, 0, 0);
   }

// 右滑执行状态
   .slide-right-leave-active {
   // opacity: 0;
     transform: translate3d(100%, 0, 0);
   }
// 右滑最终状态
   .slide-right-enter-to{
   // opacity: 1;
     transform: translate3d(0, 0, 0);
   }
// 左滑初始装状态
   .slide-left-enter {
   // opacity: 0;
     transform: translate3d(100%, 0, 0);
   }
// 左滑执行状态
   .slide-left-leave-active {
   // opacity: 0;
     transform: translate3d(-100%, 0, 0);
   }
// 左滑最终状态
   .slide-right-enter-to{
   // opacity: 1;
     transform: translate3d(0, 0, 0);
   }
</style>
