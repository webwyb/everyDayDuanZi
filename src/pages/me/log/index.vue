<template>
  <div class="cu-timeline">
    <div class='cu-item text-green' v-for="(item,index) in items" :key="index">
      <div class="bg-gradual-green content shadow-blur">
        <div class="cu-capsule radius">
          <div class="cu-tag bg-white text-green">{{item.version}}</div>
          <div class="cu-tag line-white">{{item.publishDate}}</div>
          <div class="cu-tag bg-white text-green" v-if="item.tag">{{item.tag}}</div>
        </div>
        <div class='margin-top-sm text-content'>
          <div v-for="(content,subIndex) in item.list" :key="subIndex">{{content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        items: [
          {
            version: "v2.0.1",
            publishDate: "2019/04/12",
            list: ["1.修改了部分bug", "2.优化了一点点代码"]
          },
          {
            version: "v2.0.0",
            publishDate: "2019/04/05",
            tag: '断魂版',
            list: ["1.新增段子创作", "2.新增浸入式浏览体验", "3.阅读点赞数统计"]
          },
          {
            version: "v1.0.1",
            publishDate: "2019/03/17",
            list: ["1.修改部分样式bug", "2.增加反馈入口", "3.绑定'段子hand'官方公众号"]
          },
          {
            version: "v1.0.0",
            publishDate: "2019/03/15",
            tag: '打假版',
            list: ["1.段子浏览、点赞、分享", "2.个人信息页面"]
          }
        ]
      };
    }
  };
</script>

<style scoped>

</style>
