import Vue from "vue";
import App from "./App";
import "./style/reset.css";
import "./style/global.css";

Vue.config.productionTip = false;
App.mpType = "app";

// 引用api 文件
import http from "./utils/request";
// 将API绑定为全局
Vue.prototype.$http = http;
// 添加云 初始化环境 id
wx.cloud.init({
  env:
    process.env.NODE_ENV === "development"
      ? "duanzi-fc5318"
      : "duanzi-prod-9gti00gb11d1ddf6",
  traceUser: true,
});

const app = new Vue(App);
app.$mount();
