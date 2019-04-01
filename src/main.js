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

const app = new Vue(App);
app.$mount();
