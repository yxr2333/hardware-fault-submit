<script setup lang="ts">
import {onBeforeMount, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import { QrStream } from 'vue3-qr-reader'
import {Device, HardwareFaultUploadParam} from "../../api/home/data";
import {User} from "../../api/user/data";
import {uploadImg} from "../../api/file";
import {Notify} from "vant";
import {submitHardwareFault} from "../../api/home";
import {DateTimeFormat} from "../../utils/utils";
interface FileItem {
  url :string;
}
const router = useRouter();
let active = ref(1);
let result = ref('');
let btnText = ref('扫描信息');
let dialogVisible = ref(false);
let isScanned = ref(false);
let emergency = ref(0);
let fileList = ref<FileItem[]>([])
let isCanSubmit = ref(false);
onBeforeMount(() => {
  let user :string | null = sessionStorage.getItem('user');
  if (user !== null) {
    Object.assign(submitUser, JSON.parse(user));
  }
});
const handleTabChange = (index: number) => {
  active.value = index;
};
const handleSelectEmergency = (value :number) => {
  param.emergency = value - 1;
}
const onDecode = (res :any) => {
  // sessionStorage.setItem('device',res);
  result.value = res;
  Object.assign(deviceData, JSON.parse(res));
  if(deviceData.department){
    deviceData.department.updatedTime = DateTimeFormat(parseInt(deviceData.department.updatedTime));
  }
  dialogVisible.value = false;
  btnText.value = '重新扫描';
  isScanned.value = true;
  Notify({
    type: 'success',
    message: '扫描成功'
  })
}
const handleUploadFile = (val: any) => {
  let formData = new FormData();
  formData.append('file',val.file)
  uploadImg(formData).then((res :any) => {
    if(res) {
      param.imgUrl = res.data;
      isCanSubmit.value = true;
    }
  })
}
let submitUser :User = reactive<User>({
  bannedTime: null,
  createTime: "",
  deleteTime: null,
  department: null,
  email: null,
  id: 0,
  isChairMan: false,
  isDeleted: false,
  isNurseBoos: false,
  name: "",
  password: null,
  phone: null,
  qq: null,
  shortPhone: null,
  status: false,
  updateTime: null,
  userPosition: null,
  userRole: null,
  wechat: null,
  workPhone: null

})
let deviceData :Device = reactive({
  belong: "",
  computerName: "",
  department: undefined,
  deviceName: "",
  deviceOs: undefined,
  deviceStatus: undefined,
  deviceType: undefined,
  id: 0,
  sn: ""
});
let param: HardwareFaultUploadParam = reactive<HardwareFaultUploadParam>({
  description: null,
  device: deviceData,
  emergency: 0,
  imgUrl: null,
  notes: null,
  submitUser: submitUser,
});
const handleSubmit = () => {
  if(!param.description){
    Notify({
      type: 'danger',
      message: '请输入故障描述'
    })
    return;
  }
  if(!param.emergency){
    Notify({
      type: 'danger',
      message: '请选择紧急程度'
    })
    return;
  }
  if(!param.imgUrl){
    Notify({
      type: 'danger',
      message: '请上传图片'
    })
    return;
  }
  if(!param.notes){
    Notify({
      type: 'danger',
      message: '请输入备注'
    })
    return;
  }
  if(!param.device){
    Notify({
      type: 'danger',
      message: '请先扫描设备'
    })
    return;
  }
  if(!param.submitUser){
    Notify({
      type: 'danger',
      message: '请先登录'
    })
    return;
  }
  submitHardwareFault(param).then((res :any) => {
    if(res){
      btnText.value = '扫描信息';
      isScanned.value = false;
      emergency.value = 0;
      fileList.value = [];
      deviceData = {
        belong: "",
        computerName: "",
        department: undefined,
        deviceName: "",
        deviceOs: undefined,
        deviceStatus: undefined,
        deviceType: undefined,
        id: 0,
        sn: ""
      };
      param = {
        description: null,
        device: deviceData,
        emergency: 0,
        imgUrl: null,
        notes: null,
        submitUser: submitUser,
      };
    }
  })
}

const handleLogout = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('device');
  Notify({
    message: '退出成功',
    type: 'success'
  })
  router.replace('/login');
}
</script>

<template>
  <div class="home-container">
    <van-notify />
    <van-nav-bar title="硬件报障处理中心" safe-area-inset-top/>
    <van-tabs
        class="home-tabs"
        v-model:active="active"
        animated
        swipeable>
      <van-tab title="报障" class="tab-item">
        <div style="margin: 15px;text-align: left">
          <van-button
              icon="qr"
              @click="dialogVisible = true"
              type="primary">
            {{btnText}}
          </van-button>
        </div>
        <van-cell-group >
          <van-cell v-if="isScanned" title="设备名称" :value="deviceData.deviceName" />
          <van-cell v-if="isScanned" title="设备SN编号" :value="deviceData.sn" />
          <van-field v-model="param.description" label="故障描述" placeholder="请输入故障描述"/>
          <van-field v-model="param.notes" label="备注" placeholder="请输入备注"/>
          <van-cell title="紧急程度" class="rate">
            <template #value >
              <van-rate :count="3" v-model="emergency" @change="handleSelectEmergency"/>
            </template>
          </van-cell>
          <van-cell title="上传图片" >
            <template #value>
              <van-uploader
                  v-model="fileList"
                  :after-read="handleUploadFile"
                  max-count="1"/>
            </template>
          </van-cell>
          <van-cell title="上报人工号" :value="submitUser.id" />
          <van-cell title="上报人姓名" :value="submitUser.name" />
        </van-cell-group>
        <div style="width: 100vw;text-align: center;margin-top: 20px;margin-bottom: 20px">
          <van-button
              type="primary"
              @click="handleSubmit"
              style="width: 90vw;"
              :disabled="!isCanSubmit">
            提交
          </van-button>
        </div>
      </van-tab>
      <van-tab title="我的" class="tab-item">
        <div class="about">
          <div class="icon-wrapper">
            <van-image
                width="100"
                height="100"
                round
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            />
            <div>
              <div>尊敬的：{{submitUser.name}}，您好！</div>
              <div>您的工号：{{submitUser.id}}</div>
              <div>欢迎您使用本系统！</div>
            </div>
          </div>
          <div>
            <van-cell-group>
              <van-cell title="上报记录" is-link icon="orders-o" to="history"/>
              <van-cell title="登出" is-link icon="cross" @click="handleLogout"/>
            </van-cell-group>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-dialog v-model:show="dialogVisible"  show-cancel-button>
      <div class="content">
        <qr-stream @decode="onDecode" class="mb">
          <div style="color: red;" class="frame"></div>
        </qr-stream>
        <div style="text-align: center">将二维码放入框内，即可自动扫描</div>
      </div>
    </van-dialog>

    <div class="footer">
      <van-tabbar v-model="active" @change="handleTabChange">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<style lang="less">
@header-tab-font-size: 15px;
.home-container{
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  margin: 0;
  padding: 0;
  .van-nav-bar {
    text-align: left;
  }
  .van-nav-bar__content{
    display: inherit;
  }
  .van-nav-bar__title{
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0 15px 20px;
  }
  .van-tab{
    font-size: @header-tab-font-size!important;
  }
  .home-tabs{
    .tab-item{
      margin: 0;
      padding: 0;
      height: calc(100vh - 140px);
      overflow-y: scroll;
      .rate{
        .van-cell__value{
          text-align: left;
        }
      }
      .content{
        width: 100%;
        height: 100%;
      }
      .about{
        width: inherit;
        height: inherit;
        .icon-wrapper{
          text-align: center;
        }
      }
    }
  }
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
