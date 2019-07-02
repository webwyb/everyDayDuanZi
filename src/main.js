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
// fundebug
var fundebug = require("fundebug-wxjs");
fundebug.init({
  apikey: "7a273523fc935bfe284721a32a29a5539fcefbbb5d2b6d017b9c151935d3034c"
});

const app = new Vue(App);
app.$mount();
