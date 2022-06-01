<script setup lang="ts">

import {IHistoryData, QueryHistoryData} from "../../api/history/data";
import {onMounted, reactive, ref} from "vue";
import {queryHistoryData} from "../../api/history";
import {Notify} from "vant";
let param :QueryHistoryData = reactive<QueryHistoryData>({
  userId: null,
  pageNum: 1,
  pageSize: 10,
})
let isLoading = ref<boolean>(false);
let isFinished = ref<boolean>(false);
let dataList = ref<IHistoryData[]>([])
let activeName = ref<string[]>(['0']);
const initData = () => {
  isLoading.value = true;
  queryHistoryData(param).then(res => {
    console.log(res);
    if(res) {
      res.data.results.forEach((item :any)=> {
        let data :IHistoryData = {
          id: item.id,
          deviceId: item.device.id,
          deviceName: item.device.deviceName,
          submitTime: item.createTime,
          description: item.description,
          notes: item.notes,
          status: item.solveStatus.statusName
        }
        dataList.value.push(data);
      })
      if(res.data.total === dataList.value.length) {
        isFinished.value = true;
      }
    }
    setTimeout(() => {
      isLoading.value = false;
    },2000)
  })
}
onMounted(() => {
  const val = sessionStorage.getItem('user');
  if(val) {
    param.userId = JSON.parse(val).id;
  }
  if(param.userId === null) {
    Notify({
      message: '请先重新登录',
      type: 'danger'
    })
    return;
  }
  initData();
})
const loadData = () => {
  param.pageNum += 1;
  initData();
}
</script>

<template>
  <div class="list-container">
    <div class="top-header-title">我的上报</div>
    <van-list
        class="main-list"
        :loading="isLoading"
        :finished="isFinished"
        finished-text="没有更多了"
        @load="loadData">
      <van-cell-group>
        <van-collapse v-model="activeName">
          <van-collapse-item
              v-for="(item,index) in dataList"
              :key="item.id"
              :name="index"
              :title="item.id + ': ' + item.description"
              :value="'上报时间:' + item.submitTime">
            <div style="font-size: 14px!important;">
              <span class="prefix-text">报障编号:</span>
              {{item.id}}
            </div>
            <div style="font-size: 14px!important;">
              <span class="prefix-text">故障设备编号:</span>
              {{item.deviceId}}
            </div>
            <div style="font-size: 14px!important;">
              <span class="prefix-text">故障设备名称:</span>
              {{item.deviceName}}
            </div>
            <div style="font-size: 14px!important;">
              <span class="prefix-text">上报时间:</span>
              {{item.submitTime}}
            </div>
            <div style="font-size: 14px!important;">
              <span class="prefix-text">故障描述:</span>
              {{item.description}}
            </div>
            <div style="font-size: 14px!important;">
              <span class="prefix-text">备注:</span>
              {{item.notes}}
            </div>
            <div style="font-size: 14px!important;">
              <span class="prefix-text">报障状态:</span>
              {{item.status}}
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </van-list>
  </div>
</template>

<style scoped lang="less">
.list-container{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  .top-header-title {
    padding: 15px;
    font-weight: bold;
    font-size: 26px;
  }
  .main-list {
    height: calc(100vh - 95px);
    .prefix-text {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
